import container from "@/core/Container";
import User from "@/core/domain/entity/User";
import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

@injectable()
export class UserState {
  @observable isAuthorized: boolean = false;
  @observable authToken: string = "";
  User: User | null = null;
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
    console.log(user);
    this.User = user;
  }
  constructor() {
    makeObservable(this);
  }
}
