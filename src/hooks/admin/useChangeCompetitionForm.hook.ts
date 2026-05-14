/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { observer } from "mobx-react-lite";

import container, { TYPES } from "@/core/Container";
import CompetitionRule from "@/core/domain/value-object/CompetitionRule";
import { Icons } from "@/core/domain/entity/type";

import AdminCompetitionStore from "@/state/AdminCompetitionStore";
// import { UpdateCompetitionRequest } from "@/core/requests/network/Competition/UpdateCompetition.request";

import z from "zod";
import debugLog from "@/infrastructure/debugLog";
import Competition from "@/core/domain/entity/Competion";
import { UpdateCompetitionRequest } from "@/core/requests/network/Competion/UpdateCompetition.request";
import { UploadFileToAServerRequest } from "@/core/requests/network/UploadFileToAServer.request";
import { da } from "date-fns/locale";
import GetPrivateCompetitionRequest from "@/core/requests/network/Competion/GetPrivateCompetion.request";
import Round, { RoundStatus } from "@/core/domain/entity/Round";
import { CreateRoundRequest } from "@/core/requests/network/Round/CreateRound.request";
import { CreateTaskRequest } from "@/core/requests/network/Task/CreateTask.request";
import Task from "@/core/domain/entity/Task";
import { DeleteRoundRequest } from "@/core/requests/network/Round/DeleteRound.request";
import { DeleteTaskRequest } from "@/core/requests/network/Task/DeleteTask.request";

// --- SCHEMAS ---

export function useChangeCompetitionForm() {
  const { id } = useParams<{ id: string }>();
  const compStore = container.get<AdminCompetitionStore>(
    TYPES.AdminCompetitionStore,
  );
  const competition = useMemo(
    () => compStore.getById(id),
    [id, compStore.competitions.length],
  );

  const general = useGeneral({ competition });
  const rounds = useRoundAndTask({ competition });

  return {
    competition,
    general,
    rounds,
  };
}

const form1Sch = z
  .object({
    name: z.string().min(1, "Name is required").max(255).optional(),
    desc: z.string().min(1, "Description is required").max(1000).optional(),
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
    registrationStart: z.date().optional().nullable(),
    registrationEnd: z.date().optional().nullable(),
    battleStart: z.date().optional().nullable(),
    battleEnd: z.date().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    const { registrationStart, registrationEnd, battleStart, battleEnd } = data;
    if (
      registrationStart &&
      registrationEnd &&
      registrationEnd <= registrationStart
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Registration end must be after start",
        path: ["registrationEnd"],
      });
    }
    if (registrationEnd && battleStart && battleStart <= registrationEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Battle must start after registration",
        path: ["battleStart"],
      });
    }
    if (battleStart && battleEnd && battleEnd <= battleStart) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Battle end must be after start",
        path: ["battleEnd"],
      });
    }
  });

const form2Sch = z.object({
  name: z.string().min(1, "Name is required").max(255),
  desc: z.string().min(1, "Description is required").max(1000),
  icon: z.string(),
});

function useGeneral({ competition }: { competition?: Competition }) {
  const formGeneralData = useForm({
    resolver: zodResolver(form1Sch),
    mode: "onChange",
    defaultValues: {
      name: competition?.name,
      desc: competition?.description,
    },
  });

  const formCreateRule = useForm<z.infer<typeof form2Sch>>({
    resolver: zodResolver(form2Sch),
  });

  const onSubmit2 = async (data: z.infer<typeof form2Sch>) => {
    if (!competition) return;

    const rule = new CompetitionRule({
      name: data.name,
      description: data.desc,
      icon: data.icon as unknown as Icons,
    });

    debugLog("Add rule");

    competition.addRule(rule);
    formCreateRule.reset();
  };

  const onSubmit1 = async (data: z.infer<typeof form1Sch>) => {
    const request = container.get<UpdateCompetitionRequest>(
      TYPES.UpdateCompetitionRequest,
    );
    const uploadFileRequest = container.get<UploadFileToAServerRequest>(
      TYPES.UploadFileToAServerRequest,
    );

    try {
      if (!competition) throw new Error();

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

      await request.execute({
        id: competition.id,
        avatar: files[0].url,
        banner: files[1].url,
        ultraWideBanner: files[2].url,
        socialMedia: files[3].url,
        dateOfEnd: data.battleEnd ?? undefined,
        dateOfEndRegistration: data.registrationEnd ?? undefined,
        dateOfStart: data.battleStart ?? undefined,
        dateOfStartRegistration: data.registrationStart ?? undefined,
        description: data.desc,
        name: data.name,
        rules: competition.rules.map((rule) => ({
          name: rule.name,
          description: rule.description,
          icon: rule.icon,
        })),
      });
    } catch (e) {
      console.error("Failed to update competition", e);
    }
  };

  useEffect(() => {
    if (competition) {
      formGeneralData.reset({
        name: competition.name,
        desc: competition.description,
        registrationStart: competition.dateOfStartRegistration,
        registrationEnd: competition.dateOfEndRegistration,
        battleStart: competition.dateOfStart,
        battleEnd: competition.dateOfEnd,
      });
    }
  }, [competition]);

  return {
    formGeneralData: {
      ...formGeneralData,
      submit: formGeneralData.handleSubmit(onSubmit1),
      errors: formGeneralData.formState.errors,
    },
    formCreateRule: {
      ...formCreateRule,
      submit: formCreateRule.handleSubmit(onSubmit2),
      errors: formCreateRule.formState.errors,
    },
    utils: {
      deleteRule: (ruleIndx: number) => {
        competition!.removeRule(ruleIndx);
      },
    },
  };
}

