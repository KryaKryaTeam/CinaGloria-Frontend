"use client";

import { ArrowRight, PencilIcon } from "lucide-react";
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
import { DatePickerInput } from "../../datePicker";
import Link from "next/link";
import useAdditionalDataForm from "@/hooks/form/useAdditionalDataForm";
import GridCard from "@/ui/component/gridCards/GridCard";
import { PropsWithChildren } from "react";

function Form({ children }: PropsWithChildren) {
  const { register, errors, submit } = useAdditionalDataForm();
  return (
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
          <p className="text-xs text-destructive">{errors.surName.message}</p>
        )}
      </div>

      <div>
        <Label className="block mb-1">Birth date</Label>
        <DatePickerInput className="w-full" {...register("birthDay")} />
        {errors.birthDay && (
          <p className="text-xs text-destructive">{errors.birthDay.message}</p>
        )}
      </div>

      <div>
        <Label className="block mb-1">Telegram</Label>
        <Input placeholder="@username" {...register("telegram")} />
        {errors.telegram && (
          <p className="text-xs text-destructive">{errors.telegram.message}</p>
        )}
      </div>

      <div>
        <Label className="block mb-1">Discord</Label>
        <Input placeholder="user#0000" {...register("discord")} />
        {errors.discord && (
          <p className="text-xs text-destructive">{errors.discord.message}</p>
        )}
      </div>

      {children}
      {errors.root && (
        <p className="text-xs text-destructive">{errors.root.message}</p>
      )}
    </form>
  );
}
function SecondDataForm() {
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
        <Form>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button className="w-full">Submit</Button>

            <Link href={"/app/profile/information"}>
              <Button
                variant="outline"
                className="w-full text-muted-foreground"
              >
                Skip
                <ArrowRight className="ml-1" />
              </Button>
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

function SecoundDataFormGrid() {
  return (
    <GridCard className="max-w-200 w-1/2 min-w-100">
      <article className="flex flex-col gap-4 w-full h-full">
        <div className="w-full items-center justify-between flex">
          <span className="flex items-center gap-2 w-max">
            <PencilIcon />
            <h1 className="text-xl font-semibold">Change addtional data</h1>
          </span>
        </div>
        <Form>
          <Button>Update</Button>
        </Form>
      </article>
    </GridCard>
  );
}

export default { grid: SecoundDataFormGrid, auth: SecondDataForm };
