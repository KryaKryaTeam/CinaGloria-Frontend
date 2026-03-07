import { Container } from "inversify";
import JWTChangeRequest from "./network/requests/JWTRequest";
import { UserState } from "@/state/UserState";
import { GetWsTokenRequest } from "./network/requests/GetWsTokebRequest";
import { WsSocket } from "./network/socket/initSocket";
import RequestMe from "./network/requests/RequestMe";

const container: Container = new Container();

container.bind(JWTChangeRequest).toSelf().inRequestScope();
container.bind(GetWsTokenRequest).toSelf().inRequestScope();
container.bind(RequestMe).toSelf().inRequestScope();
container.bind(UserState).toSelf().inSingletonScope();
container.bind(WsSocket).toSelf().inSingletonScope();
export default container;
