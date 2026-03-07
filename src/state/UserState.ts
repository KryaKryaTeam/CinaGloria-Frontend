import container from "@/core/Container";
import User from "@/core/domain/entity/User";
import AuthService from "@/core/usecase/Auth/AuthService";
import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

@injectable()
export class UserState {
  // injected
  @inject(AuthService)
  private AuthService!: AuthService
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
    this.User = user;
  }
  constructor() {
    makeObservable(this);
  }
}
