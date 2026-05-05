import { create } from "zustand";
import { CreateTeamRequest } from "@/core/models/create-team.request";

interface TeamState {
  isSubmitting: boolean;
  error: string | null;
  setSubmitting: (status: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTeamState = create<TeamState>(
  (set: (arg0: { isSubmitting?: boolean; error?: string | null }) => any) => ({
    isSubmitting: false,
    error: null,
    setSubmitting: (status: boolean) => set({ isSubmitting: status }),
    setError: (error: string | null) => set({ error }),
  }),
);
