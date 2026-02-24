"use client";

import Link from "next/link";
import {
  LayoutGrid,
  Wallet,
  ArrowLeftRight,
  Navigation,
  ArrowDownToLine,
  CreditCard,
  FileText,
  BarChart2,
  Settings2,
  LogOut,
  UserSquare,
  X,
  PanelLeft,
  Building2,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
};

function SectionLabel({
  children,
  collapsed,
}: {
  children: React.ReactNode;
  collapsed: boolean;
}) {
  if (collapsed) return null;

  return (
    <div className="px-6 pt-8 pb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
      {children}
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  href = "#",
  collapsed,
}: {
  icon: any;
  label: string;
  active?: boolean;
  href?: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={[
        collapsed
          ? "mx-3 flex items-center justify-center rounded-xl p-3 transition"
          : "mx-3 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition",
        active
          ? "bg-primary text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

export default function Sidebar({
  open,
  onClose,
  collapsed,
  onToggleCollapse,
}: Props) {
  const widthClass = collapsed ? "w-[88px]" : "w-[280px]";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/20 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-screen border-r border-slate-200 bg-[#eef5ff]",
          "transition-[width,transform] duration-200 ease-in-out",
          "lg:translate-x-0",
          widthClass,
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className={[
              "flex items-center justify-between",
              collapsed ? "px-3 pt-6 pb-4" : "px-6 pt-6 pb-6",
            ].join(" ")}
          >
            {/* Logo */}
            {collapsed ? (
              <img
                src="/alecer.svg"
                alt="AlecerPay"
                className="h-8 w-8 object-contain"
                draggable={false}
              />
            ) : (
              <img
                src="/alecer.svg"
                alt="AlecerPay"
                className="h-8 w-auto"
                draggable={false}
              />
            )}

            <div className="flex items-center gap-2">
              {/*  Desktop collapse/expand */}
              <button
                type="button"
                className="hidden rounded-lg p-2 text-slate-500 hover:bg-white/60 lg:inline-flex"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                onClick={() => {
                  onToggleCollapse();
                  onClose();
                }}
              >
                <PanelLeft className="h-5 w-5" />
              </button>

              {/* Mobile close */}
              <button
                type="button"
                className="inline-flex rounded-lg p-2 text-slate-600 hover:bg-white/60 lg:hidden"
                onClick={onClose}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 overflow-y-auto">
            <SectionLabel collapsed={collapsed}>MONEY TOOLS</SectionLabel>
            <NavItem
              icon={LayoutGrid}
              label="Dashboard"
              active
              collapsed={collapsed}
            />
            <NavItem icon={Wallet} label="Wallets" collapsed={collapsed} />
            <NavItem
              icon={ArrowLeftRight}
              label="Convert"
              collapsed={collapsed}
            />
            <NavItem
              icon={Navigation}
              label="Send Money"
              collapsed={collapsed}
            />
            <NavItem
              icon={ArrowDownToLine}
              label="Receive Money"
              collapsed={collapsed}
            />
            <NavItem icon={Building2} label="Withdraw" collapsed={collapsed} />

            <SectionLabel collapsed={collapsed}>BUSINESS</SectionLabel>
            <NavItem icon={CreditCard} label="Cards" collapsed={collapsed} />
            <NavItem icon={FileText} label="Invoices" collapsed={collapsed} />

            <SectionLabel collapsed={collapsed}>SUPPORT</SectionLabel>
            <NavItem icon={BarChart2} label="Analytics" collapsed={collapsed} />
            <NavItem icon={Settings2} label="Settings" collapsed={collapsed} />
          </nav>

          {/* Bottom */}
          <div className={["pt-8 pb-8", collapsed ? "px-3" : "px-6"].join(" ")}>
            <button
              title={collapsed ? "Logout" : undefined}
              className={[
                "mb-4 inline-flex w-full items-center rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-white/60",
                collapsed ? "justify-center" : "gap-2",
              ].join(" ")}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && "Logout"}
            </button>

            {/* only render help section in expanded mode */}
            {collapsed ? null : (
              <div className="rounded-2xl bg-primary p-4 text-white shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl">
                    <UserSquare className="h-5 w-5" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold leading-4">
                      Got some questions, inquiries or
                      <br />
                      need help?
                    </p>

                    <button className="text-[11px] text-lgreen font-medium underline underline-offset-2 opacity-95 hover:opacity-100">
                      Visit AlecerPay Help Desk Here
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
