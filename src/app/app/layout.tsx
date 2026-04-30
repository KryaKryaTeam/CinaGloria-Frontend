"use client";

import AuthCheck from "@/core/client-check/AuthCheck";
import container, { TYPES } from "@/core/Container";
import { LoadState } from "@/state/LoadMachine/LoadState";
import { GridCardDelayContext } from "@/ui/component/gridCards/GridCard";
import { SidebarProvider } from "@/ui/sidebar";
import AppSidebar from "@/ui/widgets/app/AppSidebar";
import LoaderScreen from "@/ui/widgets/app/LoaderScreen";
import NotificationButton from "@/ui/widgets/notifications/NotificationButton";
import { observer } from "mobx-react-lite";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from "react";

function Layout({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);
  const loadState = container.get<LoadState>(TYPES.LoadState);
  const router = useRouter()
  const check = container.get<AuthCheck>(TYPES.AuthCheck)
  const path = usePathname();
  check.setRouter(router)
  useEffect(() => {
    loadState.mount();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, [loadState]);

  const prevScopeRef = useRef<string>(null);

  useEffect(() => {
    check.check();
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
      <GridCardDelayContext.Provider value={10}>
        <div
          className="w-screen h-screen bg-background z-50 absolute top-0 left-0"
          id="hidder"
        ></div>
        <AnimatePresence>
          <LoaderScreen />
        </AnimatePresence>
        <section className="flex flex-row w-screen">
          <div className="w-screen h-screen fixed top-0 left-0 bg-foreground -z-20"></div>
          <Image
            src={"/bg2.png"}
            alt="background"
            className="opacity-5 w-screen h-screen fixed top-0 left-0 -z-10"
            fill 
          />

          <AppSidebar />

          <section
            key={path}
            className="flex flex-col h-screen grow p-6 max-w-500 mb-20 mx-auto @container"
          >
            <div className="h-12 mb-3 w-full flex justify-end">
              <NotificationButton />
            </div>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
            <div className="h-15 w-full">.</div>
          </section>
        </section>
      </GridCardDelayContext.Provider>
    </SidebarProvider>
  );
}

export default observer(Layout);
