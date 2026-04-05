import User from "@/core/domain/entity/User";
import type { AdditionData } from "@/core/requests/network/PutAdditionData.request";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

@injectable()
export class UserState {
  @observable isAuthorized: boolean = false;
  @observable authToken: string = "";
  @observable User: User | null = null;
  @action
  setAuthToken(token: string) {
    this.authToken = token;
    this.isAuthorized = true;
  }
  @action
  clearAuthToken() {
    this.authToken = "";
    this.isAuthorized = false;
  }
  @action setUser(user: User) {
    this.User = user;
  }
  @action changeUserData(data: AdditionData): void | Error {
    if (this.User != null) {
      this.User.updateContact({
        telegram: data.telegram || "",
        discord: data.discord || "",
      });
      if (data.birthDay) this.User.updateAge(data.birthDay);
      if (data.firstName && data.lastName && data.surName)
        this.User.updateFullName({
          firstName: data.firstName,
          lastName: data.lastName,
          surName: data.surName,
        });
    }
  }
  @action clearUserData() {
    if (this.User != null) {
      this.User.clearAdditionData();
    }
  }
  constructor() {
    makeObservable(this);
  }
}
