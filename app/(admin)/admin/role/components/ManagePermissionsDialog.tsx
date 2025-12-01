"use client";
import type { Role } from "@/types/model";
import { useFetchPermissionsQuery } from "@/services/permission/permissionApi";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoaderSpin from "@/components/common/LoaderSpin";
import { useMemo } from "react";
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
import useManagePermissions from "@/app/(admin)/admin/role/hooks/useManagementPermissions";

interface ManagementPermissionDialogProps {
  role: Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManagePermissionsDialog({ role, open, onOpenChange }: ManagementPermissionDialogProps) {
  const { data, isLoading, isError } = useFetchPermissionsQuery({ size: 120 });
  const permissions = useMemo(() => data?.data?.result || [], [data]);

  const {
    modules,
    added,
    removed,
    hasPermission,
    togglePermission,
    handleSave,
    isUpdating
  } = useManagePermissions(role, permissions, open);

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