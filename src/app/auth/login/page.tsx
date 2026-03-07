"use client";
import useLogin from "@/hooks/form/useLogin";
import { AuthForm } from "@/ui/widgets/AuthForm";
import SecondDataForm from "@/ui/widgets/SecondDataForm";
import { useState } from "react";
import authFormStore from "@/state/AuthFormsState";
import { LoginForm } from "@/ui/widgets/LoginForm";
export default function Login() {
  const pos = authFormStore
  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
}
