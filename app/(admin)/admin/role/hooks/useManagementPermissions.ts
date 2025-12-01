import { useEffect, useMemo, useState } from "react";
import type { Permission, Role } from "@/types/model";
import useRoleAndPermissionActions from "@/hooks/useRoleAndPermissionActions";

interface ModuleGroup {
  permissions: Permission[];
  total: number;
  has: number;
}

export default function useManagePermissions(
  role: Role | undefined,
  permissions: Permission[] = [],
  open = false
) {
  const { handleUpdateRole, isUpdating } = useRoleAndPermissionActions();

  const modules = useMemo(() => {
    const mods: Record<string, ModuleGroup> = {};
    permissions.forEach((per) => {
      const moduleName = per.module || "Chung";
      if (!mods[moduleName]) {
        mods[moduleName] = { permissions: [], total: 0, has: 0 };
      }
      mods[moduleName].permissions.push(per);
      mods[moduleName].total += 1;
      mods[moduleName].has += (role?.permissions?.some(rp => rp.permissionId === per.permissionId) ? 1 : 0);
    });
    return mods;
  }, [permissions, role?.permissions]);

  const initialPermissions = useMemo(() => role?.permissions || [], [role?.permissions]);
  const [current, setCurrent] = useState<Permission[]>(initialPermissions);

  useEffect(() => {
    if (open) {
      // reset current to role permissions when dialog opens or role changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(initialPermissions);
    }
  }, [open, initialPermissions]);

  const { added, removed } = useMemo(() => {
    const initialIds = new Set(initialPermissions.map(p => p.permissionId));
    const currentIds = new Set(current.map(p => p.permissionId));

    const addedList = current.filter(p => !initialIds.has(p.permissionId));
    const removedList = initialPermissions.filter(p => !currentIds.has(p.permissionId));

    return { added: addedList, removed: removedList };
  }, [current, initialPermissions]);

  const hasPermission = (id: number) => current.some(p => p.permissionId === id);

  const togglePermission = (per: Permission) => {
    setCurrent(prev => {
      const exists = prev.some(p => p.permissionId === per.permissionId);
      if (exists) return prev.filter(p => p.permissionId !== per.permissionId);
      return [...prev, per];
    });
  };

  const handleSave = async () => {
    if (!role) return;
    const updatedRole: Role = { ...role, permissions: current };
    await handleUpdateRole(updatedRole);
  };

  return {
    modules,
    current,
    added,
    removed,
    hasPermission,
    togglePermission,
    handleSave,
    isUpdating,
  };
}