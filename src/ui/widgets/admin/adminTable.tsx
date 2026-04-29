import { Button } from "@/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { RefObject } from "react";

type ActionMap = Map<string, (row: object) => void>;

export default function AdminTable<T>({
  caption,
  data,
  actions,
  lastRowRef,
}: {
  caption: string;
  data: object[];
  actions?: ActionMap;
  lastRowRef?: RefObject<HTMLTableRowElement>;
}) {
  if (data.length === 0) return <p>No data</p>;

  const headers = Object.keys(data[0]);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight mb-4 text-center">
        {caption}
      </h1>
      <Table className="w-full text-white">
        <TableHeader>
          <TableRow>
            {headers.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
            {actions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => {
            const isLast = rowIndex === data.length - 1;
            return (
              <TableRow
                key={rowIndex}
                ref={isLast ? lastRowRef : undefined}
              >
                {Object.entries(row).map(([key, value]) => (
                  <TableCell key={key}>{String(value)}</TableCell>
                ))}
                {actions && (
  <TableCell>
    <div className="flex space-x-2">
      {Array.from(actions.entries()).map(([label, handler]) => (
        <Button key={label} onClick={() => handler(row)}>
          {label}
        </Button>
      ))}
    </div>
  </TableCell>
)}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}