"use client";

import container, { TYPES } from "@/core/Container";
import { LoadState } from "@/state/LoadMachine/LoadState";
import { SidebarProvider } from "@/ui/sidebar";
import AppSidebar from "@/ui/widgets/app/AppSidebar";
import LoaderScreen from "@/ui/widgets/app/LoaderScreen";
import NotificationButton from "@/ui/widgets/notifications/NotificationButton";
import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect, useState } from "react";

function Layout({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);
  const loadState = container.get<LoadState>(TYPES.LoadState);

  useEffect(() => {
    loadState.mount();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, [loadState]);

  if (!isMounted) return null;

  return (
    <SidebarProvider defaultOpen={true}>
      <div
        className="w-screen h-screen bg-background z-50 absolute top-0 left-0"
        id="hidder"
      ></div>
      <LoaderScreen />
      <section className="flex flex-row w-screen">
        <AppSidebar />
        <section className="bg-foreground h-screen grow">{children}</section>
      </section>
      <section className="fixed right-0 top-0 w-auto p-8">
        <NotificationButton />
      </section>
    </SidebarProvider>
  );
}

export default observer(Layout);
