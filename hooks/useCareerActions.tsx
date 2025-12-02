import {
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation
} from "@/services/career/careerApi";
import type { CreateCareerRequest, UpdateCareerRequest } from "@/services/career/careerType";
import { toast } from "sonner";

export default function useCareerActions() {
  const [createCareer, { isLoading: isCreating }] = useCreateCareerMutation();
  const [updateCareer, { isLoading: isUpdating }] = useUpdateCareerMutation();
  const [deleteCareer, { isLoading: isDeleting }] = useDeleteCareerMutation();

  const handleCreateCareer = async (data: CreateCareerRequest) => {
    try {
      const result = await createCareer(data).unwrap();
      if (result.statusCode === 201) {
        toast.success("Tạo ngành nghề thành công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo ngành nghề. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleUpdateCareer = async (data: UpdateCareerRequest) => {
    try {
      const result = await updateCareer(data).unwrap();
      if (result.statusCode === 200) {
        toast.success("Cập nhật ngành nghề thành công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật ngành nghề. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleDeleteCareer = async (careerId: string) => {
    try {
      const result = await deleteCareer(careerId).unwrap();
      if (result.statusCode === 200) {
        toast.success("Xóa ngành nghề thành công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa ngành nghề. Vui lòng thử lại.");
      console.error(error);
    }
  };

  return {
    handleCreateCareer,
    handleUpdateCareer,
    handleDeleteCareer,
    isCreating,
    isUpdating,
    isDeleting
  };
}