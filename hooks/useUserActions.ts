import { useCallback } from "react";
import {
  useActivateUsersMutation,
  useDeactivateUsersMutation,
} from "@/services/user/userApi";
import { toast } from "sonner";

export default function useUserActions() {
  const [activateMutate, { isLoading: isActivating }] = useActivateUsersMutation();
  const [deactivateMutate, { isLoading: isDeactivating }] = useDeactivateUsersMutation();

  const activateUsers = useCallback(async (userIds: number[]) => {
    if (!userIds.length) {
      toast.error("Vui lòng chọn ít nhất một người dùng để kích hoạt.");
      return;
    }
    try {
      await activateMutate(userIds).unwrap();
      toast.success("Kích hoạt người dùng thành công.");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi kích hoạt người dùng. Vui lòng thử lại sau.");
    }
  }, [activateMutate]);

  const deactivateUsers = useCallback(async (userIds: number[]) => {
    if (!userIds.length) {
      toast.error("Vui lòng chọn ít nhất một người dùng để vô hiệu hóa.");
      return;
    }
    try {
      await deactivateMutate(userIds).unwrap();
      toast.success("Vô hiệu hóa người dùng thành công.");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi vô hiệu hóa người dùng. Vui lòng thử lại sau.");
    }
  }, [deactivateMutate]);

  return {
    activateUsers,
    deactivateUsers,
    isActivating,
    isDeactivating,
  };
}