import { SubmitHandler, useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { SignUpData, signUpSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import container from "@/core/Container";

interface UseSignupReturn {
  submit: () => void;
  register: UseFormRegister<SignUpData>;
  errors: FieldErrors<SignUpData>;
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

  

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {

  };

  const submit = handleSubmit(onSubmit);

  return {
    submit,
    register,
    errors,
  };
}
