import container from "@/core/Container";
import User from "@/core/domain/entity/User";
import type { AdditionData } from "@/core/network/requests/RequestPutAdditionData";
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
  @action changeUserData(data: AdditionData): void | Error{
      if(this.User != null) {
        this.User.updateContact(data);
        this.User.updateAge(data.bithDay)
        this.User.updateFullName({
          firstName: data.firstName,
          lastName: data.lastName,
          surName: data.surName
        })
      } else {
        throw new Error("user is null")
      }
  }
  @action clearUserData(){
          if(this.User != null) {
            this.User.clearAdditionData()
      }
  }
  constructor() {
    makeObservable(this);
  }
}
