import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const priceFormatter = new Intl.NumberFormat("en-US", {
  currency: "NRS",
  style: "currency",
  currencyDisplay: "symbol",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(price = 0) {
  if (!price) return "--";
  return priceFormatter.format(price);
}
