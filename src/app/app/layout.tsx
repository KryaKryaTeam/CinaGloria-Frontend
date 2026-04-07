"use client";

import container, { TYPES } from "@/core/Container";
import { LoadState } from "@/state/LoadMachine/LoadState";
import { SidebarProvider } from "@/ui/sidebar";
import AppSidebar from "@/ui/widgets/app/AppSidebar";
import LoaderScreen from "@/ui/widgets/app/LoaderScreen";
import NotificationButton from "@/ui/widgets/notifications/NotificationButton";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

function Layout({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);
  const loadState = container.get<LoadState>(TYPES.LoadState);

  const path = usePathname();

  useEffect(() => {
    loadState.mount();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, [loadState]);

  const prevScopeRef = useRef<string>(null);

  useEffect(() => {
    const segments = path.split("/");
    if (segments[1] !== "app") return;

    const newScope = segments[2];
    const oldScope = prevScopeRef.current;

    if (newScope === oldScope) return;

    if (oldScope) {
      loadState.leaveFromScope(oldScope);
    }

    loadState.enterInScope(newScope);
    prevScopeRef.current = newScope;
  }, [path, loadState]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div
        className="w-screen h-screen bg-background z-50 absolute top-0 left-0"
        id="hidder"
      ></div>
      <LoaderScreen />
      <section className="flex flex-row w-screen">
        <AppSidebar />
        <section className="bg-foreground h-screen grow p-6">
          {children}
        </section>
      </section>
      <section className="fixed right-0 top-0 w-auto p-8">
        <NotificationButton />
      </section>
    </SidebarProvider>
  );
}

export default observer(Layout);
