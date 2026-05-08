import { Badge } from "@/ui/badge";
import { formatDate } from "date-fns";

function Roadmap() {
  return (
    <section className="w-full h-60 flex flex-col gap-y-2 px-4 py-4 rounded-lg bg-background">
      <h2 className="text-xl font-medium">Roadmap</h2>
      <div className="w-full flex-1 bg-accent rounded-lg">
        <div className="w-full px-2 py-2 h-10 flex flex-col">
          <span className="w-full h-0.5 bg-foreground rounded-md"></span>
          <span className="w-full h-5 flex flex-row">
            <Badge className="text-sm">
              {formatDate(new Date().toLocaleString(), "yyyy.MM.dd HH:m")}
            </Badge>
          </span>
        </div>
      </div>
    </section>
  );
}

export default Roadmap;
