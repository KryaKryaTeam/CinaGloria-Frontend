import { Container } from "inversify";
import JWTChangeRequest from "./requests/network/JWT.request";
import { GetWsTokenRequest } from "./requests/network/GetWsToken.request";
import RequestMe from "./requests/network/Me.request";
import { UserState } from "@/state/UserState";
import RequestPutAdditionData from "./requests/network/PutAdditionData.request";
import { RequestRegistartion } from "./requests/network/Registration.request";
import { RequestConfirm } from "./requests/network/Confirm.request";
import { RequestLoginWithGoogle } from "./requests/network/LoginWithGoogle.request";
import { WsSocket } from "./initSocket";

const container: Container = new Container();

container.bind(JWTChangeRequest).toSelf().inRequestScope();
container.bind(GetWsTokenRequest).toSelf().inRequestScope();
container.bind(RequestMe).toSelf().inRequestScope();
container.bind(UserState).toSelf().inSingletonScope();
container.bind(WsSocket).toSelf().inSingletonScope();
container.bind(RequestPutAdditionData).toSelf().inRequestScope();
container.bind(RequestRegistartion).toSelf().inRequestScope();
container.bind(RequestConfirm).toSelf().inRequestScope();
container.bind(RequestLoginWithGoogle).toSelf().inRequestScope();

export default container;