const form3Sch = z
  .object({
    name: z.string().min(1, "Name is required").max(255),
    desc: z.string().min(1, "Description is required").max(1000),
    icon: z.string().min(1, "Icon is required"),
    roundStart: z.date(),
    roundEnd: z.date(),
    deadline: z.date(),
  })
  .superRefine((data, ctx) => {
    const { roundStart, roundEnd, deadline } = data;

    // 1. Deadline має бути між Start та End
    if (deadline <= roundStart || deadline >= roundEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Deadline must be strictly between start and end",
        path: ["deadline"],
      });
    }

    // 2. Start має бути раніше за End
    if (roundStart >= roundEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start must be before end",
        path: ["roundEnd"],
      });
    }
  });

const form4Sch = z.object({
  name: z.string().min(1, "Name is required").max(255),
  desc: z.string().min(1, "Description is required").max(1000),
  color: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid HEX color format")
    .transform((val) => (val.startsWith("#") ? val : `#${val}`)),
});

export function useRoundAndTask({
  competition,
}: {
  competition?: Competition;
}) {
  const formRound = useForm({
    resolver: zodResolver(form3Sch),
  });

  const formTask = useForm({
    resolver: zodResolver(form4Sch),
  });

  async function createNewRound(data: z.infer<typeof form3Sch>) {
    if (!competition) return;
    const request = container.get<CreateRoundRequest>(TYPES.CreateRoundRequest);

    const round = await request.execute({
      round: {
        name: data.name,
        description: data.desc,
        icon: data.icon as unknown as Icons,
        endOfRound: data.roundEnd,
        startOfRound: data.roundStart,
        taskTimeout: data.deadline,
      },
      competitionId: competition.id,
    });

    competition.addRound(round);

    formRound.reset();
  }

  function createNewTask(roundId: string) {
    return async (data: z.infer<typeof form4Sch>) => {
      if (!competition) return;
      const request = container.get<CreateTaskRequest>(TYPES.CreateTaskRequest);

      const task = await request.execute({
        name: data.name,
        description: data.desc,
        color: data.color,
        roundId,
      });

      const round = competition.rounds.find((a) => a.id == roundId);
      round?.addNewTask(task);

      formTask.reset();
    };
  }

  return {
    existingRounds: competition?.rounds ?? [],
    formRound: {
      ...formRound,
      errors: formRound.formState.errors,
      submit: formRound.handleSubmit(createNewRound),
    },
    formTask: {
      ...formTask,
      errors: formTask.formState.errors,
      submit: (roundId: string) => {
        return formTask.handleSubmit(createNewTask(roundId));
      },
    },
    utils: {
      deleteRound: async (roundId: string) => {
        if (!competition) return;
        const request = container.get<DeleteRoundRequest>(
          TYPES.DeleteRoundRequest,
        );

        await request.execute(roundId);

        competition.removeRoundById(roundId);
      },
      deleteTask: async (roundId: string, taskId: string) => {
        if (!competition) return;

        const round = competition.rounds.find((a) => a.id == roundId);
        if (!round) return;

        const request = container.get<DeleteTaskRequest>(
          TYPES.DeleteTaskRequest,
        );

        await request.execute(taskId);

        round.removeTask(taskId);
      },
    },
  };
}
