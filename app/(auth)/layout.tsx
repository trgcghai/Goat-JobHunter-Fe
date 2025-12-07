const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center p-4 bg-primary/5">
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
};

export default AuthLayout;
