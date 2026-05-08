import { useForm } from "react-hook-form";
import useCompetition from "../useCompetition";

export interface JoinCompetitionFormValues {
  teamId: string;
}

export const useJoinCompetitionForm = () => {
  const { join, unjoin } = useCompetition({});

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<JoinCompetitionFormValues>({
    defaultValues: {
      teamId: "",
    },
  });

  const onJoin = async (data: JoinCompetitionFormValues) => {
    try {
      await join(data.teamId);
      reset();
    } catch (error) {
      console.error("Failed to join competition:", error);
    }
  };

  const onUnjoin = async (data: JoinCompetitionFormValues) => {
    try {
      await unjoin(data.teamId);
      reset();
    } catch (error) {
      console.error("Failed to leave competition:", error);
    }
  };

  return {
    control,
    handleSubmit,
    isSubmitting,
    errors,
    onJoin,
    onUnjoin,
  };
};
