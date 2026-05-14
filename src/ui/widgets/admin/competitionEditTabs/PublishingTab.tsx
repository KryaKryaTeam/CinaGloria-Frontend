"use client";

import { observer } from "mobx-react-lite";
import GridCard from "@/ui/component/gridCards/GridCard";
import { Button } from "@/ui/button";
import { TabsContent } from "@/ui/tabs";
import {
  RocketIcon,
  CalendarClockIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  SendIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/ui/dialog";
import { Field, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { CompetitionStatus } from "@/core/domain/entity/Competion";
import useCompetition from "@/hooks/useCompetition";
import { useChangeCompetitionForm } from "@/hooks/admin/useChangeCompetitionForm.hook";
import { useMemo } from "react";

export const CompetitionEditPublishingTab = observer(() => {
  const { competition } = useChangeCompetitionForm();
  const canPublish =
    competition?.isDatesFilled && competition?.name && competition?.description;
  const defaultMinDate = useMemo(
    () => new Date(Date.now() + 1000 * 60 * 60).toISOString().slice(0, 16),
    [],
  );

  return (
    <TabsContent value="publishing" className="space-y-6 outline-none">
      <GridCard name="Launch Control">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <RocketIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Publish Now</h3>
              <p className="text-sm text-slate-500">
                Instantly make the competition public. Participants will be able
                to see it and start registering if the dates allow.
              </p>
            </div>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={!canPublish}
            >
              <SendIcon className="mr-2 h-4 w-4" /> Go Live
            </Button>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CalendarClockIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Schedule</h3>
              <p className="text-sm text-slate-500">
                Set a specific date and time when the competition will
                automatically change its status to Published.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-slate-200 hover:bg-slate-50"
                  disabled={!canPublish}
                >
                  <CalendarClockIcon className="mr-2 h-4 w-4" /> Pick Date &
                  Time
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule Publication</DialogTitle>
                  <DialogDescription>
                    Select the date and time when the competition should be
                    automatically published.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Field>
                    <FieldLabel>Publication Date</FieldLabel>
                    <Input
                      type="datetime-local"
                      className="mt-2"
                      min={defaultMinDate}
                      max={competition?.dateOfStartRegistration
                        ?.toISOString()
                        .slice(0, 16)}
                    />
                  </Field>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="button"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Confirm Schedule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {!canPublish && (
          <div className="mt-6 p-4 bg-amber-50 rounded-lg flex items-start gap-3 border border-amber-100">
            <AlertCircleIcon className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Publication is disabled:</strong> Some required
              information is missing. Please ensure that the name, description,
              and all competition dates (Registration and Battle) are correctly
              filled in the previous tabs.
            </p>
          </div>
        )}
      </GridCard>
    </TabsContent>
  );
});
