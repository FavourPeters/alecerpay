"use client";

import { Plus } from "lucide-react";

export default function AddWalletCard({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative flex h-full min-w-[320px] flex-col items-center justify-center rounded-2xl",
        "bg-[#EAF4FF] p-6 text-primary",
        "border-2 border-dashed border-primary/40",
        "outline-none transition hover:brightness-[0.97] active:scale-[0.99]",
      ].join(" ")}
      aria-label="Add wallet"
    >
      <Plus className="h-8 w-8" />
      <div className="mt-4 text-sm font-semibold">Add Wallet</div>
    </button>
  );
}
