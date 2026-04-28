"use client";
import useChangeProfileForm from "@/hooks/form/useChangeProfileForm";
import { useLoadMachine } from "@/hooks/loadMachine/useLoadMachine.hook";
import { useMe } from "@/hooks/user/useMe.hook";
import { Button } from "@/ui/button";
import GridCard from "@/ui/component/gridCards/GridCard";
import { Input } from "@/ui/input";
import Loader from "@/ui/loader";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
import SecondDataForm from "@/ui/widgets/users/SecondDataForm";
import UserDataUpdateForm from "@/ui/widgets/users/UserDataUpdateForm";
import { ArrowLeft, PencilIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useWatch } from "react-hook-form";

function Page() {
  const router = useRouter();
  const profile = useMe().get();
  const loadMachine = useLoadMachine();

  const { register, control, errors, submit, Loading } = useChangeProfileForm();

  const urlObjRef = useRef<string>(null);

  const avatarFile = useWatch({
    name: "avatar",
    control,
    compute: (value) => {
      if (errors.avatar) {
        return null;
      }
      if (!value) return null;

      const file = value instanceof FileList ? value.item(0) : value;

      if (!(file instanceof Blob)) return null;

      const newUrl = URL.createObjectURL(file);
      return newUrl;
    },
  });

  useEffect(() => {
    if (avatarFile && avatarFile !== urlObjRef.current) {
      if (urlObjRef.current) URL.revokeObjectURL(urlObjRef.current);
      urlObjRef.current = avatarFile;
    }
  }, [avatarFile]);

  useEffect(() => {
    return () => {
      if (urlObjRef.current) URL.revokeObjectURL(urlObjRef.current);
    };
  }, []);
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-4">
      <UserDataUpdateForm />
      <SecondDataForm.grid />
    </section>
  );
}

export default observer(Page);
