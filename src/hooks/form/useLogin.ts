import { SubmitHandler, useForm } from "react-hook-form";
import { LoginData, loginSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import container from "@/core/Container";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import RequestMe from "@/core/network/requests/RequestMe";

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

  const jwt_request = container.get(JWTChangeRequest);
  const me_request = container.get(RequestMe);

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    try {
      await jwt_request.execute({
        email: new Email(data.email),
        password: new Password(data.password),
      });

      await me_request.execute();
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
