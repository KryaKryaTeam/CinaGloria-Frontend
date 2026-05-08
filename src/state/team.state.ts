import { create } from "zustand";

interface TeamState {
  isSubmitting: boolean;
  error: string | null;
  setSubmitting: (status: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTeamState = create<TeamState>((set) => ({
  isSubmitting: false,
  error: null,
  setSubmitting: (status) => set({ isSubmitting: status }),
  setError: (error) => set({ error }),
}));
