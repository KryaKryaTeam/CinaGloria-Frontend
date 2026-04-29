import container, { TYPES } from "@/core/Container"
import { CompetitionStatus } from "@/core/domain/entity/Competion";
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

const PRIVATE_STATUSES = new Set([CompetitionStatus.DRAFT]);

const useCompetition = (option: Option) => {
    const userState = container.get<UserState>(TYPES.UserState);
    const getPrivateCompetitionRequest = container.get<GetPrivateCompetitionRequest>(TYPES.GetPrivateCompetitionRequest);
    const getCompetitionByIdRequest = container.get<GetCompetionByIdRequest>(TYPES.GetCompetionByIdRequest);
    const getPublicCompetitionRequest = container.get<GetPublicCompetitionRequest>(TYPES.GetPublicCompetitionRequest);

    const store = option.forAdmin
        ? container.get<AdminCompetitionStore>(TYPES.AdminCompetitionStore)
        : container.get<CompetitionState>(TYPES.CompetitionState);

    const [page, setPage] = useState<number>(0);

    /**
     * Reads competitions from the store and filters them.
     * Does NOT trigger any network call.
     */
    const get = (state: GetType | GetByIdType) => {
        const all = store.competitions;

        if (typeof state === "object" && "id" in state) {
            return all.filter((c) => c.id === state.id);
        }

        if (state === "public") {
            return all.filter((c) => !PRIVATE_STATUSES.has(c.status));
        }

        // "all"
        return all;
    };

    /**
     * Fetches competitions from the network and pushes them into the store.
     * Call this first to populate the store, then use get() to read from it.
     */
    const fetch = async (state: GetType | GetByIdType) => {
    if (typeof state === "object" && "id" in state) {
        const data = await getCompetitionByIdRequest.execute(state.id);
        if (data) store.addNewCompetition(data);
        return;
    }

    // "all" and "public" both paginate through the same private endpoint
    const data = await getPrivateCompetitionRequest.execute(page);
    data?.forEach((c) => store.addNewCompetition(c));
    setPage((prev) => prev + 1);
    };

    /**
     * Clears the store and resets pagination back to 0.
     */
    const reset = () => {
        store.clearCompetitions();
        setPage(0);
    };

    return { get, fetch, reset, page };
};

export default useCompetition;