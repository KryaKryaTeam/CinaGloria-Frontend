import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CreateTeamRequest,
  MAX_TEAM_NAME_LENGTH,
} from "@/core/models/create-team.request";
import { useTeamState } from "@/state/team.state";
import { useCreateTeamApi } from "./useCreateTeamApi";

const schema = z.object({
  name: z.string().min(1).max(MAX_TEAM_NAME_LENGTH),
  avatar: z.string().nullable(),
  banner: z.string().nullable(),
});

type FormValues = z.infer<typeof schema>;

export const useCreateTeamForm = () => {
  const { createTeam } = useCreateTeamApi();
  const { setSubmitting, setError } = useTeamState();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: new CreateTeamRequest(),
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setError(null);
    try {
      await createTeam(values);
      form.reset();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
