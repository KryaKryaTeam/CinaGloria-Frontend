import container, { TYPES } from "@/core/Container"
import { Competition, CompetitionStatus } from "@/core/domain/entity/Competion";
import GetCompetionByIdRequest from "@/core/requests/network/Competion/GetCompetionById.request";
import GetPrivateCompetitionRequest from "@/core/requests/network/Competion/GetPrivateCompetion.request";
import GetPublicCompetitionRequest from "@/core/requests/network/Competion/GetPublicCompetion.request"
import AdminCompetitionStore from "@/state/AdminCompetitionStore";
import CompetitionState from "@/state/CompetitionState";
import { UserState } from "@/state/UserState"
import { useState } from "react";

type GetType = "all" | "public";
type GetByIdType = { id: string };

interface Option {
    forAdmin?: boolean;
}

const useCompetition = (option: Option): {
    store: AdminCompetitionStore | CompetitionState;
    fetch(state: GetType | GetByIdType, pageOverride?: number): Promise<void>;
    reset(): void;
    page: number;
} => {
    const userState = container.get<UserState>(TYPES.UserState);
    const getPrivateCompetitionRequest = container.get<GetPrivateCompetitionRequest>(TYPES.GetPrivateCompetitionRequest);
    const getCompetitionByIdRequest = container.get<GetCompetionByIdRequest>(TYPES.GetCompetionByIdRequest);
    const getPublicCompetitionRequest = container.get<GetPublicCompetitionRequest>(TYPES.GetPublicCompetitionRequest);

    const store = option.forAdmin
        ? container.get<AdminCompetitionStore>(TYPES.AdminCompetitionStore)
        : container.get<CompetitionState>(TYPES.CompetitionState);

    const [page, setPage] = useState<number>(1);

    return {
        store,

        fetch: async (state: GetType | GetByIdType, pageOverride?: number): Promise<void> => {
            const currentPage = pageOverride ?? page;

            if (typeof state === "object" && "id" in state) {
                const data = await getCompetitionByIdRequest.execute(state.id);
                if (data) store.addNewCompetition(data);
                return;
            }

            const data = await getPrivateCompetitionRequest.execute(currentPage);
            data?.forEach((c) => store.addNewCompetition(c));
            setPage(currentPage + 1);
        },

        reset: () => {
            store.clearCompetitions();
            setPage(0);
        },

        page,
    };
};

export default useCompetition;