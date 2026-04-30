"use client";

import { useEffect, useState, useCallback, SetStateAction } from "react";
import container from "@/core/Container";
import { TYPES } from "@/core/Container.types";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { IUserForAdminList } from "@/core/domain/entity/IUserForAdminList";
import { GetUsersAdminListRequest } from "@/core/requests/network/Competion/GetUsersAdminList";
import { UpdateUserRoleRequest } from "@/core/requests/network/UpdateUserRole";
import InputWithDebounce from "@/ui/component/inputs/InputWithDebounce";
const PAGE_SIZE = 20;

export default function Page() {
  const [users, setUsers] = useState<IUserForAdminList[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [emailQuery, setEmailQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadUsers = useCallback(async (targetPage: number, search: string) => {
    setIsLoaded(false);
    try {
      const request = container.get<GetUsersAdminListRequest>(
        TYPES.GetUsersAdminListRequest,
      );
      const data = await request.execute({ page: targetPage, email: search });

      setUsers(data);
      setIsLoaded(true);
    } catch (e) {
      console.error("Users load error:", e);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadUsers(page, emailQuery);
  }, [page, emailQuery, loadUsers]);

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

  return (
    <div className="text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Users</h1>
        {}
        <InputWithDebounce
          debounceCallback={(ev) => {
            setEmailQuery(ev.target.value);
            setPage(0);
          }}
          placeholder="Search by email..."
          value={emailQuery}
          className="bg-gray-800 border border-gray-700 p-2 rounded text-sm w-64 outline-none focus:border-blue-500"
        />
      </div>

      <table className="w-full border border-gray-700 text-sm">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border border-gray-700">Avatar</th>
            <th className="p-2 border border-gray-700">Email</th>
            <th className="p-2 border border-gray-700 text-right">Role</th>
          </tr>
        </thead>
        <tbody>
          {!isLoaded ? (
            <tr>
              <td colSpan={3} className="text-center p-10">
                Loading...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-10 text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-900 transition-colors">
                <td className="p-2 border border-gray-700 w-16 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 mx-auto overflow-hidden">
                    {user.avatarUrl && (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="p-2 border border-gray-700">{user.email}</td>
                <td className="p-2 border border-gray-700 text-right">
                  <select
                    value={user.role}
                    disabled={updatingId === user.id}
                    className="bg-gray-800 border border-gray-600 rounded px-2 py-1 outline-none cursor-pointer disabled:opacity-50"
                    onChange={(e) =>
                      handleRoleChange(
                        user.id,
                        e.target.value as RoleEnum,
                        user.role,
                      )
                    }
                  >
                    {Object.values(RoleEnum).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 0 || !isLoaded}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-30"
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="text-gray-400">Page {page + 1}</span>
        <button
          disabled={users.length < PAGE_SIZE || !isLoaded}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-30"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
