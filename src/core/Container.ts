import { Container } from "inversify";
import NotificationStore from "@/state/NotificationStore";
import { UserState } from "@/state/UserState";
import { LoadState } from "@/state/LoadMachine/LoadState";
import { WsSocket } from "./initSocket";
import { TYPES } from "./Container.types";

const container: Container = new Container();

// --- SINGLETONS (Using Constant Value for absolute safety) ---
container
  .bind(TYPES.NotificationStore)
  .to(NotificationStore)
  .inSingletonScope();
container.bind(TYPES.UserState).to(UserState).inSingletonScope();
container.bind(TYPES.LoadState).to(LoadState).inSingletonScope();
container.bind(TYPES.WsSocket).to(WsSocket).inSingletonScope();

// --- REQUEST SCOPE (Transient-like) ---
import JWTChangeRequest from "./requests/network/JWT.request";
import { GetWsTokenRequest } from "./requests/network/GetWsToken.request";
import RequestMe from "./requests/network/Me.request";
import RequestPutAdditionData from "./requests/network/PutAdditionData.request";
import { RequestRegistartion } from "./requests/network/Registration.request";
import { RequestConfirm } from "./requests/network/Confirm.request";
import { RequestLoginWithGoogle } from "./requests/network/LoginWithGoogle.request";
import ReadedRequest from "./requests/network/ReadedRequest.request";
import OldNotificationPageRequest from "./requests/network/OldNotificationPage.request";
import ReadAllRequest from "./requests/network/ReadAllRequest.request";

container.bind(TYPES.JWTChangeRequest).to(JWTChangeRequest).inRequestScope();
container.bind(TYPES.GetWsTokenRequest).to(GetWsTokenRequest).inRequestScope();
container.bind(TYPES.RequestMe).to(RequestMe).inRequestScope();
container
  .bind(TYPES.RequestPutAdditionData)
  .to(RequestPutAdditionData)
  .inRequestScope();
container
  .bind(TYPES.RequestRegistartion)
  .to(RequestRegistartion)
  .inRequestScope();
container.bind(TYPES.RequestConfirm).to(RequestConfirm).inRequestScope();
container
  .bind(TYPES.RequestLoginWithGoogle)
  .to(RequestLoginWithGoogle)
  .inRequestScope();
container.bind(TYPES.ReadedRequest).to(ReadedRequest).inRequestScope();
container
  .bind(TYPES.OldNotificationPageRequest)
  .to(OldNotificationPageRequest)
  .inRequestScope();
container.bind(TYPES.ReadAllRequest).to(ReadAllRequest).inRequestScope();

export default container;
export { TYPES };
