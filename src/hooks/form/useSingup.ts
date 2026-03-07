import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpData, signUpSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import container from "@/core/Container";
import AuthService from "@/core/usecase/Auth/AuthService";

interface UseSignupReturn {
  submit: () => void;
  register: ReturnType<typeof useForm>['register'];
  errors: ReturnType<typeof useForm>['formState']['errors'];
}

export default function useSignup(): UseSignupReturn {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { surname: "", email: "", password: "", repeatPassword: "" },
    mode: "onChange",
  });

  const serviceAuth = container.get(AuthService);

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    // TODO: call signup endpoint when available
    console.log("signup data", data);
    // e.g. await serviceAuth.signup(...)
  };

  const submit = handleSubmit(onSubmit);

  return {
    submit,
    register,
    errors,
  };
}
