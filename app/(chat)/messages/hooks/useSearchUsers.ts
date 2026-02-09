import { useState, useEffect } from "react";
import { useDebounce } from "@/components/ui/MultipleSelector";
import { useLazySearchUsersQuery } from "@/services/user/userApi";
import { useUser } from "@/hooks/useUser";

interface UseSearchUsersOptions {
  minLength?: number;
  debounceMs?: number;
}

export function useSearchUsers(options: UseSearchUsersOptions = {}) {
  const { minLength = 2, debounceMs = 500 } = options;
  const { user: currentUser } = useUser();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, debounceMs);

  const [trigger, { data, isLoading, isFetching, isError }] = useLazySearchUsersQuery();

  useEffect(() => {
    if (debouncedKeyword.length >= minLength) {
      trigger(debouncedKeyword);
    }
  }, [debouncedKeyword, trigger, minLength]);

  const users = data?.data?.result.filter(u => u.accountId !== currentUser?.accountId) || [];
  const shouldShowResults = debouncedKeyword.length >= minLength;
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