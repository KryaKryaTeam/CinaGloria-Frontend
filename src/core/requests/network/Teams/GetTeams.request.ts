import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface TeamHistoryEntry {
  placeInLeaderboard: number;
  roundId: string;
}

export interface TeamMemberInvite {
  member: string;
  forCompetition: boolean;
  competition: string;
  accepted: boolean;
}

export interface TeamDTO {
  id: string;
  activeCompetition: string;
  avatar: string;
  banner: string;
  captain: string;
  history: TeamHistoryEntry[];
  memberInvites: TeamMemberInvite[];
  members: string[];
  name: string;
  registrationTimeout: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface GetMyTeamsRequestData {
  page?: number;
}

// ============ Request ============

@injectable()
export default class GetMyTeamsRequest extends NetworkRequest<
  GetMyTeamsRequestData,
  TeamDTO[],
  TeamDTO[]
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "POST";
  authorized: boolean = true;
  mockOutputData: TeamDTO[] = [
    {
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
    },
  ];

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: GetMyTeamsRequestData): ISubRequestData {
    const page = data?.page ?? 0;
    return {
      url: new URL(URLEnum.TEAMS + `me/${page}`),
      init: {},
    };
  }

  onSuccess(data: TeamDTO[]): TeamDTO[] {
    return data;
  }

  protected onError(error: Error): never {
    throw error;
  }
}