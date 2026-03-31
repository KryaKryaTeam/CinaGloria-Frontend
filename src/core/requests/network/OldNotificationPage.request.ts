import { INotification } from "@/core/domain/entity/Notification";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";

export default class OldNotificationPageRequest extends NetworkRequest<number, INotification[], INotification[]> {
    withCSRF: boolean = false;
    authorized: boolean = true;
    method: HTTPMethod = "GET";
    mapData(data: number): ISubRequestData {
        return {
             url: new URL(`${URLEnum.NOTIFICATION}${data}`),
             init: {}
        }
    }
    onSuccess(data: INotification[]): INotification[] | Promise<INotification[]> {
        return data
    }
}