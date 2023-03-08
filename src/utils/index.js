export const formatCurrency = (amt) =>
  Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "GBP",
  }).format(amt);
