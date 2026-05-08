import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { Rule } from "./CreateCompetion.request";
interface SData {
    name?: string,
    description?: string;
    dateOfEnd?: Date;
    dateOfEndRegistration?: Date;
    dateOfStart?: Date;
    dateOfStartRegistration?: Date;
    rules?: Rule[];
    socialMedia?: URL
    ultraWideBanner?: URL
    avatar?: URL
    banner?: URL
}
interface Data {
    id: string;
    competitionData: SData;
}
export default class UpdateCompetitionRequest extends NetworkRequest<Data, boolean, void> {
    authorized: boolean = true;
    method: HTTPMethod = "PUT";
    withCSRF: boolean = false;

    mapData(data: Data): ISubRequestData {
        return {
            url: new URL(URLEnum.COMPETITION + `update/${data.id}`),
            init: {
                body: { ...data.competitionData }
        }
    } }

    onSuccess(data: any): boolean {
        return true
    }
}