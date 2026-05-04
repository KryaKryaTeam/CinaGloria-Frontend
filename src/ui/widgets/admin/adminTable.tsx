import { cn } from "@/infrastructure/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { ReactNode } from "react";

export type ColumnDef<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
};

type AdminTableProps<T> = {
  caption?: string;
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  actions?: (row: T) => ReactNode;
  className?: string;
};

export default function AdminTable<T>({
  caption,
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data",
  actions,
  className,
}: AdminTableProps<T>) {
  if (!isLoading && data.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        {caption && (
          <h1 className="text-2xl font-semibold tracking-tight text-center text-white">
            {caption}
          </h1>
        )}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <p className="text-sm text-white/40">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {caption && (
        <h1 className="text-2xl font-semibold tracking-tight text-center text-white">
          {caption}
        </h1>
      )}

      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "h-11 px-4 text-xs font-medium text-white/50 uppercase tracking-wider",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.className,
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="h-11 px-4 text-xs font-medium text-white/50 uppercase tracking-wider text-right">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="h-32 text-center"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
                    <span className="text-sm text-white/40">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.04] data-[state=selected]:bg-white/[0.06]"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-sm",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.className,
                      )}
                    >
                      {col.cell(row)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {actions(row)}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
