"use client";

import { useEffect, useState } from "react";
import useCompetition from "@/hooks/useCompetition";
import { usePagination } from "@/hooks/usePagination";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { Plus } from "lucide-react";
import { CompetitionAdminCard } from "@/ui/widgets/admin/CompetitionAdminCard";
import { observer } from "mobx-react-lite";
import debugLog from "@/infrastructure/debugLog";

function Page() {
  const { store, fetch, reset, page } = useCompetition({ forAdmin: true });
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const paginationRef = usePagination<void, HTMLDivElement>(
    () => fetch("all"),
    { threshold: 0.5 },
  );
  useEffect(() => {
    debugLog(`${store.competitions}`);
  }, [store.competitions]);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Competitions</h1>
        <Button
          onClick={() => router.push("/admin/competitions/new")}
          className="gap-2"
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
            <CompetitionAdminCard
              key={competition.id}
              competition={competition.toPublicObject()}
            />
          ))}

          <div ref={paginationRef} className="col-span-full h-4" />
        </div>
      )}
    </div>
  );
}

export default observer(Page);
