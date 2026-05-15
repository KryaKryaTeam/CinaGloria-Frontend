import container, { TYPES } from "@/core/Container";
import { IUserShortProfile } from "@/core/domain/entity/User";
import { GetUserProfileByIdRequest } from "@/core/requests/network/GetUserProfileByIdRequest";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";

function UserProfileCard({ id, children }: PropsWithChildren<{ id: string }>) {
  const [user, setUser] = useState<IUserShortProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const request = container.get<GetUserProfileByIdRequest>(
          TYPES.GetUserProfileByIdRequest,
        );
        const data = await request.execute(id);

        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-20 border-black/10 border bg-slate-50 animate-pulse rounded-xl flex items-center px-4">
        <div className="h-12 w-12 rounded-full bg-slate-200" />
        <div className="ml-3 h-4 w-24 bg-slate-200 rounded" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full h-20 border-black/5 border bg-white rounded-xl flex items-center px-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100 border border-black/5">
        <Image
          src={user.avatarUrl || "/baseAvatarComp.png"}
          fill
          alt={user.username}
          className="object-cover"
        />
      </div>

      <div className="ml-4 overflow-hidden">
        <h2 className="font-bold text-slate-800 truncate">{user.username}</h2>
        <p className="text-[10px] text-slate-400 font-mono uppercase truncate">
          ID: {id.slice(0, 8)}
        </p>
      </div>

      {children}
    </div>
  );
}

export default UserProfileCard;
