import { cn } from "@/infrastructure/utils";
import GridCard from "@/ui/component/gridCards/GridCard";
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
  actions,
  className,
}: AdminTableProps<T>) {
  if (data.length == 0) {
    return (
      <div className="h-10 w-full">
        <p className="w-full text-center font-light text-foreground">
          Users with this email are undefined
        </p>
      </div>
    );
  }
  return (
    <div className={cn("space-y-4", className)}>
      {caption && (
        <h1 className="text-2xl font-semibold tracking-tight text-center ">
          {caption}
        </h1>
      )}

      <div className="overflow-hidden">
        <Table className="bg-transparent">
          <TableHeader>
            <TableRow className="border-b border-black/10 hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "h-11 px-4 text-xs font-medium uppercase tracking-wider bg-transparent",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.className,
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="h-11 px-4 text-xs font-medium text-black/50 uppercase tracking-wider text-right bg-transparent">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b border-black/10 hover:bg-transparent"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-sm bg-transparent",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.className,
                    )}
                  >
                    {col.cell(row)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="px-4 py-3 text-right bg-transparent">
                    <div className="flex justify-end gap-2">{actions(row)}</div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
