import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import TeamTabDetails from "@/ui/widgets/team/TeamTabDetails";
import TeamTabGeneral from "@/ui/widgets/team/TeamTabGeneral";
import TeamTabMembers from "@/ui/widgets/team/TeamTabMembers";
import { User2 } from "lucide-react";

function Page() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 bg-white/20 ">
          <User2 className="h-5 w-5 text-white/70" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Manage team{" "}
          </h1>
          <p className="text-sm text-white/40">Manage your team</p>
        </div>
      </div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TeamTabDetails />
        <TeamTabGeneral />
        <TeamTabMembers />
      </Tabs>
    </section>
  );
}

export default Page;
