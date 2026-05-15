import container, { TYPES } from "@/core/Container";
import { usePagination } from "../usePagination";
import { GetTeamPageRequest } from "@/core/requests/network/Team/GetTeamPageRequest";
import TeamState from "@/state/TeamState";
import { z } from "zod";
import Team, { TeamStatus } from "@/core/domain/entity/Team";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { CreateTeamRequest } from "@/core/requests/network/Team/CreateTeamRequest";
import { UploadFileToAServerRequest } from "@/core/requests/network/UploadFileToAServer.request";
import { PatchTeamRequest } from "@/core/requests/network/Team/PatchTeamRequest";



export const teamFiltersSchema = z
  .object({
    name: z.string().max(100).nullable().optional(),
    status: z.enum(TeamStatus).or(z.literal("ALL")),
    minMembers: z.number().min(1).nullable().optional(),
    maxMembers: z.number().min(1).nullable().optional(),
    isCaptain: z.boolean().default(false),
    hasInvites: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (
      data.minMembers !== null &&
      data.maxMembers !== null &&
      data.minMembers !== undefined &&
      data.maxMembers !== undefined &&
      data.minMembers > data.maxMembers
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Min members cannot exceed max members",
        path: ["minMembers"],
      });
    }
  });

export type TeamFiltersValues = z.infer<typeof teamFiltersSchema>;

export function useTeams() {
  const teamState = container.get<TeamState>(TYPES.TeamState);

  const form = useForm({
    resolver: zodResolver(teamFiltersSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      status: "ALL",
      minMembers: null,
      maxMembers: null,
      isCaptain: false,
      hasInvites: false,
    },
  });


  const watchedData = form.watch();

  const formData = useMemo(() => {
    return watchedData;
  }, [
    watchedData.name,
    watchedData.status,
    watchedData.minMembers,
    watchedData.maxMembers,
    watchedData.isCaptain,
    watchedData.hasInvites,
  ]);

  const fetchTeams = async (page: number) => {
    const getPageOfTeamsRequest = container.get<GetTeamPageRequest>(
      TYPES.GetTeamPageRequest,
    );

    // Очищаємо "ALL" для бекенду
    const statusFilter =
      formData.status === "ALL" ? undefined : formData.status;

    const teams = await getPageOfTeamsRequest.execute({
      page,
      options: {
        ...formData,
        status: statusFilter as TeamStatus,
        name: formData.name || undefined,
        minMembers: formData.minMembers || undefined,
        maxMembers: formData.maxMembers || undefined,
      },
    });

    if (page === 0) {
      teamState.clear();
    }

    teams.forEach((team) => {
      teamState.addOrUpdateTeam(team);
    });
  };

  const pagination = usePagination(fetchTeams, {
    dependencies: [formData],
  });

  useEffect(() => {
    fetchTeams(0);
  }, [formData]);

  return {
    pagination,
    form,
    get teams() {
      return teamState.teams;
    },
    utils: {
      resetFilters: () => form.reset(),
    },
  };
}
