import container, { TYPES } from "@/core/Container";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { GetUsersAdminListRequest } from "@/core/requests/network/GetUsersAdminList.request";
import { UpdateUserRoleRequest } from "@/core/requests/network/UpdateUserRole.request";
import { AdminUsersListState } from "@/state/AdminUserState";

export function useAdminUserList() {
  const store = container.get<AdminUsersListState>(TYPES.AdminUsersListState);
  const request = container.get<GetUsersAdminListRequest>(
    TYPES.GetUsersAdminListRequest,
  );
  const updateRole = container.get<UpdateUserRoleRequest>(
    TYPES.UpdateUserRoleRequest,
  );

  return {
    async fetchNext(page: number) {
      await request.execute({ page, email: store.email });
    },
    get filter() {
      return store.email;
    },
    async setFilter(_new: string) {
      store.clear();
      store.setEmail(_new);
    },
    async changeRole(role: RoleEnum, userId: string) {
      await updateRole
        .execute({ role, userId })
        .then(() => store.changeUserRole(userId, role));
    },
    get users() {
      return store.users;
    },
  };
}
