"use client";

import { useCallback, useRef, useState } from "react";
import container from "@/core/Container";
import { TYPES } from "@/core/Container.types";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { IUserForAdminList } from "@/core/domain/entity/IUserForAdminList";
import { GetUsersAdminListRequest } from "@/core/requests/network/GetUsersAdminList.request";
import { UpdateUserRoleRequest } from "@/core/requests/network/UpdateUserRole.request";
import { Search, Users, X } from "lucide-react";
import AdminTable, { ColumnDef } from "@/ui/widgets/admin/adminTable";
import InputWithDebounce from "@/ui/component/inputs/InputWithDebounce";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/infrastructure/utils";

const PAGE_SIZE = 20;

export default function Page() {
  const [users, setUsers] = useState<IUserForAdminList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [emailQuery, setEmailQuery] = useState("");

  // Track current page and exhaustion per "session" (query)
  const pageRef = useRef(0);
  const isExhaustedRef = useRef(false);

  // Reset state when search changes
  const resetState = useCallback(() => {
    setUsers([]);
    pageRef.current = 0;
    isExhaustedRef.current = false;
  }, []);

  const fetchNextPage = useCallback(async () => {
    if (isExhaustedRef.current) return;

    setIsLoading(true);
    try {
      const request = container.get<GetUsersAdminListRequest>(
        TYPES.GetUsersAdminListRequest,
      );
      const data = await request.execute({
        page: pageRef.current,
        email: emailQuery,
      });

      if (!data || data.length < PAGE_SIZE) {
        isExhaustedRef.current = true;
      }

      setUsers((prev) => (pageRef.current === 0 ? data : [...prev, ...data]));
      pageRef.current += 1;
    } catch (e) {
      console.error("Users load error:", e);
      throw e; // re-throw so usePagination can handle 401
    } finally {
      setIsLoading(false);
    }
  }, [emailQuery]);

  // Sentinel ref — when this element enters the viewport, fetch next page
  const sentinelRef = usePagination<void, HTMLDivElement>(fetchNextPage, {
    threshold: 0.1,
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      resetState();
      setEmailQuery(value);
    },
    [resetState],
  );

  const handleRoleChange = async (
    userId: string,
    newRole: RoleEnum,
    oldRole: RoleEnum,
  ) => {
    setUpdatingId(userId);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
    );

    try {
      const request = container.get<UpdateUserRoleRequest>(
        TYPES.UpdateUserRoleRequest,
      );
      await request.execute({ userId, role: newRole });
    } catch (e) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: oldRole } : u)),
      );
      alert("Error updating role");
    } finally {
      setUpdatingId(null);
    }
  };

  const columns: ColumnDef<IUserForAdminList>[] = [
    {
      key: "avatar",
      header: "User",
      align: "center",
      className: "w-16",
      cell: (user) => (
        <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] overflow-hidden ring-1 ring-white/10">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-medium text-white/50">
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
        <span className="font-medium text-white/90">{user.email}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      align: "right",
      cell: (user) => (
        <div className="inline-flex items-center gap-2">
          {updatingId === user.id && (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          )}
          <select
            value={user.role}
            disabled={updatingId === user.id}
            className={cn(
              "h-9 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/90 outline-none transition-all",
              "hover:bg-white/[0.08] hover:border-white/20",
              "focus:border-white/30 focus:ring-2 focus:ring-white/10",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "appearance-none pr-8 cursor-pointer",
              "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.4)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.6rem_center] bg-no-repeat",
            )}
            onChange={(e) =>
              handleRoleChange(user.id, e.target.value as RoleEnum, user.role)
            }
          >
            {Object.values(RoleEnum).map((r) => (
              <option key={r} value={r} className="bg-neutral-900 text-white">
                {r}
              </option>
            ))}
          </select>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
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
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-white/50 pointer-events-none" />
          <InputWithDebounce
            debounceCallback={handleSearchChange}
            debounceMs={400}
            placeholder="Search by email..."
            value={emailQuery}
            className="pl-9 pr-9 w-full sm:w-72"
          />
          {emailQuery && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={users}
        isLoading={isLoading && users.length === 0}
        emptyMessage="No users found"
      />

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-4" aria-hidden="true">
        {isLoading && users.length > 0 && (
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
            <span className="text-sm text-white/40">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
}
