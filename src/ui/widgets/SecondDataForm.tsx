"use client";

import { ArrowRight } from "lucide-react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { DatePickerInput } from "../datePicker";
import Link from "next/link";
import useAdditionalDataForm from "@/hooks/form/useAdditionalDataForm";
export default function SecondDataForm() {
  const { register, errors, submit } = useAdditionalDataForm();
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Personalize your profile</CardTitle>
        <CardDescription>
          All fields are optional. You can always update these later in your
          settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-1">First name</Label>
              <Input placeholder="John" {...register("firstName")} />
              {errors.firstName && (
                <p className="text-xs text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label className="block mb-1">Last name</Label>
              <Input placeholder="Doe" {...register("lastName")} />
              {errors.lastName && (
                <p className="text-xs text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label className="block mb-1">Surname</Label>
            <Input placeholder="Your surname" {...register("surName")} />
            {errors.surName && (
              <p className="text-xs text-destructive">
                {errors.surName.message}
              </p>
            )}
          </div>

          <div>
            <Label className="block mb-1">Birth date</Label>
            <DatePickerInput className="w-full" {...register("birthDate")} />
            {errors.birthDate && (
              <p className="text-xs text-destructive">
                {errors.birthDate.message}
              </p>
            )}
          </div>

          <div>
            <Label className="block mb-1">Telegram</Label>
            <Input placeholder="@username" {...register("telegram")} />
            {errors.telegram && (
              <p className="text-xs text-destructive">
                {errors.telegram.message}
              </p>
            )}
          </div>

          <div>
            <Label className="block mb-1">Discord</Label>
            <Input placeholder="user#0000" {...register("discord")} />
            {errors.discord && (
              <p className="text-xs text-destructive">
                {errors.discord.message}
              </p>
            )}
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button className="w-full">Submit</Button>

            <Link href={"/app/profile"}>
              <Button
                variant="outline"
                className="w-full text-muted-foreground"
              >
                Skip
                <ArrowRight className="ml-1" />
              </Button>
            </Link>
          </div>
          {errors.root && (
            <p className="text-xs text-destructive">{errors.root.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
