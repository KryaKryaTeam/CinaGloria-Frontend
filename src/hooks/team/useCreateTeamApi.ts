import { CreateTeamRequest } from "@/core/models/create-team.request";
import { NetworkRequest } from "@/core/requests/network/NetworkRequest";

export const useCreateTeamApi = () => {
  const createTeam = async (data: CreateTeamRequest) => {
    return await NetworkRequest.post("/teams", data);
  };

  return { createTeam };
};
