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
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
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
import { FieldError as ferhf, FieldErrorsImpl, Merge } from "react-hook-form";
import { observer } from "mobx-react-lite";

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

function ErrorBlank({
  error,
}: {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  error: ferhf | Merge<ferhf, FieldErrorsImpl<{}>> | undefined;
}) {
  if (error) return <FieldError>{error.message}</FieldError>;
}
const DraftPage = observer(() => {
  const comp = useChangeCompetitionForm();
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
    <form className="space-y-6 pb-20">
      <GridCard name="Text info">
        <section className="space-y-4">
          <Field>
            <FieldLabel htmlFor="comp-name">Name of competition</FieldLabel>
            <Input
              id="comp-name"
              placeholder="Summer cup"
              {...comp.form1.register("name")}
            />
            <ErrorBlank error={comp.form1.errors.name} />
          </Field>
          <Field>
            <FieldLabel htmlFor="comp-desc">
              Description of competition
            </FieldLabel>
            <Textarea
              id="comp-desc"
              placeholder="Describe your event..."
              className="max-h-32"
              {...comp.form1.register("desc")}
            />
            <ErrorBlank error={comp.form1.errors.desc} />
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
              {...comp.form1.register("avatar")}
            />
            <ErrorBlank error={comp.form1.errors.avatar} />
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
              {...comp.form1.register("banner")}
            />
            <ErrorBlank error={comp.form1.errors.banner} />
          </Field>

          {/* Ultra Wide */}
          <Field>
            <FieldLabel htmlFor="img-wide">Ultra wide banner</FieldLabel>
            <FieldDescription>
              Panoramic background for 21:9 displays. Prevents cropping.
              Recommended:{" "}
              <span className="font-bold text-black/80">2560x1080px</span>. Max:{" "}
              <span className="font-bold text-black/80">10MB</span>.
            </FieldDescription>
            <DragAndDropInput
              id="img-wide"
              className="h-48"
              accept=".png, .jpg, .jpeg, .webp"
              showSelected={true}
              {...comp.form1.register("ultraWideBanner")}
            />
            <ErrorBlank error={comp.form1.errors.ultraWideBanner} />
          </Field>

          {/* Social */}
          <Field>
            <FieldLabel htmlFor="img-social">Link Preview</FieldLabel>
            <FieldDescription>
              Preview image for sharing on Telegram, Discord, or X. Recommended:
              <span className="font-bold text-black/80">1200x630px</span>. Max:{" "}
              <span className="font-bold text-black/80">5MB</span>.
            </FieldDescription>
            <DragAndDropInput
              id="img-social"
              className="h-48"
              accept=".png, .jpg, .jpeg, .webp"
              showSelected={true}
              {...comp.form1.register("socialMedia")}
            />
            <ErrorBlank error={comp.form1.errors.socialMedia} />
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
              onChange={(e) => updateDate("regStart", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="reg-end">End of registration</FieldLabel>
            <Input
              id="reg-end"
              type="datetime-local"
              min={dates.regStart}
              onChange={(e) => updateDate("regEnd", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="battle-start">Start of battle</FieldLabel>
            <Input
              id="battle-start"
              type="datetime-local"
              min={dates.regEnd || defaultMinDate}
              onChange={(e) => updateDate("battleStart", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="battle-end">End of battle</FieldLabel>
            <Input
              id="battle-end"
              type="datetime-local"
              min={dates.battleStart || defaultMinDate}
            />
          </Field>
        </section>
      </GridCard>

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
                <form className="space-y-6" onSubmit={comp.form2.submit}>
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
                      {...comp.form2.register("name")}
                    ></Input>
                    <ErrorBlank error={comp.form2.errors.name} />
                  </Field>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      {...comp.form2.register("desc")}
                      placeholder="To be happy you can eat some sweets..."
                      className="max-h-32"
                    ></Textarea>
                    <ErrorBlank error={comp.form2.errors.desc} />
                  </Field>
                  <Field>
                    <FieldLabel>Icon</FieldLabel>
                    <Select {...comp.form2.register("icon")}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(IconsLucide).map((el) => (
                            <SelectItem value={el[0]} key={el[0]}>
                              {el[1]}
                              {el[0].toLocaleLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
            {comp.rules.length != 0 ? (
              <div>
                {comp.rules.map((rule) => (
                  <Item key={rule.name} variant={"outline"}>
                    <ItemMedia>{IconsLucide[rule.icon]}</ItemMedia>
                    <ItemContent>
                      <ItemTitle>{rule.name}</ItemTitle>
                      <ItemDescription>{rule.description}</ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            ) : (
              <div className="w-full h-40 flex items-center justify-center text-black/50">
                Opps... Here are no rules
              </div>
            )}
          </div>
        </section>
      </GridCard>

      <GridCard name="Rounds">
        <section className="space-y-2">
          <div className="flex flex-row space-x-2">
            <Dialog>
              <DialogTrigger>
                <Button type="button">
                  <PlusIcon />
                  Add round
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form className="space-y-6">
                  <DialogHeader>
                    <DialogTitle>Add new round</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <Field>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder="Be happy!"></Input>
                  </Field>
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      placeholder="To be happy you can eat some sweets..."
                      className="max-h-32"
                    ></Textarea>
                  </Field>
                  <Field>
                    <FieldLabel>Icon</FieldLabel>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.entries(IconsLucide).map((el) => (
                            <SelectItem value={el[0]} key={el[0]}>
                              {el[1]}
                              {el[0].toLocaleLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <FieldSeparator className="py-6" />
                  <Field>
                    <FieldLabel>Start of round</FieldLabel>
                    <Input
                      min={dates.battleStart}
                      max={dates.battleEnd}
                      type="datetime-local"
                    ></Input>
                  </Field>
                  <Field>
                    <FieldLabel>Deadline</FieldLabel>
                    <Input
                      min={dates.battleStart}
                      max={dates.battleEnd}
                      type="datetime-local"
                    ></Input>
                  </Field>
                  <Field>
                    <FieldLabel>End of round</FieldLabel>
                    <Input
                      min={dates.battleStart}
                      max={dates.battleEnd}
                      type="datetime-local"
                    ></Input>
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
            <div className="w-full h-40 flex items-center justify-center text-black/50">
              Opps... Here are no rounds
            </div>
          </div>
        </section>
      </GridCard>

      <GridCard name="Settings">
        <section className="flex flex-wrap gap-4"></section>
      </GridCard>

      <GridCard name="Actions">
        <section className="flex flex-wrap gap-4">
          <Button type="button" variant="outline">
            Go to public page
          </Button>
          <Button type="button" variant="secondary">
            Copy link
          </Button>
          <Button type="submit" className="ml-auto min-w-30">
            Save Changes
          </Button>
        </section>
      </GridCard>
    </form>
  );
});

export default Page;
