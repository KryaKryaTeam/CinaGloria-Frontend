import useNotification from "@/hooks/notification/useNotification";
import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import { Badge, MailCheck } from "lucide-react";
import { observer } from "mobx-react-lite";
import { PropsWithChildren, useState } from "react";
import { format, isValid } from "date-fns";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/ui/item";
import { marked } from "marked";
import { Notification } from "@/core/domain/entity/Notification";

function NotificationSheet({ children }: PropsWithChildren) {
  const nt = useNotification();
  const [SelectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const handleSelect = (notification: Notification) => {
    console.log("MEOW!");
    setSelectedNotification(notification);
    nt.read(notification.id);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col h-full">
          <ScrollArea className="h-full">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle className="text-2xl font-bold">
                Notifications
              </SheetTitle>
            </SheetHeader>

            <section className="flex-1 flex flex-col mt-4 h-full px-4">
              <div className="flex flex-row h-max w-full gap-2 px-6 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => nt.readAll()}
                >
                  <MailCheck className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-2 px-4">
                {nt.notifications.map((notification) => (
                  <Item
                    variant={notification.read ? "muted" : "outline"}
                    className="w-full cursor-pointer"
                    key={notification.id}
                    onClick={() => handleSelect(notification)}
                  >
                    <ItemMedia>
                      {!notification.read && (
                        <div className="w-3 h-3 rounded-full bg-chart-1" />
                      )}
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>
                        <h2 className="font-semibold">{notification.title}</h2>
                      </ItemTitle>
                      <ItemDescription>
                        {isValid(notification.createdAt)
                          ? format(notification.createdAt, "do MMMM yyyy")
                          : "Meow!"}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            </section>
            <div className="h-12 w-full opacity-0"></div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <Sheet
        open={!!SelectedNotification}
        onOpenChange={(open) => !open && setSelectedNotification(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{SelectedNotification?.title}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-4 prose-shadcn px-4">
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(
                  SelectedNotification?.content || "",
                ) as string,
              }}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default observer(NotificationSheet);
