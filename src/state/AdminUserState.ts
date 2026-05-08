import type { IUserForAdminList } from "@/core/domain/entity/IUserForAdminList";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { action, computed, makeObservable, observable } from "mobx";

export class AdminUsersListState {
  @observable users: IUserForAdminList[] = [];
  @observable currentPage: number = 0;
  @observable shouldFetchNext: boolean = true;
  @observable email: string | undefined;

  @action addUser(user: IUserForAdminList) {
    this.users.push(user);
    this.users = [
      ...new Map(this.users.map((item) => [item.id, item])).values(),
    ];
  }

  @action updateEncounter() {
    this.currentPage++;
  }

  @action clear() {
    this.users = [];
    this.currentPage = 0;
    this.shouldFetchNext = true;
  }

  @action stop() {
    this.shouldFetchNext = false;
  }

  @action setEmail(_new: string) {
    this.email = _new;
  }

  @action changeUserRole(user: string, role: RoleEnum) {
    this.users = this.users.map((el) => {
      if (el.id !== user) return el;
      el.role = role;
      return el;
    });
  }

  @computed get hasFilter() {
    return typeof this.email !== "undefined";
  }

  constructor() {
    makeObservable(this);
  }
}
