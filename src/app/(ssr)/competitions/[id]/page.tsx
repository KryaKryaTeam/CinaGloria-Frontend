import GetCompetionByIdRequest from "@/core/requests/network/Competion/GetCompetionById.request";
import {
  CalendarDays,
  CalendarCheck2,
  CalendarX2,
  CalendarClock,
  ArrowRight,
  Trophy,
  UserRoundPlus,
  Clock3,
  Ban,
  CircleDot,
  FilePen,
  CalendarRange,
  Hourglass,
  ChartNoAxesColumnIncreasing,
  Archive,
  Shield,
  StarIcon,
} from "lucide-react";
import { format, intervalToDuration, formatDuration } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Separator } from "@/ui/separator";
import { CompetitionStatus } from "@/core/domain/entity/Competion";
import RegistrationButton from "@/ui/widgets/competition/RegistrationButton";
import ModalGoToAuth from "@/ui/widgets/competition/modalGoToAuth";
import Image from "next/image";
import container, { TYPES } from "@/core/Container";
import { Icons, IconsLucide } from "@/core/domain/entity/type";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/ui/item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

// const MockData: CompetitionPublicObject = {
//   id: "1",
//   name: "Summer Code Challenge 2025",
//   banner: new URL(
//     "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
//   ),
//   dateOfStart: new Date("2025-07-01"),
//   dateOfEnd: new Date("2025-07-31"),
//   dateOfStartRegistration: new Date("2025-06-01"),
//   dateOfEndRegistration: new Date("2025-06-20"),
//   status: CompetitionStatus.REGISTRATION,
// };

// ── Status metadata ──────────────────────────────────────────────────────────

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

const statusConfig: Record<
  CompetitionStatus,
  { label: string; variant: BadgeVariant; icon: React.ReactNode }
