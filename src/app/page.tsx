'use client';
import registerServiceWorker from "@/infrastructur/RegisterServiceWorker";
import { AuthForm } from "@/ui/widgets/AuthForm";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    registerServiceWorker();
  }, []);
  return <>is main</>;
}
