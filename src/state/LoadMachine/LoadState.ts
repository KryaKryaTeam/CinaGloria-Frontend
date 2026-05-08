import { injectable } from "inversify";
import {
  makeObservable,
  observable,
  action,
  computed,
  reaction,
  runInAction,
} from "mobx";
import { LoadScope, LoadScopeStates } from "./LoadScope";
import container, { TYPES } from "@/core/Container";
import RequestMe from "@/core/requests/network/Me.request";
import OldNotificationPageRequest from "@/core/requests/network/OldNotificationPage.request";
import { WsSocket } from "@/core/initSocket";
import GetPrivateCompetitionRequest from "@/core/requests/network/Competion/GetPrivateCompetion.request";
import AdminCompetitionStore from "../AdminCompetitionStore";
import debugLog from "@/infrastructure/debugLog";
import { GetUsersAdminListRequest } from "@/core/requests/network/GetUsersAdminList.request";

@injectable()
export class LoadState {
  @observable private queue: LoadScope[] = [];
  @observable private activeCount: number = 0;
  @observable loadedBefore: boolean = false;
  @observable currentScope: string = "";
  private readonly MAX_CONCURRENT = 3;
  private isInitialized = false;

  @observable private readonly scopes: Record<
    string,
    { priority: number; scope: LoadScope }
  > = {
    global: {
      priority: 0,
      scope: new LoadScope(async () => {
        const me = container.get<RequestMe>(TYPES.RequestMe);
        const notification = container.get<OldNotificationPageRequest>(
          TYPES.OldNotificationPageRequest,
        );

        const socket = container.get<WsSocket>(TYPES.WsSocket);
        await socket.connect();

        await me.execute();
        await notification.execute(0);
      }),
    },
    profile: {
      priority: 1,
      scope: new LoadScope(async () => {
        const me = container.get<RequestMe>(TYPES.RequestMe);
        await me.execute();
      }),
    },
    admin: {
      priority: 1,
      scope: new LoadScope(async () => {
        const getPrivateCompetitionRequest =
          container.get<GetPrivateCompetitionRequest>(
            TYPES.GetPrivateCompetitionRequest,
          );
        const admCompStore = container.get<AdminCompetitionStore>(
          TYPES.AdminCompetitionStore,
        );
        const data = await getPrivateCompetitionRequest.execute(0);
        data.forEach((c) => admCompStore.addNewCompetition(c));

        const getUsersAdminListRequest =
          container.get<GetUsersAdminListRequest>(
            TYPES.GetUsersAdminListRequest,
          );

        getUsersAdminListRequest.execute({ page: 0 });
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
  }

  @action
  public mount() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // Початкова анімація входу
    runInAction(() => {
      this.scanAndFillQueue();
      this.processNext();
    });
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
  }

  @action
  forceScope(scope?: string) {
    if (!scope) scope = this.currentScope;

    console.log("FORCE SCOPE:", scope);

    const item = this.scopes[scope];
    if (!item) return;

    item.scope.forceToStale();
    this.queue.push(item.scope);
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
    } catch (e) {
      console.error("CRITICAL ERROR in Scope execution:", e);
    } finally {
      this.onTaskComplete();
    }
  }

  @action
  private onTaskComplete() {
    this.activeCount--;
  }

  public attachToScope(scopeName: string) {
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
    console.log("Enter in scope:", scopeName);
    const item = this.scopes[scopeName];
    if (item && this.currentScope != scopeName) {
      this.currentScope = scopeName;
      item.scope.enterScope();
    }
  }

  @action
  leaveFromScope(scopeName: string) {
    console.log("Leave from scope:", scopeName);
    const item = this.scopes[scopeName];
    if (item) {
      item.scope.exitScope();
      this.currentScope = "";
    }
  }

  @computed get isAppBlocking() {
    const blocking = Object.values(this.scopes).some(
      (item) =>
        item.priority === 0 &&
        (item.scope.state === LoadScopeStates.LOADING ||
          item.scope.state === LoadScopeStates.EMPTY),
    );

    return blocking;
  }
}
