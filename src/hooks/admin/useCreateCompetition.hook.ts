import container from "@/core/Container";
import { TYPES } from "@/core/Container.types";
import CreateCompetitionRequest from "@/core/requests/network/Competion/CreateCompetion.request";
import { UploadFileToAServerRequest } from "@/core/requests/network/UploadFileToAServer.request";
import AdminCompetitionStore from "@/state/AdminCompetitionStore";
import { LoadState } from "@/state/LoadMachine/LoadState";
import { zodResolver } from "@hookform/resolvers/zod";
import { da } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z
  .object({
    name: z.string().min(1, "Name is required").max(255).optional(),
    desc: z.string().min(1, "Description is required").max(1000).optional(),

    // Image slots with pre-defined limits
    avatar: z.preprocess(
      (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
      z
        .file()
        .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
        .max(2_000_000)
        .optional()
        .nullable(),
    ),
    banner: z.preprocess(
      (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
      z
        .file()
        .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
        .max(5_000_000)
        .optional()
        .nullable(),
    ),
    ultraWideBanner: z.preprocess(
      (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
      z
        .file()
        .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
        .max(10_000_000)
        .optional()
        .nullable(),
    ),
    socialMedia: z.preprocess(
      (v) => (v instanceof FileList ? v.item(0) : v instanceof File ? v : null),
      z
        .file()
        .mime(["image/png", "image/jpeg", "image/webp", "image/avif"])
        .max(5_000_000)
        .optional()
        .nullable(),
    ),

    // All dates are optional
    registrationStart: z.date().optional().nullable(),
    registrationEnd: z.date().optional().nullable(),
    battleStart: z.date().optional().nullable(),
    battleEnd: z.date().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    const { registrationStart, registrationEnd, battleStart, battleEnd } = data;
    const now = new Date();

    if (registrationStart && registrationStart <= now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration must start in the future",
        path: ["registrationStart"],
      });
    }

    if (
      registrationStart &&
      registrationEnd &&
      registrationEnd <= registrationStart
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration must end after it starts",
        path: ["registrationEnd"],
      });
    }

    if (registrationEnd && battleStart && battleStart <= registrationEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Battle must start after registration ends",
        path: ["battleStart"],
      });
    }

    if (battleStart && battleEnd && battleEnd <= battleStart) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Battle must end after it starts",
        path: ["battleEnd"],
      });
    }
  });

export function useCreateCompetition() {
  const createCompetitionRequest = container.get<CreateCompetitionRequest>(
    TYPES.CreateCompetitionRequest,
  );

  const uploadFileRequest = container.get<UploadFileToAServerRequest>(
    TYPES.UploadFileToAServerRequest,
  );

  const loadState = container.get<LoadState>(TYPES.LoadState);
  const compStore = container.get<AdminCompetitionStore>(
    TYPES.AdminCompetitionStore,
  );

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const router = useRouter();

  const onSubmit = async (data: {
    name?: string | undefined;
    desc?: string | undefined;
    avatar?: z.core.File | null | undefined;
    banner?: z.core.File | null | undefined;
    ultraWideBanner?: z.core.File | null | undefined;
    socialMedia?: z.core.File | null | undefined;
    registrationStart?: Date | null | undefined;
    registrationEnd?: Date | null | undefined;
    battleStart?: Date | null | undefined;
    battleEnd?: Date | null | undefined;
  }) => {
    try {
      const files: {
        scope: string;
        file: z.core.File | null | undefined;
        url: null | string;
      }[] = [
        { scope: "competition:avatar", file: data.avatar, url: null },
        { scope: "competition:banner", file: data.banner, url: null },
        {
          scope: "competition:ultraWideBanner",
          file: data.ultraWideBanner,
          url: null,
        },
        { scope: "competition:socialMedia", file: data.socialMedia, url: null },
      ];

      for (const file of files) {
        if (file.file) {
          file.url = await uploadFileRequest.execute({
            file: file.file,
            scope: file.scope,
          });
        }
      }

      await createCompetitionRequest.execute({
        ...data,
        description: data.desc,
        avatar: files[0].url as string,
        banner: files[1].url as string,
        ultraWideBanner: files[2].url as string,
        socialMedia: files[3].url as string,
        dateOfEnd: data.battleEnd ?? undefined,
        dateOfEndRegistration: data.registrationEnd ?? undefined,
        dateOfStart: data.battleStart ?? undefined,
        dateOfStartRegistration: data.registrationStart ?? undefined,
      });

      compStore.clearCompetitions();
      loadState.forceScope("admin");
      router.back();
    } catch (err) {
      form.control.setError("root", { message: (err as Error).message });
    }
  };

  return {
    submit: form.handleSubmit(onSubmit),
    register: form.register,
    errors: form.formState.errors,
  };
}
