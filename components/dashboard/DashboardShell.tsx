"use client";

import { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import WalletCard, { Wallet } from "./WalletCard";
import ActionTile, { ActionTileItem } from "./ActionTile";
import TransactionsCard, { Tx } from "./TransactionsCard";
import AddWalletCard from "./AddWalletCard";
import {
  Plus,
  Repeat2,
  Send,
  FileText,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowLeftRight,
} from "lucide-react";

export default function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalShow, setGlobalShow] = useState(false);
  const [walletOverrides, setWalletOverrides] = useState<
    Record<string, boolean>
  >({});
  const [collapsed, setCollapsed] = useState(false);

  const wallets: Wallet[] = useMemo(
    () => [
      {
        id: "ngn",
        currency: "NGN",
        flagCode: "ng",
        balance: 5280.5,
        badge: { type: "kyc1", label: "KYC Level 1" },
        accountMasked: "****95403",
      },
      {
        id: "usd",
        currency: "USD",
        flagCode: "us",
        balance: 3150.0,
        badge: { type: "kyc2", label: "KYC Level 2" },
        accountMasked: "****95403",
      },
      {
        id: "gbp",
        currency: "GBP",
        flagCode: "gb",
        balance: 5280.5,
        badge: { type: "kyc2", label: "KYC Level 2" },
        accountMasked: "****95403",
      },
      {
        id: "eur",
        currency: "EUR",
        flagCode: "eu",
        balance: 4900.0,
        badge: { type: "verified", label: "Verified" },
        badgeTone: "verified",
        accountMasked: "****95403",
      },
    ],
    [],
  );

  const actions: ActionTileItem[] = useMemo(
    () => [
      { icon: Plus, label: "Add Money" },
      { icon: ArrowLeftRight, label: "Convert" },
      { icon: ArrowUpRight, label: "Send" },
      { icon: FileText, label: "Create Invoice" },
    ],
    [],
  );

  const transactions: Tx[] = useMemo(
    () => [
      {
        name: "John Smith",
        meta: "Today, 2:30 PM",
        amount: "+$250.00",
        status: "Completed",
        statusTone: "success",
        avatarTone: "mint",
        flagCode: "us",
        type: "incoming",
      },
      {
        name: "Sarah Johnson",
        meta: "Today, 11:15 AM",
        amount: "-$180.00",
        status: "Pending",
        statusTone: "warning",
        avatarTone: "sky",
        type: "convert",
      },
      {
        name: "Tech Corp Ltd",
        meta: "Yesterday, 4:45 PM",
        amount: "+€500.00",
        status: "Completed",
        statusTone: "success",
        avatarTone: "rose",
        flagCode: "ng",
        type: "outgoing",
      },
      {
        name: "Monthly Subscription",
        meta: "Dec 28, 9:00 AM",
        amount: "-£75.50",
        status: "Reversed",
        statusTone: "danger",
        avatarTone: "mint",
        flagCode: "ng",
        type: "incoming",
      },
    ],
    [],
  );

  function getOverride(walletId: string): boolean | null {
    return walletOverrides.hasOwnProperty(walletId)
      ? walletOverrides[walletId]
      : null;
  }

  function toggleWalletOverride(walletId: string) {
    setWalletOverrides((prev) => {
      const has = Object.prototype.hasOwnProperty.call(prev, walletId);
      const currentOverride = has ? prev[walletId] : null;

      // current visibility is override or global
      const currentVisible =
        currentOverride === null ? globalShow : currentOverride;

      // toggle visibility; store as override
      const nextVisible = !currentVisible;

      return { ...prev, [walletId]: nextVisible };
    });
  }

  // global toggle
  function toggleGlobalShow() {
    setGlobalShow((s) => !s);
    setWalletOverrides({});
  }
  return (
    <div className="min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />

      <div className={collapsed ? "lg:pl-22" : "lg:pl-70"}>
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="px-4 py-6 lg:px-8">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back, Joy!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s your financial overview
            </p>
          </header>

          {/* Wallets */}

          <section className="mb-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Wallets</h2>

              <div className="flex items-center gap-3">
                {/* Global toggle */}
                <button
                  type="button"
                  onClick={toggleGlobalShow}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  {globalShow ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  {globalShow ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className={[
                  "flex gap-4 overflow-x-auto pb-2",
                  "snap-x snap-mandatory",
                  "[-ms-overflow-style:none] [scrollbar-width:none]",
                  "[&::-webkit-scrollbar]:hidden",
                ].join(" ")}
              >
                {wallets.map((w) => (
                  <div key={w.id} className="min-w-[320px] snap-start">
                    <WalletCard
                      wallet={w}
                      globalShow={globalShow}
                      override={getOverride(w.id)}
                      onToggleOverride={toggleWalletOverride}
                    />
                  </div>
                ))}

                {/* Add wallet card */}
                <div className="min-w-[320px] snap-start">
                  <AddWalletCard onClick={() => console.log("Add wallet")} />
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="mb-6 py-6 px-4 border-2 border-slate-200 rounded-xl">
            <section>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {actions.map((a) => (
                  <ActionTile key={a.label} item={a} />
                ))}
              </div>
            </section>
          </div>

          {/* Transactions */}
          <section className="pb-10">
            <TransactionsCard transactions={transactions} />
          </section>
        </main>
      </div>
    </div>
  );
}
