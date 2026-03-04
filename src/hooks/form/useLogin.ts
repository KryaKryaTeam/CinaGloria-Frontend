import { SubmitHandler, useForm } from "react-hook-form";
import { LoginData, loginSchema } from "./schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { set } from "zod";
type Pos = 0 | 1;
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
    
  // submit handler
  const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => { 
     setPos(1);
  }

  return {
    handleSubmit,
    register,
    errors,
  };
}
