import { Controller } from "react-hook-form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { DragAndDrop } from "@/ui/widgets/drag-and-drop/drag-and-drop";
import { useCreateTeamForm } from "@/hooks/team/use-create-team-form";
import { useTeamState } from "@/state/team.state";

export const CreateTeamForm = () => {
  const { form, onSubmit } = useCreateTeamForm();
  const { isSubmitting, error } = useTeamState();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Team Name</label>
        <Controller
          control={form.control}
          name="name"
          render={({ field }: { field: any }) => (
            <Input placeholder="Enter team name" {...field} />
          )}
        />
        {form.formState.errors.name && (
          <span className="text-red-500 text-xs">
            {form.formState.errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Team Avatar</label>
        <Controller
          control={form.control}
          name="avatar"
          render={({ field }: { field: any }) => (
            <DragAndDrop
              value={field.value}
              onChange={field.onChange}
              type="team:avatar"
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Team Banner</label>
        <Controller
          control={form.control}
          name="banner"
          render={({ field }: { field: any }) => (
            <DragAndDrop
              value={field.value}
              onChange={field.onChange}
              type="team:banner"
            />
          )}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Team"}
      </Button>
    </form>
  );
};
