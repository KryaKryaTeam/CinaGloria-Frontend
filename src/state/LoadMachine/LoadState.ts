import { injectable } from "inversify";
import { makeObservable, observable, action, computed, reaction } from "mobx";
import { LoadScope, LoadScopeStates } from "./LoadScope";
import container from "@/core/Container";
import RequestMe from "@/core/requests/network/Me.request";
import OldNotificationPageRequest from "@/core/requests/network/OldNotificationPage.request";
import { WsSocket } from "@/core/initSocket";

@injectable()
export class LoadState {
  @observable private queue: LoadScope[] = [];
  @observable private activeCount: number = 0;
  @observable shouldAnimateExit: boolean = false;
  @observable shouldAnimateEnter: boolean = false;
  @observable loadedBefore: boolean = false;
  private readonly MAX_CONCURRENT = 3;

  private readonly scopes: Record<
    string,
    { priority: number; scope: LoadScope }
  > = {
    global: {
      priority: 0,
      scope: new LoadScope(async () => {
        const me = container.get(RequestMe);
        const notification = container.get(OldNotificationPageRequest);

        const socket = container.get(WsSocket);
        await socket.connect();

        await me.execute();
        await notification.execute(0);
      }),
    },
  };

  constructor() {
    makeObservable(this);

    reaction(
      () => Object.values(this.scopes).map((s) => s.scope.state),
      () => this.scanAndFillQueue(),
    );

    reaction(
      () => ({
        queueLength: this.queue.length,
        canRunMore: this.activeCount < this.MAX_CONCURRENT,
      }),
      (status) => {
        if (status.queueLength > 0 && status.canRunMore) {
          this.processNext();
        }
      },
    );

    reaction(
      () => this.isAppBlocking,

      (current, previous) => {
        if (previous === true && current === false) {
          this.shouldAnimateExit = true;
        }

        if (previous === false && current === true) {
          this.shouldAnimateEnter = true;
        }
      },
    );

    this.scanAndFillQueue();
    this.processNext();
    this.shouldAnimateEnter = true;
    setTimeout(() => {
      this.shouldAnimateEnter = false;
    }, 1000);

    console.log("Initializaded load state!");
  }

  @action
  exitAnimationClear() {
    this.shouldAnimateExit = false;
    this.loadedBefore = true;
  }

  @action
  enterAnimationClear() {
    this.shouldAnimateEnter = false;
  }

  @action
  private scanAndFillQueue() {
    Object.values(this.scopes).forEach((item) => {
      const { scope } = item;
      const isNeedsLoading =
        scope.state === LoadScopeStates.EMPTY ||
        scope.state === LoadScopeStates.STALE;

      if (isNeedsLoading && !this.queue.includes(scope)) {
        this.queue.push(scope);
        this.queue.sort((a, b) => this.getPriority(a) - this.getPriority(b));
      }
    });

    console.log("Load state queue:", this.queue);
  }

  @action
  private async processNext() {
    while (this.activeCount < this.MAX_CONCURRENT && this.queue.length > 0) {
      const scope = this.queue.shift();
      if (!scope) break;

      this.runTask(scope);
    }
  }

  @action
  private async runTask(scope: LoadScope) {
    this.activeCount++;
    try {
      await scope.refresh();
    } finally {
      this.onTaskComplete();
    }
  }

  @action
  private onTaskComplete() {
    this.activeCount--;
  }

  public attachToScope(scopeName: string) {
    console.log("Attacher to scope:", scopeName, this.scopes);
    if (!this.scopes)
      return {
        onError: () => {},
        onLoad: () => {},
      };
    const item = this.scopes[scopeName];
    if (!item)
      return {
        onError: () => {},
        onLoad: () => {},
      };

    let relesePromise: () => void;

    const promise: Promise<void> = new Promise((res) => {
      relesePromise = res;
      setTimeout(res, 10000);
    });

    item.scope.registerTask(promise);

    const relese = () => {
      if (relesePromise) relesePromise();
    };

    return {
      onError: relese,
      onLoad: relese,
    };
  }

  private getPriority(scope: LoadScope): number {
    return (
      Object.values(this.scopes).find((s) => s.scope === scope)?.priority ?? 99
    );
  }

  @action
  enterInScope(scopeName: string) {
    const item = this.scopes[scopeName];
    if (item) item.scope.enterScope();
  }

  @action
  leaveFromScope(scopeName: string) {
    const item = this.scopes[scopeName];
    if (item) item.scope.exitScope();
  }

  @computed get isAppBlocking() {
    return Object.values(this.scopes).some(
      (item) =>
        item.priority === 0 &&
        (item.scope.state === LoadScopeStates.LOADING ||
          item.scope.state === LoadScopeStates.EMPTY),
    );
  }
}
