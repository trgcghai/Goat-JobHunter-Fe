"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { UserFilterType } from "../hooks/useUsersManagement";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { ROLE_LIST } from "@/constants/constant";

interface UserFilterProps {
  filters: UserFilterType;
  onFilterChange: (filters: Partial<UserFilterType>) => void;
  onResetFilters: () => void;
}

export function UserFilter({
                             filters,
                             onFilterChange,
                             onResetFilters
                           }: UserFilterProps) {
  const [email, setEmail] = useState(filters.email || "");
  const [phone, setPhone] = useState(filters.phone || "");

  // Debounce search for email
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedEmailSearch = useCallback(
    debounce((value: string) => {
      onFilterChange({ email: value });
    }, 500),
    []
  );

  // Debounce search for phone
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPhoneSearch = useCallback(
    debounce((value: string) => {
      onFilterChange({ phone: value });
    }, 500),
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    debouncedEmailSearch(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    debouncedPhoneSearch(value);
  };

  // Sync local state with filters prop
  useEffect(() => {
    if (filters.email !== email) setEmail(filters.email || "");
    if (filters.phone !== phone) setPhone(filters.phone || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.email, filters.phone]);

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo email..."
            className="pl-9 rounded-xl"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo SĐT..."
            className="pl-9 rounded-xl"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>

        <Select
          value={filters.role || "all"}
          onValueChange={(value) =>
            onFilterChange({ role: value == "all" ? undefined : value })
          }
        >
          <SelectTrigger className="rounded-xl w-full">
            <SelectValue placeholder="Vai trò..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            {ROLE_LIST.map(role => {
              return <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
            })}
          </SelectContent>
        </Select>

        <Select
          value={
            filters.enabled === undefined ? "all" : filters.enabled.toString()
          }
          onValueChange={(value) =>
            onFilterChange({
              enabled: value === "all" ? undefined : value == "true"
            })
          }
        >
          <SelectTrigger className="rounded-xl w-full">
            <SelectValue placeholder="Trạng thái..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="true">Đã kích hoạt</SelectItem>
            <SelectItem value="false">Chưa kích hoạt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button
          variant="destructive"
          className="rounded-xl"
          onClick={() => {
            setEmail("");
            setPhone("");
            onResetFilters();
          }}
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
}