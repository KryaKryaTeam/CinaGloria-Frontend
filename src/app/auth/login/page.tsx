'use client'
import useLogin from "@/hooks/form/useLogin";
import { AuthForm } from "@/ui/widgets/AuthForm";
import SecondDataForm from "@/ui/widgets/SecondDataForm";
import { useState } from "react";


export default function Login() {
  

  return  ( 
    <>
      {pos === 0 && <AuthForm authPageType="login" />}
      {pos === 1 && <SecondDataForm />}
    </>
  );
}
