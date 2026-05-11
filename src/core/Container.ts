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
container
  .bind(TYPES.AdminUsersListState)
  .to(AdminUsersListState)
  .inSingletonScope();

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
import { LogoutRequest } from "./requests/network/Logout.request";
import { UploadFileToAServerRequest } from "./requests/network/UploadFileToAServer.request";
import { ChangeAvatarRequest } from "./requests/network/ChangeAvatarRequest";
import { ChangeUsernameRequest } from "./requests/network/ChangeUsernameRequest";
import CreateCompetitionRequest from "./requests/network/Competion/CreateCompetion.request";
import CompetitionState from "@/state/CompetitionState";
import GetPublicCompetitionRequest from "./requests/network/Competion/GetPublicCompetion.request";
import AuthCheck from "./client-check/AuthCheck";
import GetCompetionByIdRequest from "./requests/network/Competion/GetCompetionById.request";
import AdminCheck from "./client-check/AdminCheck";
import RequestGetUsers from "./requests/network/GetUser.request";

import GetPrivateCompetitionRequest from "./requests/network/Competion/GetPrivateCompetion.request";
import DeleteCompetitionRequest from "./requests/network/Competion/DeleteCompetition.request";
import { GetUsersAdminListRequest } from "./requests/network/GetUsersAdminList.request";
import { UpdateUserRoleRequest } from "./requests/network/UpdateUserRole.request";
import AdminCompetitionStore from "@/state/AdminCompetitionStore";
import { AdminUsersListState } from "@/state/AdminUserState";
import FileStore from "@/state/FileStore";
import LoadFileRequest from "./requests/network/File/LoadFile.request";
import GetFileURLRequest from "./requests/network/File/GetImageURl.request";
import JoinCompetitionRequest from "@/core/requests/network/Competion/JoinCompetition.request";
import UnjoinCompetitionRequest from "@/core/requests/network/Competion/UnjoinCompetition.request";
import CreateRoundReviewRequest from "./requests/RoundReview/CreateRoundReview.request";
import GetMyTeamsRequest from "./requests/network/Teams/GetTeams.request";
import { CreateTeamRequest } from "./requests/network/CreateTeam.request";
import UpdateTeamRequest from "./requests/network/Teams/UpdateTeams.request";
import DeleteTeamRequest from "./requests/network/Teams/DeleteTeam.request";
import AddMemberRequest from "./requests/network/Teams/members/AddMember.request";
import DeleteMemberRequest from "./requests/network/Teams/members/DeleteMember.request";
import GiveCaptainRequest from "./requests/network/Teams/members/GiveCaptain.request";
import TeamRegistrationRequest from "./requests/network/Teams/RegistretionTeam.request";
import DeleteTeamRegistrationRequest from "./requests/network/Teams/DeleteTeamRegistretion.request";
import AcceptTeamRequest from "./requests/network/Teams/AcceptTeam.request";
import CreateScoreRequest from "./requests/network/Score/CreateScore.request";
import CreateSubmissionRequest from "./requests/network/Submisssion/CreateSubmission.request";
import DeleteSubmissionRequest from "./requests/network/Submisssion/DeleteSubmission.request";
import FindSubmissionRequest from "./requests/network/Submisssion/GetSubmission.request";
import UpdateSubmissionRequest from "./requests/network/Submisssion/UpdateSubmission.request";

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
container.bind(TYPES.LogoutRequest).to(LogoutRequest).inRequestScope();
container
  .bind(TYPES.UploadFileToAServerRequest)
  .to(UploadFileToAServerRequest)
  .inRequestScope();
container
  .bind(TYPES.ChangeAvatarRequest)
  .to(ChangeAvatarRequest)
  .inRequestScope();
container
  .bind(TYPES.ChangeUsernameRequest)
  .to(ChangeUsernameRequest)
  .inRequestScope();
container
  .bind(TYPES.CreateCompetitionRequest)
  .to(CreateCompetitionRequest)
  .inRequestScope();
container.bind(TYPES.CompetitionState).to(CompetitionState).inSingletonScope();
container
  .bind(TYPES.GetPublicCompetitionRequest)
  .to(GetPublicCompetitionRequest)
  .inRequestScope();
container
  .bind(TYPES.GetCompetionByIdRequest)
  .to(GetCompetionByIdRequest)
  .inRequestScope();
container
  .bind(TYPES.GetPrivateCompetitionRequest)
  .to(GetPrivateCompetitionRequest)
  .inRequestScope();
container.bind(TYPES.RequestGetUsers).to(RequestGetUsers).inRequestScope();
container
  .bind(TYPES.GetUsersAdminListRequest)
  .to(GetUsersAdminListRequest)
  .inRequestScope();
container
  .bind(TYPES.UpdateUserRoleRequest)
  .to(UpdateUserRoleRequest)
  .inRequestScope();
container.bind(TYPES.AuthCheck).to(AuthCheck).inSingletonScope();
container.bind(TYPES.AdminCheck).to(AdminCheck).inSingletonScope();
container
  .bind(TYPES.AdminCompetitionStore)
  .to(AdminCompetitionStore)
  .inSingletonScope();
container
  .bind(TYPES.DeleteCompetitionRequest)
  .to(DeleteCompetitionRequest)
  .inRequestScope();

container.bind(TYPES.FileStore).to(FileStore).inSingletonScope();
container.bind(TYPES.LoadFileRequest).to(LoadFileRequest).inRequestScope();
container.bind(TYPES.GetFileURLRequest).to(GetFileURLRequest).inRequestScope();
container
  .bind<JoinCompetitionRequest>(TYPES.JoinCompetitionRequest)
  .to(JoinCompetitionRequest);
container
  .bind<UnjoinCompetitionRequest>(TYPES.UnjoinCompetitionRequest)
  .to(UnjoinCompetitionRequest);
container.bind(TYPES.CreateCompetitionRequest).to(CreateRoundReviewRequest);

// Teams
container.bind(TYPES.GetMyTeamsRequest).to(GetMyTeamsRequest);
container.bind(TYPES.CreateTeamRequest).to(CreateTeamRequest);
container.bind(TYPES.UpdateTeamRequest).to(UpdateTeamRequest);
container.bind(TYPES.DeleteTeamRequest).to(DeleteTeamRequest);
container.bind(TYPES.AddMemberRequest).to(AddMemberRequest);
container.bind(TYPES.DeleteTeamMemberRequest).to(DeleteMemberRequest);
container.bind(TYPES.GiveCaptainRequest).to(GiveCaptainRequest);
container.bind(TYPES.TeamRegistrationRequest).to(TeamRegistrationRequest);
container.bind(TYPES.DeleteTeamRegistrationRequest).to(DeleteTeamRegistrationRequest);
container.bind(TYPES.AcceptTeamRequest).to(AcceptTeamRequest);

// Score
container.bind(TYPES.CreateScoreRequest).to(CreateScoreRequest);

// Round Review
container.bind(TYPES.CreateRoundReviewRequest).to(CreateRoundReviewRequest);

// Submission
container.bind(TYPES.CreateSubmissionRequest).to(CreateSubmissionRequest);
container.bind(TYPES.DeleteSubmissionRequest).to(DeleteSubmissionRequest);
container.bind(TYPES.FindSubmissionRequest).to(FindSubmissionRequest);
container.bind(TYPES.UpdateSubmissionRequest).to(UpdateSubmissionRequest);  
export default container;
export { TYPES };
