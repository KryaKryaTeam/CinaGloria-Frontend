"use client";
import GridCard from "@/ui/component/gridCards/GridCard";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import DragAndDropInput from "@/ui/widgets/dragAndDropInput";
import { useMemo, useState } from "react";

import {
  FieldError as ferhf,
  FieldErrorsImpl,
  Merge,
  MultipleFieldErrors,
} from "react-hook-form";
import { useCreateCompetition } from "@/hooks/admin/useCreateCompetition.hook";
import { PaletteIcon } from "lucide-react";
import { Button } from "@/ui/button";

function ErrorBlank({
  error,
}: {
  error:
    | ferhf
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    | Merge<ferhf, FieldErrorsImpl<{}>>
    | MultipleFieldErrors
    | (Record<string, Partial<{ type: string | number; message: string }>> &
        Partial<{ type: string | number; message: string }>)
    | undefined;
}) {
  if (error) return <FieldError>{error.message}</FieldError>;
}

export function Page() {
  const comp = useCreateCompetition();
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 bg-white/20 ">
          <PaletteIcon className="h-5 w-5 text-white/70" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Competition create
          </h1>
          <p className="text-sm text-white/40">Create competition</p>
        </div>
      </div>
      <form className="space-y-6 pb-20" onSubmit={comp.submit}>
        <GridCard name="Text info">
          <section className="space-y-4">
            <Field>
              <FieldLabel htmlFor="comp-name">Name of competition</FieldLabel>
              <Input
                id="comp-name"
                placeholder="Summer cup"
                {...comp.register("name")}
              />
              <ErrorBlank error={comp.errors.name} />
            </Field>
            <Field>
              <FieldLabel htmlFor="comp-desc">
                Description of competition
              </FieldLabel>
              <Textarea
                id="comp-desc"
                placeholder="Describe your event..."
                className="max-h-32"
                {...comp.register("desc")}
              />
              <ErrorBlank error={comp.errors.desc} />
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
                {...comp.register("avatar")}
              />
              <ErrorBlank error={comp.errors.avatar} />
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
                {...comp.register("banner")}
              />
              <ErrorBlank error={comp.errors.banner} />
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
                {...comp.register("ultraWideBanner")}
              />
              <ErrorBlank error={comp.errors.ultraWideBanner} />
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
                {...comp.register("socialMedia")}
              />
              <ErrorBlank error={comp.errors.socialMedia} />
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
        <GridCard name="Actions">
          <section className="flex flex-wrap gap-4">
            <ErrorBlank error={comp.errors.root} />
            <Button type="submit" className="ml-auto min-w-30">
              Create
            </Button>
          </section>
        </GridCard>
      </form>
    </div>
  );
}

export default Page;
