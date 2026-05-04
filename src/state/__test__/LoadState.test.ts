import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import container, { TYPES } from "@/core/Container";
import { LoadState } from "../LoadMachine/LoadState";
import { LoadScopeStates } from "../LoadMachine/LoadScope";

// Mock dependencies used in the 'global' scope
vi.mock("@/core/Container", () => ({
  default: {
    get: vi.fn(),
  },
  TYPES: {
    RequestMe: Symbol("RequestMe"),
    OldNotificationPageRequest: Symbol("OldNotificationPageRequest"),
    WsSocket: Symbol("WsSocket"),
  },
}));

describe("LoadState", () => {
  let loadState: LoadState;
  let mockMe: any;
  let mockNotif: any;
  let mockSocket: any;

  beforeEach(() => {
    vi.useFakeTimers();

    // Setup mock implementations
    mockMe = { execute: vi.fn().mockResolvedValue({}) };
    mockNotif = { execute: vi.fn().mockResolvedValue({}) };
    mockSocket = { connect: vi.fn().mockResolvedValue({}) };

    (container.get as any).mockImplementation((type: any) => {
      if (type === TYPES.RequestMe) return mockMe;
      if (type === TYPES.OldNotificationPageRequest) return mockNotif;
      if (type === TYPES.WsSocket) return mockSocket;
    });

    loadState = new LoadState();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("Initialization & Global Scope", () => {
    it("should start with global scope in EMPTY state and blocking", () => {
      expect(loadState.isAppBlocking).toBe(true);
      expect(loadState.shouldAnimateEnter).toBe(false);
    });

    it("should begin loading global scope on mount", async () => {
      loadState.mount();

      expect(loadState.shouldAnimateEnter).toBe(true);

      // Advance timers to clear the entrance animation timeout
      await vi.advanceTimersByTimeAsync(1000);
      expect(loadState.shouldAnimateEnter).toBe(false);

      // Global scope should eventually reach ACTUAL
      // 50ms is the 'breath' inside LoadScope.refresh()
      await vi.advanceTimersByTimeAsync(50);

      expect(mockSocket.connect).toHaveBeenCalled();
      expect(mockMe.execute).toHaveBeenCalled();
      expect(loadState.isAppBlocking).toBe(false);
      expect(loadState.shouldAnimateExit).toBe(true);
    });
  });

  describe("Queue Management", () => {
    it("should respect MAX_CONCURRENT tasks", async () => {
      // Create additional mock scopes
      const scopes = (loadState as any).scopes;
      for (let i = 1; i <= 5; i++) {
        scopes[`test_${i}`] = {
          priority: 1,
          scope: {
            refresh: vi.fn().mockReturnValue(new Promise(() => {})),
            state: LoadScopeStates.EMPTY,
          },
        };
      }

      loadState.mount();

      // Check activeCount (1 global + 2 test scopes = 3)
      expect((loadState as any).activeCount).toBeLessThanOrEqual(3);
    });
  });

  describe("Scope Navigation", () => {
    it("should handle enter and leave scope correctly", () => {
      const globalScope = (loadState as any).scopes.global.scope;
      const spyEnter = vi.spyOn(globalScope, "enterScope");
      const spyExit = vi.spyOn(globalScope, "exitScope");

      loadState.enterInScope("global");
      expect(loadState.currentScope).toBe("global");
      expect(spyEnter).toHaveBeenCalled();

      loadState.leaveFromScope("global");
      expect(loadState.currentScope).toBe("");
      expect(spyExit).toHaveBeenCalled();
    });
  });

  describe("Blocking Logic", () => {
    it("should only block if a priority 0 scope is loading", async () => {
      // Manually set global scope to ACTUAL
      const globalScope = (loadState as any).scopes.global.scope;
      (globalScope as any)._state = LoadScopeStates.ACTUAL;

      expect(loadState.isAppBlocking).toBe(false);
    });
  });

  describe("attachToScope", () => {
    it("should register a promise and release it on onLoad", () => {
      const globalScope = (loadState as any).scopes.global.scope;
      const spyRegister = vi.spyOn(globalScope, "registerTask");

      const { onLoad } = loadState.attachToScope("global");
      expect(spyRegister).toHaveBeenCalled();

      // Calling onLoad should resolve the internal promise
      onLoad();
    });
  });
});
