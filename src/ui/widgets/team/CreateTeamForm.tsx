"use client";

import { Controller } from "react-hook-form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useCreateTeamForm } from "@/hooks/team/useCreateTeamForms";
import { useTeamState } from "@/state/team.state";
import DragAndDropInput from "../dragAndDropInput";
interface SystemDragDropProps {
  onUpload: (value: any) => void;
  value?: string | null;
}

export const CreateTeamForm = () => {
  const { form, onSubmit } = useCreateTeamForm();
  const { isSubmitting, error } = useTeamState();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Team Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Team Name</label>
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              placeholder="Enter team name"
              {...field}
              value={field.value ?? ""}
            />
          )}
        />
      </div>

      {/* Team Avatar */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Team Avatar</label>
        <Controller
          control={form.control}
          name="avatar"
          render={({ field }) => {
            const DragDrop =
              DragAndDropInput as unknown as React.ComponentType<SystemDragDropProps>;
            return (
              <DragDrop
                onUpload={field.onChange}
                value={field.value ?? undefined}
              />
            );
          }}
        />
      </div>

      {/* Team Banner */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Team Banner</label>
        <Controller
          control={form.control}
          name="banner"
          render={({ field }) => {
            const DragDrop =
              DragAndDropInput as unknown as React.ComponentType<SystemDragDropProps>;
            return (
              <DragDrop
                onUpload={field.onChange}
                value={field.value ?? undefined}
              />
            );
          }}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create Team"}
      </Button>
    </form>
  );
};
