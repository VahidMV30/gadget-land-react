const formatPrice = (value: string) => {
  let onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers === "") return "";

  while (onlyNumbers.length > 1 && onlyNumbers.startsWith("0")) {
    onlyNumbers = onlyNumbers.substring(1);
  }

  return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const parsePriceToString = (originalPrice: number): string => {
  return originalPrice.toLocaleString("en-US").replace(/,/g, ".");
};

export default formatPrice;
