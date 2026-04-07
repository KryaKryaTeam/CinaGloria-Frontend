"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "@/infrastructure/utils";
import { animate } from "animejs";

const SheetContext = React.createContext(false);

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  const [Open, setOpen] = React.useState(props.open || false);
  return (
    <SheetContext.Provider value={Open}>
      <SheetPrimitive.Root
        data-slot="sheet"
        onOpenChange={(_new) => setOpen(_new)}
        open={Open}
        {...props}
      />
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "right" | "left" | "bottom" | "top";
}) {
  // 1. Отримуємо стан open безпосередньо з контексту Radix
  const open = React.useContext(SheetContext);

  // 2. Стан для реального монтування в DOM
  const [shouldRender, setShouldRender] = React.useState(open);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const [overlay, setOverlay] = React.useState<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (open) {
      setShouldRender(true);
    } else if (shouldRender && container && overlay) {
      const isHorizontal = side === "left" || side === "right";
      const axis = isHorizontal ? "translateX" : "translateY";
      const exitValue =
        side === "right" || side === "bottom" ? "100%" : "-100%";

      const outAnim = animate(container, {
        [axis]: exitValue,
        opacity: 0,
        duration: 300,
        easing: "easeInQuint",
      });

      animate(overlay, {
        opacity: 0,
        duration: 300,
        easing: "linear",
      });

      outAnim.onComplete = () => {
        setShouldRender(false);
      };
    }
  }, [container, open, overlay, shouldRender, side]);

  // Ефект для вхідної анімації (спрацьовує відразу після setShouldRender(true))
  React.useEffect(() => {
    if (shouldRender && open && container && overlay) {
      const isHorizontal = side === "left" || side === "right";
      const axis = isHorizontal ? "translateX" : "translateY";
      const startValue =
        side === "right" || side === "bottom" ? "100%" : "-100%";

      animate(container, {
        [axis]: [startValue, 0],
        opacity: [0, 1],
        duration: 450,
        easing: "spring(1, 80, 13, 0)",
      });

      animate(overlay, {
        opacity: [0, 1],
        duration: 300,
        easing: "linear",
      });
    }
  }, [shouldRender, open, side, overlay, container]);

  if (!shouldRender) return null;

  return (
    <SheetPortal forceMount>
      <SheetPrimitive.Overlay
        forceMount
        ref={setOverlay}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      />
      <SheetPrimitive.Content
        forceMount
        ref={setContainer}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-2xl outline-none",
          side === "right" &&
            "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "inset-x-0 bottom-0 h-auto border-t",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
