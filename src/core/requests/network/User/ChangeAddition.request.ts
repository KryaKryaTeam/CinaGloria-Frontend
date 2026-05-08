import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
interface Data {
    telegram?: string;
    discord?: string;
    firstName?: string;
    lastName?: string;
    surName: string;
    birthDay: Date;
}
export default class ChangeAdditionRequest extends NetworkRequest<Data, void, void> {
        authorized: boolean = true;
        method: HTTPMethod = "PATCH";
        withCSRF: boolean = false;

        mapData(data: Data): ISubRequestData {
                return {
                    url: new URL(URLEnum.USER + "additional"),
                    init: {
                        body: {...data}
                    }
                }
        }
        onSuccess(data: any) {}
}