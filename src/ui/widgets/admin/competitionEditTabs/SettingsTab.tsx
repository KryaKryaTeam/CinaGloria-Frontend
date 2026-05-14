"use client";

import { observer } from "mobx-react-lite";
import GridCard from "@/ui/component/gridCards/GridCard";
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Switch } from "@/ui/switch";
import { TabsContent } from "@/ui/tabs";
import { UsersIcon, TrophyIcon, LayersIcon, UserPlusIcon } from "lucide-react";
import { Button } from "@/ui/button";

export const CompetitionEditSettingsTab = observer(() => {
  return (
    <TabsContent value="settings" className="space-y-6 outline-none">
      {/* ── Round Management ── */}
      <GridCard name="Round Behavior">
        <div className="space-y-6">
          <Field className="flex flex-row items-center justify-between rounded-lg border border-slate-100 p-4 bg-slate-50/30">
            <div className="space-y-0.5">
              <FieldLabel className="text-slate-900">
                Show rounds one by one
              </FieldLabel>
              <FieldDescription className="text-slate-500 max-w-100">
                If enabled, participants will only see the current active round.
                Next rounds will remain hidden until the previous one ends.
              </FieldDescription>
            </div>
            <Switch defaultChecked={false} />
          </Field>
        </div>
      </GridCard>

      <GridCard name="Team & Participation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Field>
              <div className="flex items-center gap-2 mb-2">
                <UsersIcon className="h-4 w-4 text-slate-400" />
                <FieldLabel className="text-slate-700">Max Teams</FieldLabel>
              </div>
              <Input
                type="number"
                defaultValue={100}
                min={1}
                placeholder="e.g. 100"
                className="border-slate-200 focus:ring-slate-200"
              />
              <FieldDescription>
                Total number of teams allowed to register.
              </FieldDescription>
            </Field>

            <Field>
              <div className="flex items-center gap-2 mb-2">
                <TrophyIcon className="h-4 w-4 text-slate-400" />
                <FieldLabel className="text-slate-700">
                  Count of Winners
                </FieldLabel>
              </div>
              <Input
                type="number"
                defaultValue={1}
                min={1}
                className="border-slate-200"
              />
              <FieldDescription>
                How many teams will be displayed as winners on the leaderboard.
              </FieldDescription>
            </Field>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <UserPlusIcon className="h-3 w-3" /> Team Size Limits
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel className="text-xs text-slate-500">
                    Min Members
                  </FieldLabel>
                  <Input
                    type="number"
                    defaultValue={1}
                    min={1}
                    className="bg-white border-slate-200"
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-xs text-slate-500">
                    Max Members
                  </FieldLabel>
                  <Input
                    type="number"
                    defaultValue={10}
                    min={1}
                    className="bg-white border-slate-200"
                  />
                </Field>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                * These limits will be enforced during the registration process.
              </p>
            </div>
          </div>
        </div>
      </GridCard>

      <GridCard className="flex justify-center items-end pt-4">
        <Button variant="default" className="mt-2">
          Update Settings
        </Button>
      </GridCard>
    </TabsContent>
  );
});
