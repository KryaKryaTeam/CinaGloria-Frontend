import { UserState } from "@/state/UserState";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { inject } from "inversify";
import { TYPES } from "@/core/Container";
interface Data{
    id: number;
    date: Date
}
export default class ScheduleCompetitionRequest extends NetworkRequest<Data, boolean, void> {
        authorized: boolean = true;
        method: HTTPMethod = "PUT";
        withCSRF: boolean = false;
        constructor(@inject(TYPES.UserState) private userState: UserState){
                    super(userState)
         }    
        mapData(data: Data): ISubRequestData {
            return {
                url: new URL(URLEnum.COMPETITION + `schedule/set/${data.id}`),
                init: {
                    body: {
                            publishAt: data.date
                    }
                }
            }
        }
        onSuccess(data: void): boolean | Promise<boolean> {
            return true
        }
}