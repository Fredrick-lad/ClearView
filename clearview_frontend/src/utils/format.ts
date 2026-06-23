const symbols: Record<string, string> = {
  KES: "KES",
  USD: "$",
  EUR: "€",
  GBP: "£",
  UGX: "UGX",
  TZS: "TZS",
  RWF: "RWF",
};

export function formatCurrency(amount: number | string): string {
  const currency = localStorage.getItem("cv_currency") || "KES";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${symbols[currency] || currency} 0`;
  const sym = symbols[currency] || currency;
  if (currency === "KES" || currency === "UGX" || currency === "TZS" || currency === "RWF") {
    return `${sym} ${Math.round(num).toLocaleString()}`;
  }
  return `${sym}${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function currencySymbol(): string {
  const currency = localStorage.getItem("cv_currency") || "KES";
  return symbols[currency] || currency;
}
