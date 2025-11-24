import { Option } from "@/components/ui/MultipleSelector";
import useSubscriberActions from "@/hooks/useSubcriberActions";
import { useGetSkillsQuery } from "@/services/skill/skillApi";
import { useGetCurrentUserSubscriberSkillsQuery } from "@/services/subcriber/subcriberApi";
import { Skill } from "@/types/model";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

const useSkillSubcription = () => {
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  // Fetch subscriber skills
  const {
    data: subscriberResponse,
    isLoading: isLoadingSubscriber,
    isError: isErrorSubscriber,
    refetch: refetchSubscriber,
  } = useGetCurrentUserSubscriberSkillsQuery();

  // Fetch skills from API (only when user types)
  const { data: skillsData, isFetching: isFetchingSkills } = useGetSkillsQuery(
    {
      page: 1,
      size: 20,
      name: debouncedInputValue,
    },
    {
      skip: !debouncedInputValue || debouncedInputValue.length < 2,
    },
  );

  // Use subscriber actions hook
  const {
    isLoading: isUpdatingSubscriber,
    handleAddSkills,
    handleRemoveSkill,
  } = useSubscriberActions();

  const subscriberData = subscriberResponse?.data;

  // Get subscribed skills
  const subscribedSkills = useMemo(
    () => subscriberData?.skills || [],
    [subscriberData],
  );

  // Convert API skills to options and filter out subscribed ones
  const skillOptions = useMemo<Option[]>(() => {
    if (!debouncedInputValue || debouncedInputValue.length < 2) return [];

    if (!skillsData?.data?.result) return [];

    return skillsData.data.result
      .filter(
        (skill) =>
          !subscribedSkills.map((s) => s.skillId).includes(skill.skillId),
      )
      .map((skill) => ({
        label: skill.name,
        value: skill.skillId,
      }));
  }, [skillsData, subscribedSkills, debouncedInputValue]);

  // Calculate total skills (subscribed + selected)
  const totalSkillsCount = subscribedSkills.length + selectedSkills.length;

  // Debounced function to update search query
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedInputValue(value);
    }, 500),
    [],
  );

  // Handle input value change
  const handleInputValueChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  // Handle create subscription
  const handleCreateSubscription = async () => {
    if (!subscriberData) {
      toast.error("Không tìm thấy thông tin đăng ký");
      return;
    }

    if (selectedSkills.length === 0) {
      toast.error("Vui lòng chọn ít nhất một kỹ năng");
      return;
    }

    try {
      const newSkills: Skill[] = selectedSkills.map((skill) => ({
        skillId: skill.value,
        name: skill.label,
      }));

      console.log("Selected skills:", selectedSkills);
      console.log("New skills:", newSkills);

      await handleAddSkills(subscriberData, newSkills);

      // Clear selection and refetch
      setSelectedSkills([]);
      setInputValue("");
      setDebouncedInputValue("");
      refetchSubscriber();
    } catch (error) {
      // Error already handled in hook
      console.error("Failed to create subscription:", error);
    }
  };

  // Handle unsubscribe
  const handleDeleteSubscription = async (skill: Skill) => {
    if (!subscriberData) {
      toast.error("Không tìm thấy thông tin đăng ký");
      return;
    }

    console.log("Remove subscription for skill:", skill);

    try {
      await handleRemoveSkill(subscriberData, skill);
      refetchSubscriber();
    } catch (error) {
      // Error already handled in hook
      console.error("Failed to delete subscription:", error);
    }
  };

  // Check max limit when selecting
  const handleSkillChange = (newSkills: Option[]) => {
    const newTotalCount = subscribedSkills.length + newSkills.length;

    if (newTotalCount > 5) {
      toast.error("Tối đa 5 kỹ năng", {
        description: `Bạn đã đăng ký ${subscribedSkills.length} kỹ năng. Chỉ có thể thêm ${5 - subscribedSkills.length} kỹ năng nữa`,
      });
      return;
    }

    setSelectedSkills(newSkills);
  };

  return {
    selectedSkills,
    setSelectedSkills,
    refetchSubscriber,
    inputValue,
    handleInputValueChange,
    skillOptions,
    isFetchingSkills,
    subscribedSkills,
    isLoadingSubscriber,
    isUpdatingSubscriber,
    isErrorSubscriber,
    totalSkillsCount,
    handleSkillChange,
    handleCreateSubscription,
    handleDeleteSubscription,
  };
};

export default useSkillSubcription;
