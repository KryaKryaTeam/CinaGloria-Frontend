/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { observer } from "mobx-react-lite";

import container, { TYPES } from "@/core/Container";
import CompetitionRule from "@/core/domain/value-object/CompetitionRule";
import { Icons } from "@/core/domain/entity/type";

import AdminCompetitionStore from "@/state/AdminCompetitionStore";
// import { UpdateCompetitionRequest } from "@/core/requests/network/Competition/UpdateCompetition.request";

import z from "zod";

// --- SCHEMAS ---

const form1Sch = z
  .object({
    name: z.string().min(1, "Name is required").max(255).optional(),
    desc: z.string().min(1, "Description is required").max(1000).optional(),
    avatar: z.any().optional().nullable(),
    banner: z.any().optional().nullable(),
    ultraWideBanner: z.any().optional().nullable(),
    socialMedia: z.any().optional().nullable(),
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

// --- HOOK ---

export function useChangeCompetitionForm() {
  const { id } = useParams<{ id: string }>();
  const compStore = container.get<AdminCompetitionStore>(
    TYPES.AdminCompetitionStore,
  );

  // Отримуємо об'єкт зі стору.
  // Завдяки MobX, якщо в сторі дані оновляться, competition перерахується
  const competition = useMemo(
    () => compStore.getById(id),
    [id, compStore.competitions.length],
  );

  const form1 = useForm<z.infer<typeof form1Sch>>({
    resolver: zodResolver(form1Sch),
    mode: "onChange",
    defaultValues: {
      name: competition?.name,
      desc: competition?.description,
    },
  });

  const form2 = useForm<z.infer<typeof form2Sch>>({
    resolver: zodResolver(form2Sch),
  });

  // Синхронізація форми з даними стору при завантаженні
  useEffect(() => {
    if (competition) {
      form1.reset({
        name: competition.name,
        desc: competition.description,
        battleEnd: competition.dateOfEnd,
        battleStart: competition.dateOfStart,
        registrationEnd: competition.dateOfEndRegistration,
        registrationStart: competition.dateOfStartRegistration,
        // Картинки зазвичай ініціалізуються як URL рядки або null,
        // File об'єкти з'являться тільки при ручному виборі в Input
      });
    }
  }, [competition]);

  // --- HANDLERS ---

  const onSubmit1 = async (data: z.infer<typeof form1Sch>) => {
    // const request = container.get<UpdateCompetitionRequest>(
    //   TYPES.,
    // );
    // try {
    //   // Тут можна додати логіку завантаження файлів через UploadFileToAServerRequest,
    //   // якщо твій бекенд очікує UUID замість бінарників
    //   await request.execute({
    //     competitionId: id,
    //     ...data,
    //   });
    //   // Оптимістично оновлюємо стор (якщо в сутності є метод update)
    //   competition?.updateData?.(data);
    // } catch (e) {
    //   console.error("Failed to update competition", e);
    // }
  };

  const onSubmit2 = async (data: z.infer<typeof form2Sch>) => {
    if (!competition) return;

    const rule = new CompetitionRule({
      name: data.name,
      description: data.desc,
      icon: data.icon as unknown as Icons,
    });

    // Логіка додавання правила (зазвичай через API запит)
    competition.addRule(rule);
    form2.reset();
  };

  return {
    // Повертаємо цілі об'єкти форм для Shadcn <Form {...form}>
    form1: {
      ...form1,
      errors: form1.formState.errors,
      submit: form1.handleSubmit(onSubmit1),
    },
    form2: {
      ...form2,
      errors: form2.formState.errors,
      submit: form2.handleSubmit(onSubmit2),
    },
    competition,
    rules: competition?.rules || [],
  };
}
