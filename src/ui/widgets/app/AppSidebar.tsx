import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { useLoadMachine } from "@/hooks/loadMachine/useLoadMachine.hook";
import { useMe } from "@/hooks/user/useMe.hook";
import { Badge } from "@/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import Logo from "@/ui/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/ui/sidebar";
import {
  Download,
  HardHat,
  LogOut,
  Swords,
  User2,
  UserCog2,
} from "lucide-react";
import { action } from "mobx";
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
      role: "all",
      actions: [
        {
          role: "all",
          name: "Browse Tournaments",
          link: "/competitions/active",
        },
        { role: "all", name: "History", link: "/competitions/history" },
      ],
    },
    {
      icon: <User2 size={20} />,
      name: "Profile",
      role: "all",
      actions: [
        { role: "all", name: "Information", link: "/profile/information" },
        { role: "all", name: "Settings", link: "/profile/settings" },
      ],
    },
    {
      icon: <UserCog2 />,
      name: "Admin panel",
      role: [RoleEnum.ADMIN],
      actions: [
        { role: [RoleEnum.ADMIN], name: "Users", link: "/admin/users" },
        {
          role: [RoleEnum.ADMIN],
          name: "Competitions",
          link: "/admin/competitions",
        },
      ],
    },
    {
      icon: <HardHat />,
      name: "My teams",
      role: "all",
      actions: [
        { role: "all", name: "Browse", link: "/teams/browse" },
        { role: "all", name: "Create new", link: "/teams/create" },
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
            {menu.map((item) => {
              return item.role == "all" || item.role.includes(profile.role) ? (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton>
                    {item.icon}
                    <span>{item.name}</span>
                  </SidebarMenuButton>

                  {item.actions && item.actions.length > 0 && (
                    <SidebarMenuSub>
                      {item.actions.map((action) => {
                        return action.role == "all" ||
                          action.role.includes(profile.role) ? (
                          <SidebarMenuSubItem key={action.name}>
                            <SidebarMenuSubButton asChild>
                              <Link href={"/app" + action.link}>
                                {action.name}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ) : null;
                      })}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ) : null;
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex justify-center items-center h-20 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <article className="flex flex-row gap-4 p-2 w-full rounded-md border-foreground hover:bg-accent items-center justify-center shadow-2xl bg-card">
              <Image
                key={profile.avatarUrl}
                src={profile.avatarUrl}
                width={256}
                height={256}
                alt="avatar"
                className="w-12 h-12 rounded-full bg-foreground"
                unoptimized
                {...loadMachine.attachToScope("global")}
              ></Image>
              <h3 className="text-sm font-bold">{profile.username}</h3>
            </article>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => me.logout()}>
              <LogOut /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default observer(AppSidebar);
