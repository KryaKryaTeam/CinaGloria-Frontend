/* eslint-disable react-hooks/refs */
"use client";

import { useEffect, useState } from "react";
import useCompetition from "@/hooks/useCompetition";
import { usePagination } from "@/hooks/usePagination";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { PaletteIcon, Plus } from "lucide-react";
import { CompetitionAdminCard } from "@/ui/widgets/admin/CompetitionAdminCard";
import { observer } from "mobx-react-lite";
import debugLog from "@/infrastructure/debugLog";

function Page() {
  const { store, fetch, reset, page } = useCompetition({ forAdmin: true });
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const pagination = usePagination<void, HTMLDivElement>(() => fetch("all"), {
    threshold: 0.5,
  });
  useEffect(() => {
    debugLog(`${store.competitions}`);
  }, [store.competitions]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 bg-white/20 ">
            <PaletteIcon className="h-5 w-5 text-white/70" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Competitions
            </h1>
            <p className="text-sm text-white/40">Manage competitions</p>
          </div>
        </div>
        <Button
          onClick={() => router.push("/app/admin/competitions/create")}
          className="gap-2"
          variant={"secondary"}
        >
          <Plus size={16} />
          Create Competition
        </Button>
      </div>

      {initialized ? (
        <p className="text-center text-muted-foreground animate-pulse py-12">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {store.competitions.map((competition) => (
            <div
              className="w-full h-full flex justify-center items-center"
              key={competition.id}
            >
              <CompetitionAdminCard competition={competition} />
            </div>
          ))}

          <div ref={pagination.ref} className="col-span-full h-4" />
        </div>
      )}
    </div>
  );
}

export default observer(Page);
