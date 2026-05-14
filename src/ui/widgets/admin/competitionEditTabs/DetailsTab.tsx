"use client";

import { observer } from "mobx-react-lite";
import GridCard from "@/ui/component/gridCards/GridCard";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/ui/item";
import { Icons, IconsLucide } from "@/core/domain/entity/type";
import { Badge } from "@/ui/badge";
import {
  InfoIcon,
  ImageIcon,
  CalendarDays,
  Share2,
  Trophy,
  Shield,
} from "lucide-react";
import { format } from "date-fns";
import { useChangeCompetitionForm } from "@/hooks/admin/useChangeCompetitionForm.hook";
import { TabsContent } from "@/ui/tabs";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

export const CompetitionEditDetailsTab = observer(() => {
  const { competition } = useChangeCompetitionForm();

  const formatDate = (date?: Date) => (date ? format(date, "PPP") : "Not set");

  if (!competition)
    return <p className="text-slate-500 p-8">Data unavailable...</p>;

  return (
    <TabsContent value="details" className="space-y-6 outline-none">
      <div className="relative w-full h-120 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
        {competition.ultraWideBanner ? (
          <Image
            src={competition.ultraWideBanner.toString()}
            className="w-full h-full object-cover"
            alt="Banner preview"
            width={2560}
            height={1080}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex items-end gap-4">
          <div className="h-20 w-20 rounded-lg border-2 border-white bg-slate-50 overflow-hidden shadow-sm">
            {competition.avatar && (
              <Image
                src={competition.avatar.toString()}
                className="h-full w-full object-cover"
                alt="Avatar"
                width={256}
                height={256}
              />
            )}
          </div>
          <div className="mb-1">
            <Badge className="bg-white/90 text-slate-900 hover:bg-white/90 backdrop-blur-sm border-none shadow-sm">
              {competition.status.toLowerCase()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column: Info & Rules ── */}
        <div className="lg:col-span-2 space-y-6">
          <GridCard name="General Information">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {competition.name || "Unnamed Competition"}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                {competition.description || "No description provided."}
              </p>
              <div className="flex items-center gap-4 py-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Trophy className="h-3.5 w-3.5 text-amber-500" />
                  <span>{competition.rules.length} Rules defined</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <InfoIcon className="h-3.5 w-3.5 text-blue-500" />
                  <span>{competition.progressPercentage}% Filled in</span>
                </div>
              </div>
            </div>
          </GridCard>

          <GridCard name="Rules">
            <div className="space-y-2">
              {competition.rules.length > 0 ? (
                competition.rules.map((rule, idx) => (
                  <Item
                    key={idx}
                    variant="outline"
                    className="bg-slate-50/50 border-slate-200"
                  >
                    <ItemMedia className="text-slate-500">
                      {IconsLucide[rule.icon]}
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="text-slate-900 text-sm">
                        {rule.name}
                      </ItemTitle>
                      <ItemDescription className="text-slate-500 text-xs">
                        {rule.description}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl">
                  <Shield className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm italic">
                    No rules defined yet.
                  </p>
                </div>
              )}
            </div>
          </GridCard>

          <GridCard name="Rounds">
            <section className="space-y-4">
              <div className="flex flex-col space-y-2">
                {competition?.rounds.length ? (
                  competition.rounds.map((round, index) => (
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
                    <p>No rounds added yet.</p>
                    <p className="text-xs">
                      Rounds will appear here after they are created.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </GridCard>
        </div>

        {/* ── Right Column: Timeline & Assets ── */}
        <div className="space-y-6">
          <GridCard name="Timeline">
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CalendarDays className="h-3 w-3" /> Registration
                </h4>
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Starts</span>
                    <span className="font-medium text-slate-700">
                      {formatDate(competition.dateOfStartRegistration)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Ends</span>
                    <span className="font-medium text-slate-700">
                      {formatDate(competition.dateOfEndRegistration)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Trophy className="h-3 w-3" /> Competition Period
                </h4>
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Kick-off</span>
                    <span className="font-medium text-slate-700">
                      {formatDate(competition.dateOfStart)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Final</span>
                    <span className="font-medium text-slate-700">
                      {formatDate(competition.dateOfEnd)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GridCard>

          <GridCard name="Sharing Assets">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <Share2 className="h-3 w-3" /> Social Preview
                </span>
                <div className="relative aspect-[1200/630] rounded-lg border border-slate-200 bg-slate-100 overflow-hidden">
                  {competition.socialMedia ? (
                    <Image
                      width={1200}
                      height={360}
                      alt="meow"
                      src={competition.socialMedia.toString()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 italic text-center">
                  Used for Telegram, X, Discord previews
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase text-slate-400 font-bold">
                  Banner
                </span>
                <div className="relative aspect-[21/9] rounded-lg border border-slate-200 bg-slate-100 overflow-hidden">
                  {competition.banner ? (
                    <Image
                      width={1920}
                      height={1080}
                      alt="meow"
                      src={competition.banner.toString()}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GridCard>
        </div>
      </div>
    </TabsContent>
  );
});
