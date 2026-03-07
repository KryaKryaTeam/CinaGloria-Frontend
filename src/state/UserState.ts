import container from "@/core/Container";
import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

@injectable()
export class UserState {
  @observable isAuthorized: boolean = false;
  @observable authToken: string = "";

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

  constructor() {
    makeObservable(this);
  }
}
