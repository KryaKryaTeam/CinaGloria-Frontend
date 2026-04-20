"use client";
import useChangeProfileForm from "@/hooks/form/useChangeProfileForm";
import { useLoadMachine } from "@/hooks/loadMachine/useLoadMachine.hook";
import { useMe } from "@/hooks/user/useMe.hook";
import { Button } from "@/ui/button";
import GridCard from "@/ui/component/gridCards/GridCard";
import { Input } from "@/ui/input";
import Loader from "@/ui/loader";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
import { ArrowLeft, PencilIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useWatch } from "react-hook-form";

function UserDataUpdateForm() {
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
    <GridCard className="max-w-200 w-1/2 min-w-100 flex">
      <article className="flex flex-col gap-4 w-full h-full">
        <div className="w-full items-center justify-between flex">
          <span className="flex items-center gap-2 w-max">
            <PencilIcon />
            <h1 className="text-xl font-semibold">Change profile data</h1>
          </span>
        </div>

        {Loading ? (
          <div className="w-full h-20 min-h-12 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-10">
            <div className="grid grid-cols-[1fr_128px_2fr] grid-rows-1 items-center gap-10 min-h-32">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold">Avatar</h2>
                <p className="text-sm font-light">
                  Displays in your profile page
                </p>
              </div>
              <Image
                src={avatarFile || profile.avatarUrl}
                alt="profile icon"
                width={128}
                height={128}
                className="h-32 object-contain rounded-full border-4 border-foreground"
                unoptimized
                loading="eager"
                {...loadMachine.attachToScope("global")}
              />

              <div className="w-full h-full flex flex-col gap-2">
                <DragAndDropInput
                  {...register("avatar")}
                  accept=".png, .jpg, .jpeg, .webp"
                />
                {errors.avatar ? (
                  <p className="text-sm text-destructive">
                    {errors.avatar.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-[1fr_2fr] grid-rows-1 items-center gap-10">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold">Username</h2>
                <p className="text-sm font-light">
                  Displays in your profile page
                </p>
              </div>
              <div className="w-full h-max flex flex-col gap-2">
                <Input
                  {...register("username")}
                  placeholder={profile.username}
                  name="username"
                  autoComplete="given-name"
                ></Input>
                {errors.username ? (
                  <p className="text-sm text-destructive">
                    {errors.username.message}
                  </p>
                ) : null}
              </div>
            </div>
            <Button>Update</Button>
            {errors.root ? (
              <p className="text-sm text-destructive">{errors.root.message}</p>
            ) : null}
          </form>
        )}
      </article>
    </GridCard>
  );
}

export default observer(UserDataUpdateForm);
