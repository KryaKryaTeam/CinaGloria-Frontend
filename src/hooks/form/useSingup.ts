import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { SignUpData, signUpSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import container from "@/core/Container";
import { RequestRegistartion } from "@/core/network/requests/RequestRegistration";
import { useRouter } from "next/navigation";

interface UseSignupReturn {
  submit: () => void;
  register: UseFormRegister<SignUpData>;
  errors: FieldErrors<SignUpData>;
  setValue: UseFormSetValue<SignUpData>;
}

export default function useSignup(): UseSignupReturn {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    setError,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      termsAndPolicyChecked: false,
    },
    mode: "onChange",
  });

  const n = useRouter();

  const registration_request = container.get(RequestRegistartion);

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    try {
      console.log(data);
      const { requestId } = await registration_request.execute({
        email: data.email,
        password: data.password,
      });

      if (requestId) n.push(`/auth/verification?requestId=${requestId}`);
    } catch (err) {
      setError("root", { message: (err as Error).message });
    }
  };

  const submit = handleSubmit(onSubmit);

  return {
    submit,
    register,
    errors,
    setValue,
  };
}
