"use client";
import useLogin from "@/hooks/form/useLogin";
import SecondDataForm from "@/ui/widgets/SecondDataForm";
import { useState } from "react";
import authFormStore from "@/state/AuthFormsState";
import { LoginForm } from "@/ui/widgets/LoginForm";
import Image from "next/image";
import WaveBackground from "@/ui/backgrounds/WaveBackground";
export default function Login() {
  const pos = authFormStore;
  return (
    <>
      <WaveBackground />
      <LoginForm></LoginForm>
    </>
  );
}
