import { Button } from "@/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

type ActionMap = Map<string, (row: object) => void>;

export default function AdminTable<T>({
  caption,
  data,
  actions,
}: {
  caption: string;
  data: object[];
  actions?: ActionMap;
}) {
  if (data.length === 0) return <p>No data</p>;

  const headers = Object.keys(data[0]);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight mb-4 text-center">{caption}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
            {actions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.entries(row).map(([key, value]) => (
                <TableCell key={key}>{String(value)}</TableCell>
              ))}
              {actions && (
  <TableCell>
    <div className="flex space-x-4">
      {Object.keys(row).map((key) =>
        actions.has(key) ? (
          <Button key={key} onClick={() => actions.get(key)!(row)}>
            {key}
          </Button>
        ) : null
      )}
    </div>
  </TableCell>
)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
             <div className="flex justify-center mt-4">
    </div>
    </>
  );
}
