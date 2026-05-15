import container, { TYPES } from "@/core/Container";
import { CompetitionConstructor } from "@/core/domain/entity/Competion";
import CreateCompetitionRequest, {
  Rule,
} from "@/core/requests/network/Competion/CreateCompetion.request";
import GetCompetionByIdRequest from "@/core/requests/network/Competion/GetCompetionById.request";
import GetPrivateCompetitionRequest from "@/core/requests/network/Competion/GetPrivateCompetion.request";
import GetPublicCompetitionRequest from "@/core/requests/network/Competion/GetPublicCompetion.request";
import JoinCompetitionRequest from "@/core/requests/network/Competion/JoinCompetition.request";
import UnjoinCompetitionRequest from "@/core/requests/network/Competion/UnjoinCompetition.request";
import AdminCompetitionStore from "@/state/AdminCompetitionStore";
import CompetitionState from "@/state/CompetitionState";
import { useState } from "react";

export type CreateCompetitionData = {
  name: string;
  description: string;
  dateOfEnd: Date;
  dateOfEndRegistration: Date;
  dateOfStart: Date;
  dateOfStartRegistration: Date;
  socialMedia: string;
  ultraWideBanner: string;
  rules: Array<Rule>;
  avatar: string;
  banner: string;
};

export type GetType = "all" | "public";
export type GetByIdType = { id: string };

export interface Option {
  forAdmin?: boolean;
}

const useCompetition = (option: Option) => {
  const getPrivateCompetitionRequest =
    container.get<GetPrivateCompetitionRequest>(
      TYPES.GetPrivateCompetitionRequest,
    );
  const getCompetitionByIdRequest = container.get<GetCompetionByIdRequest>(
    TYPES.GetCompetionByIdRequest,
  );
  const getPublicCompetitionRequest =
    container.get<GetPublicCompetitionRequest>(
      TYPES.GetPublicCompetitionRequest,
    );
  const createCompetitionRequest = container.get<CreateCompetitionRequest>(
    TYPES.CreateCompetitionRequest,
  );

  const joinCompetitionRequest = container.get<JoinCompetitionRequest>(
    TYPES.JoinCompetitionRequest,
  );
  const unjoinCompetitionRequest = container.get<UnjoinCompetitionRequest>(
    TYPES.UnjoinCompetitionRequest,
  );

  const store = option.forAdmin
    ? container.get<AdminCompetitionStore>(TYPES.AdminCompetitionStore)
    : container.get<CompetitionState>(TYPES.CompetitionState);

  const [page, setPage] = useState<number>(1);

  return {
    store,
    page,

    join: async (teamId: string): Promise<void> => {
      await joinCompetitionRequest.execute(teamId);
    },

    unjoin: async (teamId: string): Promise<void> => {
      await unjoinCompetitionRequest.execute(teamId);
    },

    fetch: async (
      state: GetType | GetByIdType,
      pageOverride?: number,
    ): Promise<void> => {
      const currentPage = pageOverride ?? page;
      if (typeof state === "object" && "id" in state) {
        const data = await getCompetitionByIdRequest.execute(state.id);
        if (data) store.addNewCompetition(data);
        return;
      }

      if (state === "public") {
        const data = await getPublicCompetitionRequest.execute(currentPage);
        data?.forEach((c) =>
          store.addNewCompetition(c as unknown as CompetitionConstructor),
        );
      } else {
        const data = await getPrivateCompetitionRequest.execute(currentPage);
        data?.forEach((c) =>
          store.addNewCompetition(c as unknown as CompetitionConstructor),
        );
      }
      setPage(currentPage + 1);
    },

    create: async (data: CreateCompetitionData): Promise<void> => {
      await createCompetitionRequest.execute(data);
    },

    reset: () => {
      store.clearCompetitions();
      setPage(1);
    },
  };
};

export default useCompetition;
