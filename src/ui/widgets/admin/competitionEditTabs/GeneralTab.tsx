"use client";

import { IconsLucide } from "@/core/domain/entity/type";
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
import { Field, FieldDescription, FieldLabel } from "@/ui/field";
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
import { PlusIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
import { useMemo, useState } from "react";

function CompetitionEditGeneralTab() {
  const { general, competition } = useChangeCompetitionForm();

  const defaultMinDate = useMemo(
    // eslint-disable-next-line react-hooks/purity
    () => new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 16),
    [],
  );

  const [dates, setDates] = useState({
    regStart: defaultMinDate,
    regEnd: "",
    battleStart: "",
    battleEnd: "",
  });

  const updateDate = (key: keyof typeof dates, value: string) => {
    setDates((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <TabsContent value="general" className="space-y-6">
      <form
        onSubmit={general.formGeneralData.submit}
        id="main-competition-form"
        className="space-y-6"
      >
        <GridCard name="Text info">
          <section className="space-y-4">
            <Field>
              <FieldLabel htmlFor="comp-name">Name of competition</FieldLabel>
              <Input
                id="comp-name"
                placeholder="Summer cup"
                {...general.formGeneralData.register("name")}
              />
              <ErrorBlank error={general.formGeneralData.errors.name} />
            </Field>
            <Field>
              <FieldLabel htmlFor="comp-desc">
                Description of competition
              </FieldLabel>
              <Textarea
                id="comp-desc"
                placeholder="Describe your event..."
                className="max-h-32"
                {...general.formGeneralData.register("desc")}
              />
              <ErrorBlank error={general.formGeneralData.errors.desc} />
            </Field>
          </section>
        </GridCard>

        <GridCard name="Images">
          <section className="space-y-6">
            {/* Avatar */}
            <Field>
              <FieldLabel htmlFor="img-avatar">Avatar</FieldLabel>
              <FieldDescription>
                Primary square icon. Appears in search results and lists.
                Recommended:{" "}
                <span className="font-bold text-black/80">256x256px</span>. Max:{" "}
                <span className="font-bold text-black/80">2MB</span>.
              </FieldDescription>
              <DragAndDropInput
                id="img-avatar"
                className="h-40"
                accept=".png, .jpg, .jpeg, .webp"
                showSelected={true}
                {...general.formGeneralData.register("avatar")}
              />
              <ErrorBlank error={general.formGeneralData.errors.avatar} />
            </Field>

            {/* Banner */}
            <Field>
              <FieldLabel htmlFor="img-banner">Banner</FieldLabel>
              <FieldDescription>
                Main header image for the competition page. Recommended:
                <span className="font-bold text-black/80">500x300px</span>. Max:{" "}
                <span className="font-bold text-black/80">5MB</span>.
              </FieldDescription>
              <DragAndDropInput
                id="img-banner"
                className="h-48"
                accept=".png, .jpg, .jpeg, .webp"
                showSelected={true}
                {...general.formGeneralData.register("banner")}
              />
              <ErrorBlank error={general.formGeneralData.errors.banner} />
            </Field>

            {/* Ultra Wide */}
            <Field>
              <FieldLabel htmlFor="img-wide">Ultra wide banner</FieldLabel>
              <FieldDescription>
                Panoramic background for 21:9 displays. Prevents cropping.
                Recommended:{" "}
                <span className="font-bold text-black/80">2560x1080px</span>.
                Max: <span className="font-bold text-black/80">10MB</span>.
              </FieldDescription>
              <DragAndDropInput
                id="img-wide"
                className="h-48"
                accept=".png, .jpg, .jpeg, .webp"
                showSelected={true}
                {...general.formGeneralData.register("ultraWideBanner")}
              />
              <ErrorBlank
                error={general.formGeneralData.errors.ultraWideBanner}
              />
            </Field>

            {/* Social */}
            <Field>
              <FieldLabel htmlFor="img-social">Link Preview</FieldLabel>
              <FieldDescription>
                Preview image for sharing on Telegram, Discord, or X.
                Recommended:
                <span className="font-bold text-black/80">1200x630px</span>.
                Max: <span className="font-bold text-black/80">5MB</span>.
              </FieldDescription>
              <DragAndDropInput
                id="img-social"
                className="h-48"
                accept=".png, .jpg, .jpeg, .webp"
                showSelected={true}
                {...general.formGeneralData.register("socialMedia")}
              />
              <ErrorBlank error={general.formGeneralData.errors.socialMedia} />
            </Field>
          </section>
        </GridCard>

        <GridCard name="Dates">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="reg-start">Start of registration</FieldLabel>
              <Input
                id="reg-start"
                type="datetime-local"
                min={defaultMinDate}
                {...general.formGeneralData.register("registrationStart", {
                  valueAsDate: true,
                  onChange: (ev) => {
                    updateDate("regStart", ev);
                  },
                })}
              />{" "}
              <ErrorBlank
                error={general.formGeneralData.errors.registrationStart}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="reg-end">End of registration</FieldLabel>
              <Input
                id="reg-end"
                type="datetime-local"
                min={dates.regStart}
                {...general.formGeneralData.register("registrationEnd", {
                  valueAsDate: true,
                  onChange: (ev) => {
                    updateDate("regEnd", ev);
                  },
                })}
              />{" "}
              <ErrorBlank
                error={general.formGeneralData.errors.registrationEnd}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="battle-start">Start of battle</FieldLabel>
              <Input
                id="battle-start"
                type="datetime-local"
                min={dates.regEnd || defaultMinDate}
                {...general.formGeneralData.register("battleStart", {
                  valueAsDate: true,
                  onChange: (ev) => {
                    updateDate("battleStart", ev);
                  },
                })}
              />
              <ErrorBlank error={general.formGeneralData.errors.battleStart} />
            </Field>
            <Field>
              <FieldLabel htmlFor="battle-end">End of battle</FieldLabel>
              <Input
                id="battle-end"
                type="datetime-local"
                min={dates.battleStart || defaultMinDate}
                {...general.formGeneralData.register("battleEnd", {
                  valueAsDate: true,
                  onChange: (ev) => {
                    updateDate("battleEnd", ev);
                  },
                })}
              />
              <ErrorBlank error={general.formGeneralData.errors.battleEnd} />
            </Field>
          </section>
        </GridCard>
      </form>

      <GridCard name="Rules">
        <section className="space-y-2">
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <Button type="button">
                  <PlusIcon />
                  Add rule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form
                  className="space-y-6"
                  onSubmit={general.formCreateRule.submit}
                >
                  <DialogHeader>
                    <DialogTitle>Add new rule</DialogTitle>
                    <DialogDescription>
                      Specify a clear rule for the participants. This will be
                      visible on the public page.
                    </DialogDescription>
                  </DialogHeader>
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      placeholder="Be happy!"
                      {...general.formCreateRule.register("name")}
                    ></Input>
                    <ErrorBlank error={general.formCreateRule.errors.name} />
                  </Field>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      {...general.formCreateRule.register("desc")}
                      placeholder="To be happy you can eat some sweets..."
                      className="max-h-32"
                    ></Textarea>
                    <ErrorBlank error={general.formCreateRule.errors.desc} />
                  </Field>
                  <Field>
                    <FieldLabel>Icon</FieldLabel>
                    <Controller
                      control={general.formCreateRule.control} // використовуємо контрол з твоєї форми
                      name="icon"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange} // передаємо значення в RHF
                          value={field.value} // пов'язуємо значення зі стейтом RHF
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Icon" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
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
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <DialogFooter>
                    <DialogClose>
                      <Button type="button" variant={"secondary"}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose>
                      <Button type="submit">Create</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col space-y-2">
            {competition && competition.rules.length != 0 ? (
              competition.rules.map((rule, i) => (
                <Item
                  key={rule.name}
                  variant={"outline"}
                  onClick={() => general.utils.deleteRule(i)}
                >
                  <ItemMedia>{IconsLucide[rule.icon]}</ItemMedia>
                  <ItemContent>
                    <ItemTitle>{rule.name}</ItemTitle>
                    <ItemDescription>{rule.description}</ItemDescription>
                  </ItemContent>
                </Item>
              ))
            ) : (
              <div className="w-full h-40 flex items-center justify-center text-black/50">
                Opps... Here are no rules
              </div>
            )}
          </div>
        </section>
      </GridCard>
      <GridCard name="Actions">
        <section className="flex flex-wrap gap-4">
          <Button
            type="submit"
            className="ml-auto min-w-30"
            form="main-competition-form"
            disabled={!general.formGeneralData.formState.isValid}
          >
            Save Changes
          </Button>
        </section>
      </GridCard>
    </TabsContent>
  );
}

export default CompetitionEditGeneralTab;
