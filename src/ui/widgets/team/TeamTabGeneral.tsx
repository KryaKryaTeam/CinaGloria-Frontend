"use client";

import { useTeamPage } from "@/hooks/team/useTeamPage";
import { TabsContent } from "@/ui/tabs";
import GridCard from "@/ui/component/gridCards/GridCard";
import {
  Users,
  Trophy,
  Calendar,
  ShieldCheck,
  Hash,
  Clock,
  Info,
  CalendarDays,
  Crown,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import UserProfileCard from "@/ui/component/UserProfileCard";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { ErrorBlank } from "@/ui/component/ErrorBlank";
import { Button } from "@/ui/button";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";

const TeamTabGeneral = observer(() => {
  const { team, changeForm: form } = useTeamPage();

  if (!team) return null;

  return (
    <TabsContent
      value="general"
      className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <form className="space-y-6 pb-20" onSubmit={form.submit}>
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

        <GridCard name="Branding">
          <section className="space-y-6">
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

        <GridCard>
          <section className="flex flex-wrap gap-4">
            <Button type="submit" className="ml-auto min-w-30">
              Update team
            </Button>
          </section>
        </GridCard>
      </form>
    </TabsContent>
  );
});

export default TeamTabGeneral;
