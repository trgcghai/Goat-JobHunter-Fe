import { UserPopup } from "@/app/(main)/components";

export function AIChatHeader() {
  return (
    <header className="h-14 border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-primary">Goat AI</h1>

      <div className="flex items-center gap-3">
        <UserPopup />
      </div>
    </header>
  );
}