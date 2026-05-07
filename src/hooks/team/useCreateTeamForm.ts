import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import container from "@/core/Container";
import { CreateTeamRequest } from "@/core/requests/network/CreateTeam.request";

const schema = z.object({
  name: z.string().min(1).max(255),
  avatar: z.string().nullable(),
  banner: z.string().nullable(),
});

type FormValues = z.infer<typeof schema>;

export const useCreateTeamForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", avatar: null, banner: null },
  });

  const onSubmit = async (values: FormValues) => {
    const request = container.get(CreateTeamRequest);
    await request.execute(values);

    const { useTeamState } = await import("@/state/team.state");
    if (!useTeamState.getState().error) {
      form.reset();
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
