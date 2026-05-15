import { cn } from "@/infrastructure/utils";

function Logo({ size = 1, className }: { size?: number; className?: string }) {
  return (
    <h2
      className={cn(
        "font-bebas leading-0 text-foreground w-full text-center",
        className,
      )}
      style={{ fontSize: 1.5 * size + "rem" }}
    >
      CinaGloria
    </h2>
  );
}

export default Logo;
