"use client";
import GridCard from "@/ui/component/gridCards/GridCard";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "@/ui/field";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { PaletteIcon, PlusIcon, TextInitialIcon } from "lucide-react";

import { useMemo, useState } from "react";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { IconsLucide } from "@/core/domain/entity/type";
import { useChangeCompetitionForm } from "@/hooks/admin/useChangeCompetitionForm.hook";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/ui/item";
import {
  Controller,
  FieldError as ferhf,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import CompetitionEditGeneralTab from "@/ui/widgets/admin/competitionEditTabs/GeneralTab";
import { CompetitionEditDetailsTab } from "@/ui/widgets/admin/competitionEditTabs/DetailsTab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CompetitionEditSettingsTab } from "@/ui/widgets/admin/competitionEditTabs/SettingsTab";
import { CompetitionEditPublishingTab } from "@/ui/widgets/admin/competitionEditTabs/PublishingTab";
import { CompetitionEditRoundsTab } from "@/ui/widgets/admin/competitionEditTabs/RoundsTab";

function Page() {
  const comp = useChangeCompetitionForm();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 bg-white/20 ">
          <PaletteIcon className="h-5 w-5 text-white/70" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Competition edit
          </h1>
          <p className="text-sm text-white/40">Edit competition</p>
        </div>
      </div>
      <DraftPage />
    </section>
  );
}

const DraftPage = observer(() => {
  const router = useRouter();
  return (
    <section className="space-y-10 pb-20">
      <Tabs defaultValue="details">
        <TabsList>
          <Button
            size={"sm"}
            className="mr-2"
            variant={"secondary"}
            onClick={() => {
              router.back();
            }}
          >
            Go back
          </Button>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rounds">Rounds and Tasks</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="publishing">Publishing</TabsTrigger>
        </TabsList>
        <CompetitionEditDetailsTab />
        <CompetitionEditGeneralTab />
        <CompetitionEditRoundsTab />
        <CompetitionEditSettingsTab />
        <CompetitionEditPublishingTab />
      </Tabs>
    </section>
  );
});

export default Page;
