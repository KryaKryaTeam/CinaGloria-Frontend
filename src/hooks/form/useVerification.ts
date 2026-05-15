import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import container, { TYPES } from "@/core/Container";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { RequestConfirm } from "@/core/requests/network/Confirm.request";

const schema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must only contain numbers"),
});

export default function useVerification() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<{ code: string }>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: { code: undefined },
  });
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const n = useRouter();
  const request_confirm = container.get<RequestConfirm>(TYPES.RequestConfirm);

  const submit = handleSubmit(async (data) => {
    if (!requestId) return n.push("/auth/singup");
    try {
      await request_confirm.execute({
        code: data.code,
        requestId: requestId,
      });

      n.push("/auth/info");
    } catch (err) {
      setError("root", { message: (err as Error).message });
    }
  });

  return {
    register,
    submit,
    errors,
  };
}
