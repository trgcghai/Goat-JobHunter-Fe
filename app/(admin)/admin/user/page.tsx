import UsersTable from "@/app/(admin)/admin/user/UsersTable";

const AdminUserPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Quản lý người dùng
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Quản lý tất cả người dùng trong hệ thống
          </p>
        </div>
      </div>
      <UsersTable />
    </div>
  );
};

export default AdminUserPage;
