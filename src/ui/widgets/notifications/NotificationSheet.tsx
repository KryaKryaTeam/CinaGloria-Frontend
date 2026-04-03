import useNotification from "@/hooks/notification/useNotification";
import { Button } from "@/ui/button";
import { Card, CardHeader } from "@/ui/card";
import { ScrollArea } from "@/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import { Badge, MailCheck } from "lucide-react";
import { observer } from "mobx-react-lite";
import { PropsWithChildren } from "react";
import { format, isValid } from "date-fns";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/ui/item";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { marked } from "marked";

function NotificationSheet({ children }: PropsWithChildren) {
  const { get, read, readAll } = useNotification();
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-2xl font-bold">Notifications</SheetTitle>
        </SheetHeader>
        <section className="p-4 flex flex-col">
          <div className="flex flex-wrap flex-row h-max w-full gap-2">
            <Button
              variant={"ghost"}
              onClick={() => {
                readAll();
              }}
            >
              <MailCheck />
            </Button>
          </div>
          <ScrollArea>
            {get().map((notification) => (
              <Sheet key={notification.id}>
                <SheetTrigger asChild>
                  <Item
                    variant={notification.read ? "muted" : "outline"}
                    className="w-full mt-2"
                  >
                    <ItemMedia>
                      {notification.read ? null : (
                        <div className="w-3 h-3 rounded-full bg-chart-1"></div>
                      )}
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>
                        <h2>{notification.title}</h2>
                      </ItemTitle>
                      <ItemDescription>
                        <p>
                          {isValid(notification.createdAt)
                            ? format(notification.createdAt, "do MMMM yyyy")
                            : "Meow!"}
                        </p>
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="font-2xl font-bold">
                      {notification.title}
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="p-4 prose-shadcn">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(notification.content),
                      }}
                    ></div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            ))}
          </ScrollArea>
        </section>
      </SheetContent>
    </Sheet>
  );
}

export default observer(NotificationSheet);
