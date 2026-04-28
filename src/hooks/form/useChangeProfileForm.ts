import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Username from "@/core/domain/value-object/Username";
import container, { TYPES } from "@/core/Container";
import { UploadFileToAServerRequest } from "@/core/requests/network/UploadFileToAServer.request";
import { ChangeAvatarRequest } from "@/core/requests/network/ChangeAvatarRequest";
import { LoadState } from "@/state/LoadMachine/LoadState";
import { useState } from "react";
import { ChangeUsernameRequest } from "@/core/requests/network/ChangeUsernameRequest";

const schema = z.object({
  avatar: z.preprocess(
    (v) => {
      if (v instanceof FileList) return v.item(0);
      if (v instanceof File) return v;
      return null;
    },
    z
      .file()
      .mime(["image/png", "image/jpeg", "image/webp"])
      .max(2_000_000)
      .optional()
      .nullable(),
  ),
  username: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v) return true;

        try {
          return !!Username.create(v);
        } catch {
          return false;
        }
      },
      {
        message: "Invalid format of username. Try to delete _ at start",
      },
    ),
});

interface Schema {
  avatar?: FileList;
  username?: string;
}

export default function useChangeProfileForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema) as unknown as Resolver<
      Schema,
      unknown,
      Schema
    >,
    mode: "onChange",
    defaultValues: {},
  });

  const [Loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
    try {
      setLoading(true);
      const uploadFile = container.get<UploadFileToAServerRequest>(
        TYPES.UploadFileToAServerRequest,
      );
      const changeAvatar = container.get<ChangeAvatarRequest>(
        TYPES.ChangeAvatarRequest,
      );

      const changeUsername = container.get<ChangeUsernameRequest>(
        TYPES.ChangeUsernameRequest,
      );

      if (data.avatar) {
        const url = await uploadFile.execute({
          file: data.avatar as unknown as File,
          scope: "user:avatar",
        });

        await changeAvatar.execute({ url });
      }

      if (data.username) {
        await changeUsername.execute({ username: data.username });
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError("root", { message: errorMessage });
    } finally {
      const loadMachine = container.get<LoadState>(TYPES.LoadState);
      loadMachine.forceScope("profile");
      setLoading(false);
    }
  };

  const submit = handleSubmit(onSubmit);

  return {
    submit,
    register,
    errors,
    control,
    Loading,
  };
}
