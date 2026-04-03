"use client";

import { SidebarProvider } from "@/ui/sidebar";
import AppSidebar from "@/ui/widgets/app/AppSidebar";
import LoaderScreen from "@/ui/widgets/app/LoaderScreen";
import NotificationButton from "@/ui/widgets/notifications/NotificationButton";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
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

export default Layout;
