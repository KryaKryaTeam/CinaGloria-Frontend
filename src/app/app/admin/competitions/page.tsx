'use client'
import { useDebugValue, useEffect } from "react";
import useCompetition from "@/hooks/useCompetition";
import { usePagination } from "@/hooks/usePagination";
import AdminTable from "@/ui/widgets/admin/adminTable";
import { useRouter } from "next/navigation";

export default function Page() {        
    const { get, fetch, reset, page } = useCompetition({ forAdmin: true });
    const router = useRouter();
    const actions = new Map<string, (row: object) => void>([
        ["Edit", (row) => router.push(`/admin/competitions/${(row as any).id}`)],
        ["Delete", (row) => console.log("Delete", row)],
    ]);
    const paginationRef = usePagination<void, HTMLTableRowElement>(
        () => fetch("all"),
        { threshold: 0.5 }
    );
    useEffect(() => {
        console.log("Current page:", page);
    })
    useEffect(() => {
        reset();
        fetch("all");
    }, []);

    const competitions = get("all");

    const tableData = competitions.map((c) => ({
        id: c.id,
        name: c.name ?? "—",
        status: c.status,
        dateOfStart: "—",
        dateOfEnd:  "—",
    }));

    return (
        <div className="text-white p-6">
            {competitions.length === 0 ? (
                <p className="text-center text-muted-foreground animate-pulse">
                    Loading...
                </p>
            ) : (
                <AdminTable
                    caption="Competitions"
                    data={tableData}
                    actions={actions}
                    lastRowRef={paginationRef}
                />
            )}
        </div>
    );
}