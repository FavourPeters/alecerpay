"use client";

import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export type Tx = {
  name: string;
  meta: string;
  amount: string;
  status: "Completed" | "Pending" | "Reversed";
  statusTone: "success" | "warning" | "danger";
  avatarTone: "mint" | "sky" | "rose";
  flag?: string; // e.g. "🇺🇸"
};

function toneStyles(tone: Tx["statusTone"]) {
  if (tone === "success") return "text-emerald-600";
  if (tone === "warning") return "text-amber-600";
  return "text-red-600";
}

function avatarBg(tone: Tx["avatarTone"]) {
  if (tone === "mint") return "bg-emerald-50 text-emerald-700";
  if (tone === "sky") return "bg-sky-50 text-sky-700";
  return "bg-rose-50 text-rose-700";
}

export default function TransactionsCard({
  transactions,
}: {
  transactions: Tx[];
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Recent Transactions</h3>
        <Link
          href="#"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {transactions.map((t) => {
          const isPositive = t.amount.trim().startsWith("+");
          const Icon = isPositive ? ArrowDownLeft : ArrowUpRight;

          return (
            <div
              key={`${t.name}-${t.meta}`}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "relative flex h-10 w-10 items-center justify-center rounded-full",
                    avatarBg(t.avatarTone),
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />

                  {/* flag badge (bottom-right) */}
                  {t.flag ? (
                    <span className="absolute -bottom-1 -right-1 text-[14px] leading-none">
                      {t.flag}
                    </span>
                  ) : null}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.meta}</p>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={[
                    "text-sm font-semibold",
                    toneStyles(isPositive ? "success" : t.statusTone),
                  ].join(" ")}
                >
                  {t.amount}
                </div>
                <div
                  className={[
                    "text-xs font-medium",
                    toneStyles(t.statusTone),
                  ].join(" ")}
                >
                  {t.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
