import { SubmitHandler, useForm } from "react-hook-form";
import { LoginData, loginSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import container, { TYPES } from "@/core/Container";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import { useRouter } from "next/navigation";
import JWTChangeRequest from "@/core/requests/network/JWT.request";

export default function useLogin() {
  // rhf initialization hook
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const n = useRouter();
  const jwt_request = container.get<JWTChangeRequest>(TYPES.JWTChangeRequest);

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    try {
      await jwt_request.execute({
        email: new Email(data.email),
        password: new Password(data.password),
      });

      n.push("/test");
    } catch (error) {
      setError("root", { message: (error as Error).message });
    }
  };

  const submit = handleSubmit(onSubmit);

  return {
    submit,
    register,
    errors,
  };
}
