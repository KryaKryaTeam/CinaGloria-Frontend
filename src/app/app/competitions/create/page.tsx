"use client";

import { RelationSlots } from "@/core/requests/network/File/FileTypes";
import useCompetition from "@/hooks/useCompetition";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import DatePickerPopover from "@/ui/component/PopoverDate";
import { Form } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Separator } from "@/ui/separator";
import { Textarea } from "@/ui/textarea";
import FileLoadButton from "@/ui/widgets/competition/loadImageButton";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { addDays } from "date-fns";
import { Rule } from "@/core/requests/network/Competion/CreateCompetion.request";
import { useRouter } from "next/navigation";

interface FormProps {
  name: string;
  description: string;
  dateOfEnd: Date;
  dateOfEndRegistration: Date;
  dateOfStart: Date;
  dateOfStartRegistration: Date;
  avatar: string;
  banner: string;
  socialMedia: string;
  rules: Rule[];
  ultraWideBanner: string;
}

export default function Page() {
  const form = useForm<FormProps>({
    defaultValues: {
      name: "",
      description: "",
      dateOfStartRegistration: addDays(new Date(), 1),
      dateOfEndRegistration: addDays(new Date(), 2),
      dateOfStart: addDays(new Date(), 3),
      dateOfEnd: addDays(new Date(), 4),
      avatar: "",
      banner: "",
      rules: [
        {
          name: "Name of rule",
          description: "Description",
          icon: "ERROR",
        },
      ],
      socialMedia: "",
      ultraWideBanner: "",
    },
  });

  const { control, handleSubmit, register } = form;
  const { create } = useCompetition({ forAdmin: false });
  const router = useRouter();
  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const {
      dateOfStartRegistration,
      dateOfEndRegistration,
      dateOfStart,
      dateOfEnd,
    } = data;

    if (dateOfEndRegistration <= dateOfStartRegistration) {
      form.setError("dateOfEndRegistration", {
        message: "Must be after start of registration",
      });
      return;
    }

    if (dateOfStart <= dateOfEndRegistration) {
      form.setError("dateOfStart", {
        message: "Must be after end of registration",
      });
      return;
    }

    if (dateOfEnd <= dateOfStart) {
      form.setError("dateOfEnd", {
        message: "Must be after start",
      });
      return;
    }

    await create(data);
    router.push("/app/competitions/manage");
  };

  return (
    <div className="text-white">
      <Card>
        <CardHeader>
          <CardTitle>Create Competition Form</CardTitle>
          <CardDescription>
            write require data for create, in future you can change it on manage
            page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <Label htmlFor="name">name</Label>
                <Input
                  id="name"
                  placeholder="Summer hackton"
                  {...register("name", { required: "Name is required" })}
                />

                <Label htmlFor="description">description</Label>
                <Textarea id="description" {...register("description")} />
              </div>

              <Separator />

              {/* Dates */}
              <div className="space-y-2">
                <Label>date of end registration:</Label>
                <Controller
                  name="dateOfEndRegistration"
                  control={control}
                  render={({ field }) => (
                    <DatePickerPopover
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.dateOfEndRegistration && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.dateOfEndRegistration.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>date of start:</Label>
                <Controller
                  name="dateOfStart"
                  control={control}
                  render={({ field }) => (
                    <DatePickerPopover
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.dateOfStart && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.dateOfStart.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>date of end:</Label>
                <Controller
                  name="dateOfEnd"
                  control={control}
                  render={({ field }) => (
                    <DatePickerPopover
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {form.formState.errors.dateOfEnd && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.dateOfEnd.message}
                  </p>
                )}
              </div>

              <Separator />

              {/* Media */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>avatar:</Label>
                  <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                      <FileLoadButton
                        relationString={`${RelationSlots.competition.avatar}`}
                        onSuccess={(response) => field.onChange(response.url)}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>banner:</Label>
                  <Controller
                    name="banner"
                    control={control}
                    render={({ field }) => (
                      <FileLoadButton
                        relationString={`${RelationSlots.competition.banner}`}
                        onSuccess={(response) => field.onChange(response.url)}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Social Media:</Label>
                  <Controller
                    name="socialMedia"
                    control={control}
                    render={({ field }) => (
                      <FileLoadButton
                        relationString={`${RelationSlots.competition.socialMedia}`}
                        onSuccess={(response) => field.onChange(response.url)}
                      />
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ultra Wide Banner:</Label>
                  <Controller
                    name="ultraWideBanner"
                    control={control}
                    render={({ field }) => (
                      <FileLoadButton
                        relationString={`${RelationSlots.competition.ultraWideBanner}`}
                        onSuccess={(response) => field.onChange(response.url)}
                      />
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="">
                Create Competition
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
