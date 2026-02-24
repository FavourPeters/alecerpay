"use client";

import { LucideIcon } from "lucide-react";

export type ActionTileItem = {
  icon: LucideIcon;
  label: string;
};

export default function ActionTile({ item }: { item: ActionTileItem }) {
  const Icon = item.icon;

  return (
    <button
      className={[
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-primary bg-white px-4 py-4",
        "text-sm font-semibold text-primary shadow-sm transition",
        "hover:bg-blue-50 active:scale-[0.99]",
      ].join(" ")}
    >
      <Icon className="h-4 w-4" />
      {item.label}
    </button>
  );
}
