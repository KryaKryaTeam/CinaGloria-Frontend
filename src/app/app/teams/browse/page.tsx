"use client";
import Team, { TeamStatus } from "@/core/domain/entity/Team";
import { useTeams } from "@/hooks/team/useTeams";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import GridCard from "@/ui/component/gridCards/GridCard";
import InputWithDebounce from "@/ui/component/inputs/InputWithDebounce";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  CalendarIcon,
  CrownIcon,
  SearchIcon,
  User2,
  UsersIcon,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface TeamCardProps {
  team: Team;
  onClick?: (id: string) => void;
}

export const TeamCard = observer(({ team, onClick }: TeamCardProps) => {
  // Функція для визначення кольору статусу
  const getStatusStyles = (status: TeamStatus) => {
    switch (status) {
      case TeamStatus.ACTIVE:
        return "bg-green-500/20 text-green-400 ring-green-500/30";
      case TeamStatus.REGISTRATION:
        return "bg-blue-500/20 text-blue-400 ring-blue-500/30";
      default:
        return "bg-white/10 text-white/50 ring-white/20";
    }
  };

  return (
    <GridCard
      onClick={() => onClick?.(team.id)}
      className="cursor-pointer group bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition-all"
    >
      <div className="flex flex-col h-full">
        {/* Banner Area */}
        <div className="relative h-24 w-full overflow-hidden rounded-lg bg-slate-100">
          {team.bannerUrl ? (
            <Image
              src={team.bannerUrl}
              alt="Team Banner"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
          )}

          {/* Status Badge */}
          <div
            className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm ${getStatusStyles(team.status)}`}
          >
            {team.status}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative px-3 pt-10 pb-3">
          {/* Avatar - Positioned over the banner line */}
          <div className="absolute -top-8 left-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl border-4 border-white bg-slate-50 shadow-md">
              {team.avatarUrl ? (
                <Image
                  src={team.avatarUrl}
                  alt={team.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-300">
                  <UsersIcon size={24} />
                </div>
              )}
            </div>
          </div>

          {/* Text Info */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-bold text-slate-800 truncate leading-tight">
                {team.name || "Unnamed Team"}
              </h3>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <UsersIcon size={14} className="opacity-70" />
                  <span className="text-sm font-semibold">
                    {team.members.length}
                  </span>
                </div>

                {team.registrationTimeout && (
                  <div className="flex items-center gap-1.5 text-orange-600">
                    <CalendarIcon size={14} />
                    <span className="text-[11px] font-bold">Timer Active</span>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
                ID: {team.id.slice(0, 6)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridCard>
  );
});

function Page() {
  const { teams, form, utils } = useTeams();
  const router = useRouter();
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 bg-white/20 ">
          <User2 className="h-5 w-5 text-white/70" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Browse teams{" "}
          </h1>
          <p className="text-sm text-white/40">Search for your teams</p>
        </div>
      </div>

      <GridCard name="Filters">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-end">
            <div className="flex-1 space-y-1.5">
              <Label>Search by name</Label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <InputWithDebounce
                      debounceCallback={field.onChange}
                      value={field.value ?? ""}
                      placeholder="Team name..."
                      className="pl-9"
                    />
                  )}
                ></Controller>
              </div>
            </div>

            <div className="w-64 space-y-1.5">
              <Label>Status</Label>
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All statuses</SelectItem>
                      {Object.values(TeamStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0) + status.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              ></Controller>
            </div>
          </div>

          {/* Рядок 2: Кількість учасників та Булеві фільтри */}
          <div className="flex flex-row gap-6 items-end border-t pt-4 border-black/5">
            <div className="flex flex-row gap-2 items-center">
              <div className="space-y-1.5">
                <Label className="text-xs text-black/50">Min members</Label>
                <Controller
                  name="minMembers"
                  control={form.control}
                  render={({ field }) => (
                    <InputWithDebounce
                      debounceCallback={field.onChange}
                      value={field.value ?? 1}
                      type="number"
                      min={1}
                      className="w-24"
                      placeholder="1"
                    />
                  )}
                ></Controller>
              </div>
              <span className="mt-6 text-black/30">—</span>
              <div className="space-y-1.5">
                <Label className="text-xs text-black/50">Max members</Label>
                <Controller
                  name="maxMembers"
                  control={form.control}
                  render={({ field }) => (
                    <InputWithDebounce
                      debounceCallback={field.onChange}
                      value={field.value ?? 10}
                      type="number"
                      min={1}
                      className="w-24"
                      placeholder="any"
                    />
                  )}
                ></Controller>
              </div>
            </div>

            {/* Перемикачі (Логічні фільтри) */}
            <div className="flex flex-row gap-6 h-10 items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <Controller
                  name="isCaptain"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      id="isCaptain"
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  )}
                ></Controller>

                <span className="text-sm font-medium group-hover:text-black/70 transition-colors">
                  I am Captain
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <Controller
                  name="hasInvites"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      id="hasInvites"
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  )}
                ></Controller>
                <span className="text-sm font-medium group-hover:text-black/70 transition-colors">
                  Pending invites
                </span>
              </label>
            </div>

            {/* Кнопка скидання (опціонально) */}
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="sm"
                className="text-black/40"
                onClick={utils.resetFilters}
              >
                Reset filters
              </Button>
            </div>
          </div>
        </div>
      </GridCard>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teams.map((team) => (
          <TeamCard
            team={team}
            key={team.id}
            onClick={() => {
              router.push("/app/teams/browse/" + team.id);
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default observer(Page);
