
export const TYPES = {
  NotificationStore: Symbol.for("NotificationStore"),
  UserState: Symbol.for("UserState"),
  LoadState: Symbol.for("LoadState"),
  WsSocket: Symbol.for("WsSocket"),
  JWTChangeRequest: Symbol.for("JWTChangeRequest"),
  GetWsTokenRequest: Symbol.for("GetWsTokenRequest"),
  RequestMe: Symbol.for("RequestMe"),
  RequestPutAdditionData: Symbol.for("RequestPutAdditionData"),
  RequestRegistartion: Symbol.for("RequestRegistartion"),
  RequestConfirm: Symbol.for("RequestConfirm"),
  RequestLoginWithGoogle: Symbol.for("RequestLoginWithGoogle"),
  ReadedRequest: Symbol.for("ReadedRequest"),
  OldNotificationPageRequest: Symbol.for("OldNotificationPageRequest"),
  ReadAllRequest: Symbol.for("ReadAllRequest"),
  LogoutRequest: Symbol.for("LogoutRequest"),
  CreateCompetitionRequest: Symbol.for("CreateCompetitionRequest"),
  CompetitionState: Symbol.for("CompetitionState"),
  GetPublicCompetitionRequest: Symbol.for("GetPublicCompetitionRequest"),
  AuthCheck: Symbol.for("AuthCheck")
} as const;
