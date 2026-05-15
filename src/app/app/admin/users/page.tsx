"use client";

import { Search, Users, X } from "lucide-react";
import AdminTable, { ColumnDef } from "@/ui/widgets/admin/adminTable";
import InputWithDebounce from "@/ui/component/inputs/InputWithDebounce";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/infrastructure/utils";
import Image from "next/image";
import { useAdminUserList } from "@/hooks/admin/useAdminUserList.hook";
import { observer } from "mobx-react-lite";
import GridCard from "@/ui/component/gridCards/GridCard";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { IUserForAdminList } from "@/core/domain/entity/IUserForAdminList";
import { Ref } from "react";

export default observer(function Page() {
  const state = useAdminUserList();

  const {
    ref: sentinelRef,
    isExhausted,
    isLoading,
  } = usePagination(
    async (page) => {
      await state.fetchNext(page);
    },
    {
      threshold: 0.1,
      dependencies: [state.filter],
    },
  );

  const columns: ColumnDef<IUserForAdminList>[] = [
    {
      key: "avatar",
      header: "User",
      align: "center",
      className: "w-16",
      cell: (user) => (
        <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-black/5">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt=""
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-black/50">
              {user.email.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      cell: (user) => (
        <span className="font-medium text-black/90">{user.email}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      align: "right",
      cell: (user) => (
        <div className="inline-flex items-center gap-2">
          <select
            value={user.role}
            className={cn(
              "h-9 rounded-lg border px-3 py-1.5 text-sm outline-none transition-all",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "appearance-none pr-8 cursor-pointer bg-white",
            )}
            onChange={(e) =>
              state.changeRole(e.target.value as RoleEnum, user.id)
            }
          >
            {Object.values(RoleEnum).map((r) => (
              <option key={r} value={r} className="text-black">
                {r}
              </option>
            ))}
          </select>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 bg-white/20 ">
            <Users className="h-5 w-5 text-white/70" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Admin Users
            </h1>
            <p className="text-sm text-white/40">
              Manage user roles and permissions
            </p>
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors pointer-events-none text-black/50" />
          <InputWithDebounce
            debounceCallback={(val) => state.setFilter(val)}
            debounceMs={400}
            placeholder="Search by email..."
            value={state.filter}
            className="pl-9 pr-9 w-full sm:w-72 bg-white"
          />
          {state.filter && (
            <button
              onClick={() => state.setFilter("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            >
              <X className="h-4 w-4 text-black/50" />
            </button>
          )}
        </div>
      </div>

      <GridCard className="flex-1">
        <AdminTable
          columns={columns}
          data={state.users}
          emptyMessage="No users found"
        />

        <div
          ref={sentinelRef as Ref<HTMLDivElement | null>}
          className="h-20 w-full flex items-center justify-center"
        >
          {isLoading && (
            <p className="text-sm font-light text-black/40">Loading users...</p>
          )}

          {isExhausted && state.users.length > 0 && (
            <p className="text-sm font-light text-black/30">
              Opps... users are ended
            </p>
          )}
        </div>
      </GridCard>
    </div>
  );
});
