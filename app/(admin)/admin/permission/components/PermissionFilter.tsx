"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { PermissionFilters } from "@/app/(admin)/admin/permission/hooks/usePermissionManagement";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { debounce } from "lodash";

interface PermissionFilterProps {
  filters: PermissionFilters;
  onFilterChange: (filters: Partial<PermissionFilters>) => void;
  onResetFilters: () => void;
}

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function PermissionFilter({ filters, onFilterChange, onResetFilters }: PermissionFilterProps) {
  const [moduleInput, setModuleInput] = useState(filters.module || "");
  const [method, setMethod] = useState(filters.method || "");
  const [nameInput, setNameInput] = useState(filters.name || "");

  // keep local state in sync when parent filters change
  useEffect(() => setModuleInput(filters.module || ""), [filters.module]);
  useEffect(() => setMethod(filters.method || ""), [filters.method]);
  useEffect(() => setNameInput(filters.name || ""), [filters.name]);

  // debounce updating the parent for module input
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedModule = useCallback(
    debounce((value: string) => {
      onFilterChange({ module: value });
    }, 700),
    [onFilterChange],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deboucedName = useCallback(
    debounce((value: string) => {
      onFilterChange({ name: value });
    }, 700),
    [onFilterChange],
  );

  useEffect(() => {
    return () => {
      debouncedModule.cancel();
    };
  }, [debouncedModule]);

  useEffect(() => {
    return () => {
      deboucedName.cancel();
    }
  }, [deboucedName]);

  const handleModuleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setModuleInput(value);
    debouncedModule(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameInput(value);
    deboucedName(value);
  }

  const handleMethodChange = (v: string) => {
    const newMethod = v === "all" ? "" : v;
    setMethod(newMethod);
    onFilterChange({ method: newMethod });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Input
            placeholder="Nhập tên quyền..."
            value={nameInput}
            onChange={handleNameChange}
            className="rounded-xl"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Input
            placeholder="Nhập tên module..."
            value={moduleInput}
            onChange={handleModuleChange}
            className="rounded-xl"
          />
        </div>

        <div>
          <Select value={method || "all"} onValueChange={handleMethodChange}>
            <SelectTrigger className="rounded-xl w-full">
              <SelectValue placeholder="Chọn method..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả methods</SelectItem>
              {METHODS.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant={"destructive"}
          className="rounded-xl"
          onClick={() => {
            setModuleInput("");
            setMethod("");
            debouncedModule.cancel();
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