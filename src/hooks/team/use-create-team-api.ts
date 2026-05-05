import { CreateTeamRequest } from "@/core/models/create-team.request";

export const useCreateTeamApi = () => {
  const createTeam = async (data: CreateTeamRequest) => {
    const response = await fetch("https://bots.swedka121.com/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create team");
    }

    return await response.json();
  };

  return { createTeam };
};
