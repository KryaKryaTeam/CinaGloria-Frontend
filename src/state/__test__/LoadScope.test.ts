import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { LoadScope, LoadScopeStates } from "../LoadMachine/LoadScope";


describe("LoadScope", () => {
  let scope: LoadScope;
  let factoryMock: () => Promise<void>;

  beforeEach(() => {
    vi.useFakeTimers();
    factoryMock = vi.fn().mockResolvedValue(undefined);
    scope = new LoadScope(factoryMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("Refresh and State Flow", () => {
    it("should transition from EMPTY -> LOADING -> ACTUAL", async () => {
      const refreshPromise = scope.refresh();
      
      expect(scope.state).toBe(LoadScopeStates.LOADING);

      // Advance timers to trigger the internal 50ms timeout in refresh()
      await vi.advanceTimersByTimeAsync(50);
      await refreshPromise;
      
      expect(scope.state).toBe(LoadScopeStates.ACTUAL);
    });

    it("should transition to ERROR if factory fails", async () => {
      const errorFactory = vi.fn().mockRejectedValue(new Error("Fail"));
      const errorScope = new LoadScope(errorFactory);
      
      const refreshPromise = errorScope.refresh();
      await vi.advanceTimersByTimeAsync(50);
      await refreshPromise;

      expect(errorScope.state).toBe(LoadScopeStates.ERROR);
    });
  });

  describe("Task Registration", () => {
    it("should wait for pending tasks before finishing refresh", async () => {
      let taskFinished = false;
      
      // A task that takes 1000ms of "fake" time
      const longTask = new Promise((res) => {
        setTimeout(() => {
          taskFinished = true;
          res(true);
        }, 1000);
      });

      const taskScope = new LoadScope(async () => {
        taskScope.registerTask(longTask);
      });

      const refreshPromise = taskScope.refresh();

      // 1. Advance past factory and the internal 50ms breath
      await vi.advanceTimersByTimeAsync(50); 
      expect(taskScope.state).toBe(LoadScopeStates.LOADING);
      expect(taskFinished).toBe(false);

      // 2. Advance past the 1000ms registered task
      await vi.advanceTimersByTimeAsync(1000);
      await refreshPromise;

      expect(taskFinished).toBe(true);
      expect(taskScope.state).toBe(LoadScopeStates.ACTUAL);
    });
  });

  describe("Scope and Stale Logic", () => {
    it("should set timeout to stale when exiting scope", async () => {
      // Setup: get to ACTUAL state
      const refreshPromise = scope.refresh();
      await vi.advanceTimersByTimeAsync(50);
      await refreshPromise;

      scope.enterScope();
      scope.exitScope();

      // Advance 3 minutes
      await vi.advanceTimersByTimeAsync(3 * 60 * 1000);
      expect(scope.state).toBe(LoadScopeStates.STALE);
    });

    it("should force to stale immediately if TTL is exceeded on exit", async () => {
      const refreshPromise = scope.refresh();
      await vi.advanceTimersByTimeAsync(50);
      await refreshPromise;

      // Mock Date.now to simulate 11 minutes passing (TTL is 10)
      const elevenMinutesInMs = 11 * 60 * 1000;
      vi.spyOn(Date, 'now').mockReturnValue(Date.now() + elevenMinutesInMs);

      scope.enterScope();
      scope.exitScope();

      expect(scope.state).toBe(LoadScopeStates.STALE);
    });
  });
});
