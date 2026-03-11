import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import container from "@/core/Container";
import RequestPutAdditionData from "@/core/network/requests/RequestPutAdditionData";
import { useRouter } from "next/navigation";

const _120_YEARS_IN_MS = 120 * 365.25 * 24 * 60 * 60 * 1000;
const _14_YEARS_IN_MS = 14 * 365.25 * 24 * 60 * 60 * 1000;

const refineAllDone = (data: {
  firstName?: string;
  lastName?: string;
  surName?: string;
}): boolean => {
  const { firstName, lastName, surName } = data;
  const filledCount = [firstName, lastName, surName].filter(
    (f) => f && f.trim().length > 0,
  ).length;
  return filledCount === 0 || filledCount === 3;
};

const schema = z
  .object({
    firstName: z.string().max(255, "Too long").optional().or(z.literal("")),
    lastName: z.string().max(255, "Too long").optional().or(z.literal("")),
    surName: z.string().max(255, "Too long").optional().or(z.literal("")),
    birthDay: z
      .date({ error: "Please select a valid date" })
      .min(
        new Date(Date.now() - _120_YEARS_IN_MS),
        "Date is too far in the past",
      )
      .max(
        new Date(Date.now() - _14_YEARS_IN_MS),
        "You must be at least 14 years old",
      )
      .optional(),
    telegram: z
      .string()
      .max(255, "Telegram username is too long")
      .transform((val) => (val && !val.startsWith("@") ? `@${val}` : val))
      .optional()
      .or(z.literal("")),
    discord: z
      .string()
      .max(255, "Discord handle is too long")
      .optional()
      .or(z.literal("")),
  })
  .refine(refineAllDone, {
    message: "Please fill in all name fields or leave them all empty",
    path: ["surName"],
  });

type AdditionalData = z.infer<typeof schema>;

export default function useAdditionalDataForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch,
  } = useForm<AdditionalData>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      surName: "",
      telegram: "",
      discord: "",
      birthDay: undefined,
    },
  });

  const put_additional_data = container.get(RequestPutAdditionData);
  const n = useRouter();

  const submit = handleSubmit(async (data) => {
    console.log("Transformed Data:", data);

    try {
      await put_additional_data.execute(data);

      n.push("/app/profile");
    } catch (err) {
      setError("root", { message: (err as Error).message });
    }
  });

  return {
    register,
    errors,
    submit,
    setValue,
    watch,
  };
}
