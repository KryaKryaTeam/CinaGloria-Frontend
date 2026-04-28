"use client";
import { useLoadMachine } from "@/hooks/loadMachine/useLoadMachine.hook";
import useNotification from "@/hooks/notification/useNotification.hook";
import { useMe } from "@/hooks/user/useMe.hook";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import GridCard from "@/ui/component/gridCards/GridCard";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/ui/item";
import { format, formatDate, isValid } from "date-fns";
import {
  Calendar,
  InboxIcon,
  Info,
  Mail,
  Pencil,
  Settings,
  User,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

function Page() {
  const loadMachine = useLoadMachine();
  const profile = useMe().get();
  const additionalData = useMe().getAdditionalData();
  const nt = useNotification();

  const unreadNotifications = useMemo(() => {
    return nt.notifications.filter((n) => !n.read).slice(0, 5);
  }, [nt.notifications]);

  return (
    <>
      <article className="w-full grow grid grid-cols-1 @5xl:grid-cols-[600px_1fr] @5xl:grid-rows-[400px_300px_1fr] gap-4">
        <GridCard className="h-100">
          <Image
            src={"/prBg.jpg"}
            alt="cover"
            width={400}
            height={300}
            className="absolute w-full h-40 top-0 left-0  object-cover"
          ></Image>
          <article className="flex flex-col gap-4 p-2 relative mt-15">
            <Image
              key={profile.avatarUrl}
              src={profile.avatarUrl}
              width={128}
              height={128}
              alt="avatar"
              className="w-32 h-32 rounded-full bg-foreground border-4 border-foreground"
              {...loadMachine.attachToScope("global")}
            ></Image>
            <div className="flex flex-col gap-2">
              <h3 className="text-4xl font-bold">{profile.username}</h3>
              <Badge>{profile.role.toLocaleLowerCase()}</Badge>
            </div>
          </article>
        </GridCard>
        <GridCard className="row-span-3 h-full hidden @5xl:block">
          <h1 className="font-semibold text-[2rem]">
            Welcome back, {profile.username}!
          </h1>
        </GridCard>
        <GridCard className="h-full flex flex-col @container">
          <h2 className=" flex flex-row items-center justify-between">
            <span className="text-2xl gap-2 font-semibold flex flex-row items-center">
              <Info className="w-5 h-5" /> Contacts
            </span>
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 auto-rows-[80px] gap-4 w-full grow h-full">
            {" "}
            <Item
              variant={additionalData.contacts.discord ? "outline" : "muted"}
            >
              <ItemMedia>
                <Image
                  src={"/discord.svg"}
                  width={48}
                  height={48}
                  alt="discord logo"
                ></Image>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Discord</ItemTitle>
                <ItemDescription>
                  {additionalData.contacts.discord || "Not mentioned"}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item
              variant={additionalData.contacts.telegram ? "outline" : "muted"}
            >
              <ItemMedia>
                <Image
                  src={"/telegram.png"}
                  width={48}
                  height={48}
                  alt="discord logo"
                ></Image>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Telegram</ItemTitle>
                <ItemDescription>
                  {additionalData.contacts.telegram || "Not mentioned"}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline" className="col-span-1 sm:col-span-2">
              <ItemMedia>
                <Mail size={48} strokeWidth={1.5} color="#202020" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Email</ItemTitle>
                <ItemDescription>
                  {additionalData.email || "Not mentioned"}
                </ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </GridCard>
        <GridCard>
          <h2 className="text-2xl flex flex-row items-center gap-2 font-semibold">
            <InboxIcon className="w-5 h-5" /> Inbox
          </h2>
          <div className="w-full h-full flex flex-col items-center">
            {nt.haveUnreadedNotifications ? (
              <div className="flex flex-col w-full gap-2 mt-5">
                {unreadNotifications.map((notification) => (
                  <Item
                    key={notification.id}
                    variant={notification.read ? "muted" : "outline"}
                    className="w-full cursor-pointer"
                    // onClick={() => handleSelect(notification)}
                  >
                    <ItemContent>
                      <ItemTitle>
                        <h2 className="font-semibold">{notification.title}</h2>
                      </ItemTitle>
                      <ItemDescription className="text-start">
                        {isValid(notification.createdAt)
                          ? formatDate(notification.createdAt, "do MMMM yyyy")
                          : "Meow!"}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                ))}
              </div>
            ) : (
              <>
                <Image
                  className="w-16/30 object-contain rounded-md opacity-80 flex-1"
                  src={"/cat.png"}
                  alt="bg3"
                  width={800}
                  height={300}
                ></Image>
                <h4 className="text-lg font-light mt-4 flex-4">
                  You don`t have any messages yet.
                </h4>
              </>
            )}
          </div>
        </GridCard>
      </article>
    </>
  );
}

export default observer(Page);
