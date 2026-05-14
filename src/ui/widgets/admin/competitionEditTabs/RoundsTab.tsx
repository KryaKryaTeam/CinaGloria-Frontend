"use client";

import { Icons, IconsLucide } from "@/core/domain/entity/type";
import { useChangeCompetitionForm } from "@/hooks/admin/useChangeCompetitionForm.hook";
import { Button } from "@/ui/button";
import { ErrorBlank } from "@/ui/component/ErrorBlank";
import GridCard from "@/ui/component/gridCards/GridCard";
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
  Field,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
} from "@/ui/field";
import { Input } from "@/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { TabsContent } from "@/ui/tabs";
import { Textarea } from "@/ui/textarea";
import { PlusIcon, Trash2 } from "lucide-react";
import { Controller } from "react-hook-form";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
import { useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";

const toDatetimeLocal = (date?: Date | string) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
};

export const CompetitionEditRoundsTab = observer(() => {
  const { competition, rounds } = useChangeCompetitionForm();

  // Ліміти для інпутів на основі дат змагання
  const minLimit = useMemo(
    () => toDatetimeLocal(competition?.dateOfStart),
    [competition?.dateOfStart],
  );
  const maxLimit = useMemo(
    () => toDatetimeLocal(competition?.dateOfEnd),
    [competition?.dateOfEnd],
  );

  return (
    <TabsContent value="rounds">
      <GridCard name="Rounds">
        <section className="space-y-4">
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger disabled={!competition?.isDatesFilled}>
                <Button type="button" disabled={!competition?.isDatesFilled}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add round
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form className="space-y-6" onSubmit={rounds.formRound.submit}>
                  <DialogHeader>
                    <DialogTitle>Add new round</DialogTitle>
                    <DialogDescription>
                      Set up the timeframe and details for this stage.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input
                        placeholder="Round name"
                        {...rounds.formRound.register("name")}
                      />
                      <ErrorBlank error={rounds.formRound.errors.name} />
                    </Field>

                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        placeholder="What is this round about?"
                        className="max-h-32"
                        {...rounds.formRound.register("desc")}
                      />
                      <ErrorBlank error={rounds.formRound.errors.desc} />
                    </Field>

                    <Field>
                      <FieldLabel>Icon</FieldLabel>
                      <Controller
                        control={rounds.formRound.control}
                        name="icon"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select icon" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(IconsLucide).map(
                                ([key, icon]) => (
                                  <SelectItem value={key} key={key}>
                                    <div className="flex items-center gap-2">
                                      {icon}
                                      <span>{key.toLowerCase()}</span>
                                    </div>
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>
                  </div>

                  <FieldSeparator className="my-2" />

                  <div className="grid grid-cols-1 gap-4">
                    <Field>
                      <FieldLabel>Start of round</FieldLabel>
                      <Input
                        type="datetime-local"
                        min={minLimit}
                        max={maxLimit}
                        {...rounds.formRound.register("roundStart", {
                          valueAsDate: true,
                        })}
                      />
                      <ErrorBlank error={rounds.formRound.errors.roundStart} />
                    </Field>

                    <Field>
                      <FieldLabel>Deadline (Submission Lock)</FieldLabel>
                      <Input
                        type="datetime-local"
                        min={minLimit}
                        max={maxLimit}
                        {...rounds.formRound.register("deadline", {
                          valueAsDate: true,
                        })}
                      />
                      <ErrorBlank error={rounds.formRound.errors.deadline} />
                    </Field>

                    <Field>
                      <FieldLabel>End of round</FieldLabel>
                      <Input
                        type="datetime-local"
                        min={minLimit}
                        max={maxLimit}
                        {...rounds.formRound.register("roundEnd", {
                          valueAsDate: true,
                        })}
                      />
                      <ErrorBlank error={rounds.formRound.errors.roundEnd} />
                    </Field>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    {/* Прибираємо DialogClose з кнопки submit, щоб валідація могла зупинити закриття */}
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Відображення списку раундів */}
          <div className="flex flex-col space-y-2">
            {competition?.rounds.length ? (
              competition.rounds.map((round, index) => (
                <Card key={round.id || index} className="bg-slate-50/50">
                  <CardHeader>
                    <CardTitle className="flex flex-row items-center gap-2">
                      {IconsLucide[round.icon as Icons]} {round.name}
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
                        className="relative"
                        onClick={() =>
                          rounds.utils.deleteTask(round.id, item.id)
                        }
                      >
                        <ItemContent className="px-8">
                          <div
                            className="absolute h-full rounded-s-md w-4 top-0 left-0"
                            style={{ backgroundColor: item.hexColor }}
                          ></div>
                          <ItemTitle className="pr-4">{item.name}</ItemTitle>
                          <ItemDescription className="pr-4">
                            {item.description}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    ))}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="w-full h-24 border-2 border-foreground border-dashed bg-accent text-foreground"
                        >
                          Add new task
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <form
                          className="space-y-6"
                          onSubmit={rounds.formTask.submit(round.id)}
                        >
                          <DialogHeader>
                            <DialogTitle>Add new task</DialogTitle>
                            <DialogDescription>
                              Describe task for a round.
                            </DialogDescription>
                          </DialogHeader>

                          <Field>
                            <FieldLabel>Task Name</FieldLabel>
                            <Input
                              placeholder="e.g. Reverse Engineering Part 1"
                              {...rounds.formTask.register("name")}
                            />
                            <ErrorBlank error={rounds.formTask.errors.name} />
                          </Field>

                          <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                              placeholder="Describe what needs to be done..."
                              className="max-h-32"
                              {...rounds.formTask.register("desc")}
                            />
                            <ErrorBlank error={rounds.formTask.errors.desc} />
                          </Field>

                          <Field>
                            <FieldLabel>Task Color (Brand)</FieldLabel>
                            <div className="flex gap-3">
                              {/* Візуальний пікер */}
                              <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                                <input
                                  type="color"
                                  className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                                  value={rounds.formTask.watch("color")}
                                  onChange={(e) =>
                                    rounds.formTask.setValue(
                                      "color",
                                      e.target.value.toUpperCase(),
                                    )
                                  }
                                />
                              </div>

                              {/* Текстове поле для HEX */}
                              <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                                  Hex
                                </span>
                                <Input
                                  className="pl-7 font-mono uppercase focus:ring-slate-200"
                                  placeholder="4F46E5"
                                  {...rounds.formTask.register("color")}
                                  onChange={(e) => {
                                    let val = e.target.value.replace(
                                      /[^#0-9A-Fa-f]/g,
                                      "",
                                    );
                                    if (!val.startsWith("#") && val.length > 0)
                                      val = "#" + val;
                                    rounds.formTask.setValue(
                                      "color",
                                      val.toUpperCase(),
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            <ErrorBlank
                              error={rounds.formTask.formState.errors.color}
                            />
                          </Field>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button type="submit">Create</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() => rounds.utils.deleteRound(round.id)}
                    >
                      <Trash2 /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-xl text-slate-400">
                <p>No rounds added yet.</p>
                <p className="text-xs">
                  Rounds will appear here after creation.
                </p>
              </div>
            )}
          </div>
        </section>
      </GridCard>
    </TabsContent>
  );
});
