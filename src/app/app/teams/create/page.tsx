"use client";
import { Button } from "@/ui/button";
import GridCard from "@/ui/component/gridCards/GridCard";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { User2 } from "lucide-react";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
import { useCreateTeamForm } from "@/hooks/team/useCreateTeamForm";
import { ErrorBlank } from "@/ui/component/ErrorBlank";

function Page() {
  const { form } = useCreateTeamForm();
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 bg-white/20 ">
          <User2 className="h-5 w-5 text-white/70" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create team
          </h1>
          <p className="text-sm text-white/40">Create a new team</p>
        </div>
      </div>
      <form className="space-y-6 pb-20" onSubmit={form.submit}>
        {/* Basic Info */}
        <GridCard name="General Information">
          <section className="space-y-4">
            <Field>
              <FieldLabel htmlFor="team-name">Team Name</FieldLabel>
              <Input
                id="team-name"
                placeholder="The Cyber Warriors"
                {...form.register("name")}
              />
              <FieldDescription>
                Choose a unique name that represents your squad.
              </FieldDescription>
              <ErrorBlank error={form.errors.name} />
            </Field>
          </section>
        </GridCard>

        {/* Branding / Images */}
        <GridCard name="Branding">
          <section className="space-y-6">
            {/* Avatar */}
            <Field>
              <FieldLabel htmlFor="team-avatar">Team Avatar</FieldLabel>
              <FieldDescription>
                Square logo or mascot. Recommended:{" "}
                <span className="font-bold text-black/80">256x256px</span>. Max:{" "}
                <span className="font-bold text-black/80">2MB</span>.
              </FieldDescription>
              <DragAndDropInput
                id="team-avatar"
                className="h-40"
                accept=".png, .jpg, .jpeg, .webp"
                showSelected={true}
                {...form.register("avatar")}
              />
              <ErrorBlank error={form.errors.avatar} />
            </Field>

            {/* Banner */}
            <Field>
              <FieldLabel htmlFor="team-banner">Team Banner</FieldLabel>
              <FieldDescription>
                Horizontal background for your team profile. Recommended:
                <span className="font-bold text-black/80">800x400px</span>. Max:{" "}
                <span className="font-bold text-black/80">5MB</span>.
              </FieldDescription>
              <DragAndDropInput
                id="team-banner"
                className="h-48"
                accept=".png, .jpg, .jpeg, .webp"
                showSelected={true}
                {...form.register("banner")}
              />
              <ErrorBlank error={form.errors.banner} />
            </Field>
          </section>
        </GridCard>

        {/* Submit Actions */}
        <GridCard>
          <section className="flex flex-wrap gap-4">
            <Button type="submit" className="ml-auto min-w-30">
              Create team
            </Button>
          </section>
        </GridCard>
      </form>
    </section>
  );
}

export default Page;
