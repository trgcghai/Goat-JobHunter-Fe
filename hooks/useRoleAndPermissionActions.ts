import {
  useActivateRoleMutation,
  useCreateRoleMutation,
  useDeactivateRoleMutation,
  useDeleteRoleMutation, useUpdateRoleMutation
} from "@/services/role/roleApi";
import { RoleFormValues } from "@/app/(admin)/admin/role/components/CreateRoleDialog";
import { toast } from "sonner";
import { Role } from "@/types/model";

const UseRoleAndPermissionActions = () => {
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  const [activateRole, { isLoading: isActivating }] = useActivateRoleMutation();
  const [deactivateRole, { isLoading: isDeactivating }] = useDeactivateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();


  const handleCreateRole = async (data: RoleFormValues) => {
    try {
      await createRole(data).unwrap();
      toast.success("Tạo vai trò thành công.");
    } catch (e) {
      console.error(e);
      toast.error("Đã có lỗi xảy ra khi tạo vai trò. Vui lòng thử lại.");
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    try {
      await deleteRole(roleId).unwrap();
      toast.success("Xóa vai trò thành công.");
    } catch (e) {
      console.error(e);
      toast.error("Đã có lỗi xảy ra khi xóa vai trò. Vui lòng thử lại.");
    }
  };

  const handleActivateRole = async (roleId: number) => {
    try {
      await activateRole(roleId).unwrap();
      toast.success("Kích hoạt vai trò thành công.");
    } catch (e) {
      console.error(e);
      toast.error("Đã có lỗi khi kích hoạt vai trò. Vui lòng thử lại.");
    }
  };

  const handleDeactivateRole = async (roleId: number) => {
    try {
      await deactivateRole(roleId).unwrap();
      toast.success("Vô hiệu hóa vai trò thành công.");
    } catch (e) {
      console.error(e);
      toast.error("Đã có lỗi khi vô hiệu hóa vai trò. Vui lòng thử lại.");
    }
  };

  const handleUpdateRole = async (updatedRole: Role) => {
    try {
      await updateRole(updatedRole).unwrap();
      toast.success("Cập nhật vai trò thành công.");
    } catch (e) {
      console.error(e);
      toast.error("Đã có lỗi khi cập nhật vai trò. Vui lòng thử lại.");
    }
  }

  return {
    handleCreateRole,
    handleDeleteRole,
    handleActivateRole,
    handleDeactivateRole,
    handleUpdateRole,

    isCreating,
    isDeleting,
    isActivating,
    isDeactivating,
    isUpdating
  };
};
export default UseRoleAndPermissionActions;
