import { action, computed, makeObservable, observable } from "mobx";

export enum LoadScopeStates {
  EMPTY,
  LOADING,
  ACTUAL,
  STALE,
  ERROR,
  REFRESHING,
}

export class LoadScope {
  @observable private _state: LoadScopeStates = LoadScopeStates.EMPTY;
  @observable shouldShowLoadCircle = false;
  @observable error = null;
  @observable scopeInUse: boolean = false;
  @observable pendingTasks: Promise<unknown>[] = [];

  private timeoutForStale: NodeJS.Timeout | null = null;
  private lastRefresh: number = Date.now();
  private readonly ttl: number = 10 * 60 * 1000;

  private readonly promiseFactory: () => Promise<void>;

  @action registerTask(promise: Promise<unknown>) {
    if (
      this.state === LoadScopeStates.LOADING ||
      this.state === LoadScopeStates.REFRESHING
    ) {
      console.log("Register task!");
      this.pendingTasks.push(promise);
    }
  }

  @action enterScope() {
    if (this.timeoutForStale) clearTimeout(this.timeoutForStale);
    this.scopeInUse = true;
  }
  @action exitScope() {
    this.scopeInUse = false;
    if (Date.now() - this.lastRefresh > this.ttl) return this.forceToStale();
    this.timeoutForStale = setTimeout(
      () => {
        this.forceToStale();
      },
      3 * 60 * 1000,
    );
  }

  @action forceToStale() {
    this.setState(LoadScopeStates.STALE);
  }

  @action async refresh() {
    if (
      this._state === LoadScopeStates.LOADING ||
      this._state === LoadScopeStates.REFRESHING
    ) {
      return;
    }

    console.log("Refreshing scope!");

    this.pendingTasks = [];

    if (this.state == LoadScopeStates.EMPTY)
      this.setState(LoadScopeStates.LOADING);
    else this.setState(LoadScopeStates.REFRESHING);

    try {
      await this.promiseFactory();

      await new Promise((res) => setTimeout(res, 50));

      if (this.pendingTasks.length > 0) await Promise.all(this.pendingTasks);

      this.setState(LoadScopeStates.ACTUAL);
      this.lastRefresh = Date.now();

      console.log("Complete!");
    } catch {
      this.setState(LoadScopeStates.ERROR);
    }
  }

  @action private setState(_new: LoadScopeStates) {
    const flow: Record<LoadScopeStates, LoadScopeStates[]> = {
      [LoadScopeStates.EMPTY]: [LoadScopeStates.LOADING],
      [LoadScopeStates.LOADING]: [
        LoadScopeStates.ACTUAL,
        LoadScopeStates.ERROR,
      ],
      [LoadScopeStates.ACTUAL]: [LoadScopeStates.STALE],
      [LoadScopeStates.STALE]: [LoadScopeStates.REFRESHING],
      [LoadScopeStates.REFRESHING]: [
        LoadScopeStates.ACTUAL,
        LoadScopeStates.ERROR,
      ],
      [LoadScopeStates.ERROR]: [
        LoadScopeStates.REFRESHING,
        LoadScopeStates.ERROR,
      ],
    };

    const avalible = flow[this.state];
    if (!avalible.includes(_new)) throw new Error("Breaks state flow");

    this._state = _new;
  }

  @computed get state() {
    return this._state;
  }

  constructor(promiseFactory: () => Promise<void>) {
    this.promiseFactory = promiseFactory;
    makeObservable(this);
  }
}
