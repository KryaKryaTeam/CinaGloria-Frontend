'use client';
import {
  CompetitionPublicObject,
  CompetitionStatus,
} from "@/core/domain/entity/Competion";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { CalendarDays, Clock, Delete, Trophy } from "lucide-react";
import GoToCompetitionEditAdmin from "./GoToCompetitionEditAdmin";
import Image from "next/image";
import DeleteCompetitionButton from "./deleteCompetitionButton";

const STATUS_CONFIG: Record<
  CompetitionStatus,
  { label: string; className: string }
> = {
  [CompetitionStatus.DRAFT]: {
    label: "Draft",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
  [CompetitionStatus.SCHEDULED]: {
    label: "Scheduled",
    className:
      "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
  },
  [CompetitionStatus.PUBLISHED]: {
    label: "Published",
    className:
      "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",
  },
  [CompetitionStatus.REGISTRATION]: {
    label: "Registration open",
    className:
      "bg-teal-100 text-teal-700 hover:bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400",
  },
  [CompetitionStatus.WAITING_FOR_START]: {
    label: "Starting soon",
    className:
      "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
  },
  [CompetitionStatus.STARTED]: {
    label: "Live",
    className:
      "bg-violet-100 text-violet-700 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400",
  },
  [CompetitionStatus.SCORING]: {
    label: "Scoring",
    className:
      "bg-pink-100 text-pink-700 hover:bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400",
  },
  [CompetitionStatus.ARCHIVED]: {
    label: "Archived",
    className: "bg-muted text-muted-foreground hover:bg-muted",
  },
  [CompetitionStatus.CANCELED]: {
    label: "Canceled",
    className:
      "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  },
};

const fmt = (d: Date): string => format(d, "d MMM yyyy", { locale: enGB });

interface CompetitionCardProps {
  competition: CompetitionPublicObject;
}

export function CompetitionAdminCard({ competition }: CompetitionCardProps) {
  const {
    id,
    name,
    avatar,
    banner,
    dateOfStart,
    dateOfEnd,
    dateOfStartRegistration,
    dateOfEndRegistration,
    status,
  } = competition;
  const statusCfg = STATUS_CONFIG[status];

  const isCanceled = status === CompetitionStatus.CANCELED;
  const isArchived = status === CompetitionStatus.ARCHIVED;
  const showCTA = !isCanceled && !isArchived;

  const startDate =
    dateOfStart instanceof Date ? dateOfStart : new Date(dateOfStart);
  const endDate = dateOfEnd instanceof Date ? dateOfEnd : new Date(dateOfEnd);
  const regStartDate =
    dateOfStartRegistration instanceof Date
      ? dateOfStartRegistration
      : new Date(dateOfStartRegistration);
  const regEndDate =
    dateOfEndRegistration instanceof Date
      ? dateOfEndRegistration
      : new Date(dateOfEndRegistration);

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow-sm">
      {/* Banner */}
      <div className="relative h-36 bg-muted">
        <Image
          src={banner.toString()}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          width={500}
          height={300}
        />
        <div className="absolute top-3 right-3">
          <Badge className={statusCfg.className}>{statusCfg.label}</Badge>
        </div>

        <div className="absolute -bottom-6 left-4">
          <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-muted shadow-sm">
            <Image
              src={avatar.toString()}
              alt={name}
              className="w-full h-full object-cover z-20"
              loading="eager"
              width={128}
              height={128}
              unoptimized
            />
          </div>
        </div>
      </div>

      <CardContent className="pt-9 pb-3 px-4 space-y-2">
        <div className="flex items-start gap-2">
          <Trophy className="mt-0.5 text-muted-foreground shrink-0" size={15} />
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">
            {name}
          </h3>
        </div>

        <Separator className="my-2" />

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays size={13} className="shrink-0" />
            <span className="font-medium text-foreground">Competition</span>
            <span className="ml-auto tabular-nums">
              {fmt(startDate)} — {fmt(endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={13} className="shrink-0" />
            <span className="font-medium text-foreground">Registration</span>
            <span className="ml-auto tabular-nums">
              {fmt(regStartDate)} — {fmt(regEndDate)}
            </span>
          </div>
        </div>
      </CardContent>

      {showCTA && (
        <CardFooter className="px-4 pt-0 flex flex-col gap-2">
          <GoToCompetitionEditAdmin id={id} />
          <DeleteCompetitionButton id={id} />
        </CardFooter>
      )}
    </Card>
  );
}
