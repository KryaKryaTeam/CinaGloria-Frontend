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

const TeamTabDetails = observer(() => {
  const { team } = useTeamPage();

  if (!team) return null;

  return (
    <TabsContent
      value="details"
      className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <GridCard className="p-0 overflow-hidden border-slate-200 bg-white">
            <div className="relative h-110 w-full mt-6">
              {team.bannerUrl ? (
                <Image
                  src={team.bannerUrl}
                  alt="Team Banner"
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
              )}
            </div>

            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-6 relative z-10">
                <div className="h-24 w-24 rounded-2xl border-4 border-white bg-slate-50 shadow-lg overflow-hidden shrink-0">
                  {team.avatarUrl ? (
                    <Image
                      src={team.avatarUrl}
                      alt={team.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                      <Users size={40} />
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="mt-6 text-2xl font-bold text-slate-900 leading-tight">
                    {team.name}
                  </h2>
                  <p className="text-sm text-slate-500 font-medium">
                    Status: <span className="text-blue-600">{team.status}</span>
                  </p>
                </div>
              </div>
            </div>
          </GridCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <GridCard className="border-slate-200 bg-white" name="Info">
            <div className="space-y-">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                    <Users size={18} />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">
                    Members
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-900">
                  {team.members.length}
                </span>
              </div>

              <div className="flex flex-col items-start gap-4 justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg">
                    <Crown size={18} />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">
                    Captain
                  </span>
                </div>
                <UserProfileCard id={team.captainId} />
              </div>
            </div>
          </GridCard>

          <GridCard name="Members">
            <div className="space-y-6">
              {team.members.map((member) => (
                <UserProfileCard id={member} key={member} />
              ))}
            </div>
          </GridCard>

          {team.registrationTimeout && (
            <div className="p-4 rounded-2xl bg-slate-900 flex items-center gap-4 text-white">
              <CalendarDays className="text-orange-400" size={20} />
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase">
                  Reg. Deadline
                </p>
                <p className="text-xs font-bold">
                  {new Date(team.registrationTimeout).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
});

export default TeamTabDetails;
