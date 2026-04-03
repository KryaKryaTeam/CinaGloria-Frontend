import { useLoadMachine } from "@/hooks/loadMachine/useLoadMachine.hook";
import { useMe } from "@/hooks/user/UseMe.hook";
import { Badge } from "@/ui/badge";
import Logo from "@/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/ui/sidebar";
import { Swords, User } from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";

function AppSidebar() {
  const me = useMe();
  const profile = me.get();

  const loadMachine = useLoadMachine();

  const menu = [
    {
      icon: <Swords size={20} />,
      name: "Competitions",
      actions: [
        { name: "Active Blocks", link: "/competitions/active" },
        { name: "Leaderboard", link: "/competitions/leaderboard" },
        { name: "Join a Tournament", link: "/competitions/join" },
      ],
    },
    {
      icon: <User size={20} />,
      name: "Profile",
      actions: [
        { name: "Information", link: "/profile" },
        { name: "Privacy", link: "/profile/privacy" },
        { name: "Notifications", link: "/profile/notifications" },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-6 pt-12 gap-12">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton>
                  {item.icon}
                  <span>{item.name}</span>
                </SidebarMenuButton>

                {item.actions && item.actions.length > 0 && (
                  <SidebarMenuSub>
                    {item.actions.map((action) => (
                      <SidebarMenuSubItem key={action.name}>
                        <SidebarMenuSubButton asChild>
                          <Link href={"/app" + action.link}>{action.name}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex justify-center items-center h-20">
        <article className="flex flex-row gap-4 p-2 rounded-md">
          <Image
            key={profile.avatarUrl}
            src={profile.avatarUrl}
            width={128}
            height={128}
            alt="avatar"
            className="w-12 h-12 rounded-full bg-foreground"
            unoptimized
            {...loadMachine.attachToScope("global")}
          ></Image>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold">{profile.username}</h3>
            <Badge>{profile.role.toLocaleLowerCase()}</Badge>
          </div>
        </article>
      </SidebarFooter>
    </Sidebar>
  );
}

export default observer(AppSidebar);
