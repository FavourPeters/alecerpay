"use client";

import { Bell, Menu } from "lucide-react";

export default function Topbar({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <button
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={onOpenSidebar}
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>

        <div className="hidden lg:block" />

        <div className="flex items-center gap-4">
          <button className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/kabeeb.jpg"
              alt="User Avatar"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">
                Joy Keleb
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
