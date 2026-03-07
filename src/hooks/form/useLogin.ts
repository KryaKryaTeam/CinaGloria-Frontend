import { SubmitHandler, useForm } from "react-hook-form";
import { LoginData, loginSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import container from "@/core/Container";
import AuthService from "@/core/usecase/Auth/AuthService";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import { UserState } from "@/state/UserState";

export default function useLogin() {
  // rhf initialization hook
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const serviceAuth = container.get(AuthService)
  const userState = container.get(UserState)
  // submit handler
  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    try {
      const res = await serviceAuth.login(
        Email.create(data.email),
        Password.create(data.password)
      );
      userState.setUser(res)
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const submit = handleSubmit(onSubmit);

  return {
    submit,
    register,
    errors,
  };
}
