"use client";
import type { Permission, Role } from "@/types/model";
import { useFetchPermissionsQuery } from "@/services/permission/permissionApi";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import { capitalize } from "lodash";
import useRoleAndPermissionActions from "@/hooks/useRoleAndPermissionActions";

interface ManagementPermissionDialogProps {
  role: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManagePermissionsDialog({ role, open, onOpenChange }: ManagementPermissionDialogProps) {
  const { data, isLoading, isError } = useFetchPermissionsQuery({
    size: 120
  });
  const { handleUpdateRole, isUpdating } = useRoleAndPermissionActions();
  const permissions = useMemo(() => data?.data?.result || [], [data]);

  const modules = useMemo(() => {
    const mods: Record<string, { permissions: Permission[], total: number, has: number }> = {};
    permissions.forEach((per) => {
      const moduleName = per.module || "Chung";
      if (!mods[moduleName]) {
        mods[moduleName] = {
          permissions: [],
          total: 0,
          has: 0
        };
      }
      mods[moduleName] = {
        permissions: [...mods[moduleName].permissions, per],
        total: mods[moduleName].total + 1,
        has: mods[moduleName].has + (role.permissions?.some(rp => rp.permissionId === per.permissionId) ? 1 : 0)
      };
    });
    return mods;
  }, [permissions, role.permissions]);

  // Lấy danh sách quyền gốc của role khi dialog mở
  const initialPermissions = useMemo(() => role.permissions || [], [role.permissions]);
  const [current, setCurrent] = useState<Permission[]>(initialPermissions);

  // Reset lại khi dialog mở hoặc role thay đổi
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(initialPermissions);
    }
  }, [open, initialPermissions]);

  const { added, removed } = useMemo(() => {
    const addedSet = new Set<number>();
    const removedSet = new Set<number>();

    const initialIds = new Set(initialPermissions.map(p => p.permissionId));
    const currentIds = new Set(current.map(p => p.permissionId));

    // Những cái có trong current nhưng không có trong initial → cho vào added
    current.forEach(p => {
      if (!initialIds.has(p.permissionId)) {
        addedSet.add(p.permissionId);
      }
    });

    // Những cái có trong initial nhưng không còn trong current → cho vào removed
    initialPermissions.forEach(p => {
      if (!currentIds.has(p.permissionId)) {
        removedSet.add(p.permissionId);
      }
    });

    return {
      added: current.filter(p => addedSet.has(p.permissionId)),
      removed: initialPermissions.filter(p => removedSet.has(p.permissionId))
    };
  }, [current, initialPermissions]);

  const hasPermission = (id: number) =>
    current.some(p => p.permissionId === id);

  const togglePermission = (per: Permission) => {
    setCurrent(prev => {
      const exists = prev.some(p => p.permissionId === per.permissionId);
      if (exists) {
        return prev.filter(p => p.permissionId !== per.permissionId);
      } else {
        return [...prev, per];
      }
    });
  };

  const handleSave = async () => {
    if (!role) return;

    const updatedRole: Role = {
      ...role,
      permissions: current
    };

    console.log(updatedRole);

    try {
      await handleUpdateRole(updatedRole);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl max-w-7xl!">
        <DialogHeader>
          <DialogTitle>Quản lý quyền cho: {role.name || "-"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mb-4">
          <div>
            <h3 className="font-semibold">Quyền được thêm:</h3>
            {added.length === 0 ? (
              <p className="text-muted-foreground text-sm">Không có</p>
            ) : (
              <ul className="list-disc ml-5">
                {added.map((p) => (
                  <li key={p.permissionId}>
                    {p.name} — {p.method} {p.apiPath}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="font-semibold">Quyền bị bỏ:</h3>
            {removed.length === 0 ? (
              <p className="text-muted-foreground text-sm">Không có</p>
            ) : (
              <ul className="list-disc ml-5">
                {removed.map((p) => (
                  <li key={p.permissionId}>
                    {p.name} — {p.method} {p.apiPath}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {isError && <ErrorMessage message={"Có lỗi xảy ra khi tải quyền."} />}

        {isLoading && <LoaderSpin />}

        <ScrollArea className={"h-[500px] pr-4"}>
          <Accordion type="single" collapsible className="space-y-2">
            {Object.entries(modules).map(([moduleName, perms]) => (
              <AccordionItem key={moduleName} value={moduleName} className="rounded-xl border">
                <AccordionTrigger className="px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2 font-semibold">
                    <div className="text-lg">{capitalize(moduleName)}</div>
                    <div className="text-sm text-muted-foreground">({perms.has}/{perms.total})</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {perms.permissions.map((per) => (
                      <div
                        key={per.permissionId}
                        className="p-3 border rounded-xl flex items-center justify-between"
                      >
                        <div className="flex flex-col pr-4">
                          <Label className="font-medium">{per.name}</Label>
                          <span className="text-sm text-muted-foreground">
                            {per.method} — {per.apiPath}
                          </span>
                        </div>

                        <Switch
                          checked={hasPermission(per.permissionId)}
                          onCheckedChange={() => togglePermission(per)}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {Object.keys(modules).length === 0 && !isLoading && (
              <div className="p-4 text-sm text-muted-foreground">Không có quyền nào để hiển thị.</div>
            )}
          </Accordion>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={handleSave} className="rounded-xl">
            {isUpdating ?
              <>
                <LoaderSpin />
                Đang cập nhật...
              </>
              :
              "Xác nhận"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}