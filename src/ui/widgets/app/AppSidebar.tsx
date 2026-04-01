import { useMe } from "@/hooks/user/UseMe.hook";
import { Badge } from "@/ui/badge";
import { Sidebar, SidebarHeader } from "@/ui/sidebar";
import { observer } from "mobx-react-lite";
import Image from "next/image";

function AppSidebar() {
  const me = useMe();
  const profile = me.get();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 pt-12 gap-12">
        <h2 className="font-bebas text-2xl leading-0 text-foreground w-full text-center">
          CinaGloria
        </h2>

        <article className="flex flex-row gap-4">
          <Image
            src={profile.avatarUrl}
            width={128}
            height={128}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          ></Image>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold">{profile.username}</h3>
            <Badge>{profile.role.toLocaleLowerCase()}</Badge>
          </div>
        </article>
      </SidebarHeader>
    </Sidebar>
  );
}

export default observer(AppSidebar);
