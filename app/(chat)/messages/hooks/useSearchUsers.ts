import { useState, useEffect } from "react";
import { useDebounce } from "@/components/ui/MultipleSelector";
import { useLazySearchUsersQuery } from "@/services/user/userApi";
import { useUser } from "@/hooks/useUser";

export function useSearchUsers() {
  const { user: currentUser } = useUser();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  const [trigger, { data, isLoading, isFetching, isError }] = useLazySearchUsersQuery();

  useEffect(() => {
    if (debouncedKeyword.length >= 2) {
      trigger(debouncedKeyword);
    }
  }, [debouncedKeyword, trigger]);

  const users = data?.data?.result.filter(u => u.accountId !== currentUser?.accountId) || [];
  const shouldShowResults = debouncedKeyword.length >= 2;
  const isEmpty = !isFetching && !isError && shouldShowResults && !isLoading && users.length === 0;

  return {
    keyword,
    setKeyword,
    users,
    isLoading: isLoading || isFetching,
    isError,
    isEmpty,
    shouldShowResults
  };
}