import { inject } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

export default class PublishCompetitionRequest extends NetworkRequest<number, boolean, void> {
        authorized: boolean = true;
        method: HTTPMethod = "PUT";
        withCSRF: boolean = false;
        constructor(@inject(TYPES.UserState) private userState: UserState){
            super(userState)
        }
        mapData(data: number): ISubRequestData {
            return {
                url: new URL(URLEnum.COMPETITION + `publish/${data}`),
                init: {}
            }
        }
        onSuccess(data: void): boolean | Promise<boolean> {
            return true
        }
}