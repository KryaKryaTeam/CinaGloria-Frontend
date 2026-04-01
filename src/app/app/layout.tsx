"use client";

import { useMe } from "@/hooks/user/UseMe.hook";
import { SidebarProvider } from "@/ui/sidebar";
import AppSidebar from "@/ui/widgets/app/AppSidebar";
import { PropsWithChildren, useEffect } from "react";

function Layout({ children }: PropsWithChildren) {
  const me = useMe();

  useEffect(() => {
    
    me.fetch();
  }, []);
  return (
    <SidebarProvider defaultOpen={true}>
      <section className="flex flex-row w-screen">
        <AppSidebar />
        <section className="bg-foreground h-screen grow">{children}</section>
      </section>
    </SidebarProvider>
  );
}

export default Layout;
