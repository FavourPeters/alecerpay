"use client";

import { useMemo } from "react";
import { Eye, EyeOff, Copy, BadgeCheck, Award } from "lucide-react";

export type Wallet = {
  id: string;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  balance: number;
  flagCode: string;
  accountMasked: string;
  badge:
    | { type: "kyc1"; label: "KYC Level 1" }
    | { type: "kyc2"; label: "KYC Level 2" }
    | { type: "verified"; label: "Verified" };
};

function currencyFormat(currency: Wallet["currency"]) {
  const locale =
    currency === "NGN" ? "en-NG" : currency === "GBP" ? "en-GB" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function maskedSymbol(currency: Wallet["currency"]) {
  if (currency === "NGN") return "₦****";
  if (currency === "USD") return "$****";
  if (currency === "GBP") return "£****";
  return "€****";
}

export default function WalletCard({
  wallet,
  globalShow,
  override,
  onToggleOverride,
}: {
  wallet: Wallet;
  globalShow: boolean;
  override: boolean | null;
  onToggleOverride: (walletId: string) => void;
}) {
  const formatter = useMemo(
    () => currencyFormat(wallet.currency),
    [wallet.currency],
  );

  function WalletBadge({ badge }: { badge: Wallet["badge"] }) {
    if (badge.type === "verified") {
      return (
        <div className="flex items-center gap-1 text-xs font-medium text-primary">
          <BadgeCheck className="h-4 w-4 fill-primary text-white" />
          {badge.label}
        </div>
      );
    }

    if (badge.type === "kyc1") {
      return (
        <div className="flex items-center gap-1 rounded-full bg-lblue px-3 py-1 text-xs font-medium text-primary">
          <Award className="h-3.5 w-3.5" />
          {badge.label}
        </div>
      );
    }

    if (badge.type === "kyc2") {
      return (
        <div className="flex items-center gap-1 rounded-full bg-lgreen px-3 py-1 text-xs font-medium text-dgreen">
          <Award className="h-3.5 w-3.5" />
          {badge.label}
        </div>
      );
    }

    return null;
  }

  const isVisible = override === null ? globalShow : override;

  const displayBalance = isVisible
    ? formatter.format(wallet.balance)
    : maskedSymbol(wallet.currency);

  const eyeTitle =
    override === null
      ? isVisible
        ? "Hide (overrides global)"
        : "Show (overrides global)"
      : isVisible
        ? "Hide"
        : "Show";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
      {/* Badge top-right only */}
      <div className="flex justify-end">
        <WalletBadge badge={wallet.badge} />
      </div>

      {/* Flag + currency */}
      <div className="mt-4 flex items-center gap-2">
        <img
          src={`https://flagcdn.com/w40/${wallet.flagCode}.png`}
          alt={wallet.currency}
          className="h-6 w-8 rounded-sm object-cover"
        />
        <span className="text-base  text-slate-700">{wallet.currency}</span>
      </div>

      {/* Balance + eye */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-2xl font-semibold tracking-tight text-slate-900">
          {displayBalance}
        </div>

        <button
          type="button"
          onClick={() => onToggleOverride(wallet.id)}
          className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          aria-label={isVisible ? "Hide balance" : "Show balance"}
          title={eyeTitle}
        >
          {isVisible ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Account masked */}
      <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
        <span className="rounded-md bg-slate-100 px-2 py-1">
          {wallet.accountMasked}
        </span>
        <button
          className="rounded-md p-1 text-primary hover:bg-slate-100"
          aria-label="Copy account"
          onClick={() => navigator.clipboard?.writeText(wallet.accountMasked)}
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