> = {
  [CompetitionStatus.DRAFT]: {
    label: "Draft",
    variant: "secondary",
    icon: <FilePen className="h-3 w-3" />,
  },
  [CompetitionStatus.SCHEDULED]: {
    label: "Scheduled",
    variant: "secondary",
    icon: <CalendarClock className="h-3 w-3" />,
  },
  [CompetitionStatus.PUBLISHED]: {
    label: "Published",
    variant: "default",
    icon: <CircleDot className="h-3 w-3" />,
  },
  [CompetitionStatus.REGISTRATION]: {
    label: "Registration Open",
    variant: "default",
    icon: <UserRoundPlus className="h-3 w-3" />,
  },
  [CompetitionStatus.WAITING_FOR_START]: {
    label: "Starting Soon",
    variant: "secondary",
    icon: <Hourglass className="h-3 w-3" />,
  },
  [CompetitionStatus.STARTED]: {
    label: "In Progress",
    variant: "default",
    icon: <CircleDot className="h-3 w-3" />,
  },
  [CompetitionStatus.SCORING]: {
    label: "Scoring",
    variant: "secondary",
    icon: <ChartNoAxesColumnIncreasing className="h-3 w-3" />,
  },
  [CompetitionStatus.ARCHIVED]: {
    label: "Archived",
    variant: "outline",
    icon: <Archive className="h-3 w-3" />,
  },
  [CompetitionStatus.CANCELED]: {
    label: "Canceled",
    variant: "destructive",
    icon: <Ban className="h-3 w-3" />,
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(date: Date) {
  return format(date, "d MMM yyyy");
}

function duration(start: Date, end: Date) {
  const dur = intervalToDuration({ start, end });
  return formatDuration(dur, { format: ["months", "days"] }) || "—";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-muted/40 px-3 py-2.5 space-y-0.5">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function SidebarSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium flex items-center gap-1.5">
        {icon}
        {title}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function DateRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}

function RuleItem({
  name,
  description,
  icon,
}: {
  name: string;
  description: string;
  icon: Icons;
}) {
  return (
    <Item variant={"outline"}>
      <ItemMedia>{IconsLucide[icon]}</ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </Item>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({
  searchParams,
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ modal?: string }>;
}) {
  const { id } = await params;
  const request = container.get<GetCompetionByIdRequest>(
    TYPES.GetCompetionByIdRequest,
  );
  const data = await request.execute(id);
  // const data = MockData

  const {
    // id,
    name,
    description,
    avatar,
    banner,
    status,
    dateOfStart,
    dateOfEnd,
    dateOfStartRegistration,
    dateOfEndRegistration,
    rules,
    rounds,
  } = data;
  const { modal } = await searchParams;
  const isModalOpen = modal === "true";
  const statusInfo = statusConfig[status];
  const isRegistrationOpen = status === CompetitionStatus.REGISTRATION;

  return (
    <div className="min-h-screen bg-background">
      {isModalOpen && <ModalGoToAuth />}
      {/* ── Banner ── */}
      <div className="relative w-full h-44 sm:h-60 md:h-72 overflow-hidden bg-muted">
        <Image
          width={1280}
          height={720}
          src={banner?.toString() ?? ""}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Avatar — overlaps banner */}
        <div className="-mt-12 sm:-mt-14 mb-3">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background shadow-lg shrink-0 rounded-2xl">
            <AvatarImage src={avatar?.toString() ?? ""} alt={name} />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary rounded-2xl">
              {getInitials(name ?? "Competition")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name + badge + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {name}
            </h1>
            <Badge
              variant={statusInfo.variant}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5"
            >
              {statusInfo.icon}
              {statusInfo.label}
            </Badge>
          </div>

          <RegistrationButton isRegistrationOpen={isRegistrationOpen} id={id} />
        </div>

        <Separator />

        {/* ── Body ── */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left – description + stats */}
          <div className="md:col-span-2 space-y-5">
            <div className="space-y-1">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                About this competition
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {description}
              </p>
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Rules
              </h2>
              <article className="flex flex-col py-2 space-y-2">
                {rules.map((rule) => (
                  <RuleItem
                    key={rule.name}
                    name={rule.name}
                    description={rule.description}
                    icon={rule.icon}
                  ></RuleItem>
                ))}
              </article>
            </div>
            <section className="space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-primary" />
                Rounds
              </h2>
              <div className="flex flex-col space-y-2">
                {rounds && rounds.length ? (
                  rounds.map((round, index) => (
                    <Card key={round.id || index} className="bg-slate-50/50">
                      <CardHeader>
                        <CardTitle className="flex flex-row items-center gap-2">
                          {IconsLucide[round.icon as Icons]}
                          {round.name}
                        </CardTitle>
                        <CardDescription>
                          {new Date(round.startOfRound!).toLocaleDateString()} —{" "}
                          {new Date(round.endOfRound!).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {round.relatedTasks.map((item) => (
                          <Item
                            key={item.id}
                            variant={"outline"}
                            className="relative cursor-default"
                          >
                            <ItemContent className="px-8">
                              <div
                                className="absolute h-full rounded-s-md w-4 top-0 left-0"
                                style={{ backgroundColor: item.hexColor }}
                              ></div>
                              <ItemTitle className="pr-4">
                                {item.name}
                              </ItemTitle>
                              <ItemDescription className="pr-4">
                                {item.description}
                              </ItemDescription>
                            </ItemContent>
                          </Item>
                        ))}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-xl text-slate-400">
                    <p>No rounds avalible yet.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right – dates sidebar */}
          <aside>
            <div className="rounded-xl border bg-card p-4 space-y-4">
              <SidebarSection
                icon={<CalendarRange className="h-4 w-4 text-primary" />}
                title="Competition period"
              >
                <DateRow
                  icon={<CalendarCheck2 className="h-3.5 w-3.5" />}
                  label="Start"
                  value={dateOfStart ? fmt(dateOfStart) : "--"}
                />
                <DateRow
                  icon={<CalendarX2 className="h-3.5 w-3.5" />}
                  label="End"
                  value={dateOfEnd ? fmt(dateOfEnd) : "--"}
                />
                <DateRow
                  icon={<Clock3 className="h-3.5 w-3.5" />}
                  label="Duration"
                  value={
                    dateOfStart && dateOfEnd
                      ? duration(dateOfStart, dateOfEnd)
                      : "--"
                  }
                />
              </SidebarSection>
              <Separator />

              <SidebarSection
                icon={<UserRoundPlus className="h-4 w-4 text-primary" />}
                title="Registration window"
              >
                <DateRow
                  icon={<CalendarCheck2 className="h-3.5 w-3.5" />}
                  label="Opens"
                  value={
                    dateOfStartRegistration
                      ? fmt(dateOfStartRegistration)
                      : "--"
                  }
                />
                <DateRow
                  icon={<CalendarClock className="h-3.5 w-3.5" />}
                  label="Closes"
                  value={
                    dateOfEndRegistration ? fmt(dateOfEndRegistration) : "--"
                  }
                />
              </SidebarSection>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
