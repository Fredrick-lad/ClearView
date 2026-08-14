const symbols: Record<string, string> = {
  KES: "KES",
  USD: "$",
  EUR: "€",
  GBP: "£",
  UGX: "UGX",
  TZS: "TZS",
  RWF: "RWF",
};

const KES_PER_UNIT: Record<string, number> = {
  KES: 1,
  USD: 129,
  EUR: 140,
  GBP: 165,
  UGX: 0.035,
  TZS: 0.049,
  RWF: 0.092,
};

function getCurrency(): string {
  return localStorage.getItem("cv_currency") || "KES";
}

export function formatCurrency(amount: number | string): string {
  const currency = getCurrency();
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  const sym = symbols[currency] || currency;
  if (isNaN(num)) return `${sym} 0`;
  const rate = KES_PER_UNIT[currency] || 1;
  const converted = num / rate;
  if (currency === "KES" || currency === "UGX" || currency === "TZS" || currency === "RWF") {
    return `${sym} ${Math.round(converted).toLocaleString()}`;
  }
  return `${sym}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function currencySymbol(): string {
  const currency = getCurrency();
  return symbols[currency] || currency;
}
