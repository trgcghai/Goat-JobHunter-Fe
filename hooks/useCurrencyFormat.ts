import { useMemo } from "react";

interface CurrencyFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

const DEFAULT_LOCALE = "vi-VN";
const DEFAULT_CURRENCY = "VND";

export const useCurrencyFormat = (options?: CurrencyFormatOptions) => {
  // Create formatter với locale cố định là vi-VN
  const formatter = useMemo(() => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: "currency",
      currency: DEFAULT_CURRENCY,
      minimumFractionDigits: options?.minimumFractionDigits ?? 0,
      maximumFractionDigits: options?.maximumFractionDigits ?? 0,
    });
  }, [options]);

  // Format function
  const format = (amount: number): string => {
    return formatter.format(amount);
  };

  // Format với custom options
  const formatWithOptions = (
    amount: number,
    customOptions: Partial<CurrencyFormatOptions>,
  ): string => {
    const customFormatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: "currency",
      currency: DEFAULT_CURRENCY,
      minimumFractionDigits:
        customOptions.minimumFractionDigits ??
        options?.minimumFractionDigits ??
        0,
      maximumFractionDigits:
        customOptions.maximumFractionDigits ??
        options?.maximumFractionDigits ??
        0,
    });
    return customFormatter.format(amount);
  };

  // Format compact (e.g., 12K, 1,5Tr)
  const formatCompact = (amount: number): string => {
    if (amount >= 1_000_000_000) {
      return `${(amount / 1_000_000_000).toFixed(1)}Tỷ`;
    }
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(1)}Tr`;
    }
    if (amount >= 1_000) {
      return `${(amount / 1_000).toFixed(1)}K`;
    }
    return formatter.format(amount);
  };

  // Format range (e.g., "10.000.000 ₫ - 20.000.000 ₫")
  const formatRange = (min: number, max: number): string => {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  // Format compact range (e.g., "10Tr - 20Tr")
  const formatCompactRange = (min: number, max: number): string => {
    return `${formatCompact(min)} - ${formatCompact(max)}`;
  };

  // Get currency symbol
  const getCurrencySymbol = (): string => {
    const parts = formatter.formatToParts(0);
    const currencyPart = parts.find((part) => part.type === "currency");
    return currencyPart?.value || "₫";
  };

  return {
    format,
    formatWithOptions,
    formatCompact,
    formatRange,
    formatCompactRange,
    getCurrencySymbol,
    locale: DEFAULT_LOCALE,
    currency: DEFAULT_CURRENCY,
  };
};

export default useCurrencyFormat;
