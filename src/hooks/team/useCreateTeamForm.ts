import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import container, { TYPES } from "@/core/Container";
import { CreateTeamRequest } from "@/core/requests/network/Team/CreateTeamRequest";
import { UploadFileToAServerRequest } from "@/core/requests/network/UploadFileToAServer.request";

const schema = z.object({
  name: z.string().min(1).max(255),
  avatar: z.preprocess(
    (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
    z
      .file()
      .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
      .max(2_000_000),
  ),
  banner: z.preprocess(
    (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
    z
      .file()
      .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
      .max(5_000_000),
  ),
});

type FormValues = z.infer<typeof schema>;

export const useCreateTeamForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    const uploadFile = container.get<UploadFileToAServerRequest>(
      TYPES.UploadFileToAServerRequest,
    );

    const files: {
      scope: string;
      file: z.core.File;
      url: null | string;
    }[] = [
      { scope: "team:avatar", file: data.avatar!, url: null },
      { scope: "team:banner", file: data.banner!, url: null },
    ];

    for (const file of files) {
      file.url = await uploadFile.execute({
        file: file.file,
        scope: file.scope,
      });
    }

    const createTeamRequest = container.get<CreateTeamRequest>(
      TYPES.CreateTeamRequest,
    );

    const team = await createTeamRequest.execute({
      name: data.name,
      avatar: files[0].url!,
      banner: files[1].url!,
    });
  };

  return {
    form: {
      ...form,
      submit: form.handleSubmit(onSubmit),
      errors: form.formState.errors,
    },
  };
};
