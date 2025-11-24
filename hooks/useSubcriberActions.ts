import {
  useCreateSubscriberMutation,
  useDeleteSubscriberMutation,
  useUpdateSubscriberMutation,
} from "@/services/subcriber/subcriberApi";
import { Skill, Subscriber } from "@/types/model";
import { useCallback } from "react";
import { toast } from "sonner";

const useSubscriberActions = () => {
  const [createSubscriber, { isLoading: isCreating }] =
    useCreateSubscriberMutation();
  const [updateSubscriber, { isLoading: isUpdating }] =
    useUpdateSubscriberMutation();
  const [deleteSubscriber, { isLoading: isDeleting }] =
    useDeleteSubscriberMutation();

  // Create new subscriber
  const handleCreateSubscriber = useCallback(
    async (data: { name: string; email: string; skills: Skill[] }) => {
      try {
        const subscriberData: Subscriber = {
          subscriberId: 0,
          name: data.name,
          email: data.email,
          skills: data.skills,
        };

        const response = await createSubscriber(subscriberData).unwrap();

        if (response.data) {
          toast.success("Tạo đăng ký thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to create subscriber:", error);
        toast.error("Không thể đăng ký. Vui lòng thử lại sau");
        throw error;
      }
    },
    [createSubscriber],
  );

  // Update existing subscriber
  const handleUpdateSubscriber = useCallback(
    async (data: Subscriber) => {
      try {
        const response = await updateSubscriber(data).unwrap();

        if (response.data) {
          toast.success("Cập nhật đăng ký thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to update subscriber:", error);
        toast.error("Không thể cập nhật đăng ký. Vui lòng thử lại sau");
        throw error;
      }
    },
    [updateSubscriber],
  );

  // Add skills to existing subscriber
  const handleAddSkills = useCallback(
    async (subscriberData: Subscriber, newSkills: Skill[]) => {
      try {
        const uniqueSkills = [
          ...new Set([...subscriberData.skills, ...newSkills]),
        ].slice(0, 5);

        const updatedSubscriber: Subscriber = {
          ...subscriberData,
          skills: uniqueSkills,
        };

        const response = await updateSubscriber(updatedSubscriber).unwrap();

        if (response.data) {
          toast.success("Thêm kỹ năng thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to add skills:", error);
        toast.error("Không thể đăng ký thêm kỹ năng. Vui lòng thử lại sau");
        throw error;
      }
    },
    [updateSubscriber],
  );

  // Remove skill from subscriber
  const handleRemoveSkill = useCallback(
    async (subscriberData: Subscriber, skillToRemove: Skill) => {
      try {
        const updatedSkills = subscriberData.skills.filter(
          (skill) => skill.skillId !== skillToRemove.skillId,
        );

        const updatedSubscriber: Subscriber = {
          ...subscriberData,
          skills: updatedSkills,
        };

        const response = await updateSubscriber(updatedSubscriber).unwrap();

        if (response.data) {
          toast.success("Xóa kỹ năng thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to remove skill:", error);
        toast.error("Không thể xóa kỹ năng. Vui lòng thử lại sau");
        throw error;
      }
    },
    [updateSubscriber],
  );

  // Delete subscriber completely
  const handleDeleteSubscriber = useCallback(
    async (subscriberId: string) => {
      try {
        const response = await deleteSubscriber(subscriberId).unwrap();

        if (response.data) {
          toast.success("Xóa đăng ký thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to delete subscriber:", error);
        toast.error("Không thể xóa đăng ký kỹ năng. Vui lòng thử lại sau");
        throw error;
      }
    },
    [deleteSubscriber],
  );

  // Replace all skills (overwrite)
  const handleReplaceSkills = useCallback(
    async (subscriberData: Subscriber, newSkills: Skill[]) => {
      try {
        if (newSkills.length > 5) {
          toast.error("Vượt quá giới hạn", {
            description: "Chỉ được đăng ký tối đa 5 kỹ năng",
          });
          return;
        }

        const updatedSubscriber: Subscriber = {
          ...subscriberData,
          skills: newSkills,
        };

        const response = await updateSubscriber(updatedSubscriber).unwrap();

        if (response.data) {
          toast.success("Cập nhật kỹ năng thành công!");
          return response.data;
        }
      } catch (error) {
        console.error("Failed to replace skills:", error);
        toast.error("Không thể cập nhật đăng ký kỹ năng. Vui lòng thử lại sau");
        throw error;
      }
    },
    [updateSubscriber],
  );

  return {
    // Mutation states
    isCreating,
    isUpdating,
    isDeleting,
    isLoading: isCreating || isUpdating || isDeleting,

    // Actions
    handleCreateSubscriber,
    handleUpdateSubscriber,
    handleAddSkills,
    handleRemoveSkill,
    handleDeleteSubscriber,
    handleReplaceSkills,
  };
};

export default useSubscriberActions;
