import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import { TeamDTO } from "./GetTeams.request";


// ============ Types ============

export interface CreateTeamRequestData {
  avatar: string;
  banner: string;
  name: string;
}

// ============ Request ============

@injectable()
export default class CreateTeamRequest extends NetworkRequest<
  CreateTeamRequestData,
  TeamDTO,
  TeamDTO
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "POST";
  authorized: boolean = true;
  mockOutputData: TeamDTO = {
    id: "team-uuid-001",
    activeCompetition: "season-2024",
    avatar: "550e8400-e29b-41d4-a716-446655440000.webp",
    banner: "550e8400-e29b-41d4-a716-446655440000.webp",
    captain: "captain-user-id",
    history: [{ placeInLeaderboard: 1, roundId: "round-uuid-123" }],
    memberInvites: [
      {
        member: "user-uuid-456",
        forCompetition: true,
        competition: "comp-uuid-789",
        accepted: false,
      },
    ],
    members: ["user-1", "user-2"],
    name: "The Dream Team",
    registrationTimeout: "2026-05-02T17:00:00Z",
    status: "ACTIVE",
  };

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: CreateTeamRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.TEAMS),
      init: {
        body: {
          avatar: data.avatar,
          banner: data.banner,
          name: data.name,
        },
      },
    };
  }

  onSuccess(data: TeamDTO): TeamDTO {
    return data;
  }

  protected onError(error: Error): never {
    throw error;
  }
}