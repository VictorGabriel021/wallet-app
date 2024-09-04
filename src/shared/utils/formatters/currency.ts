export const currencyNumberToString = (price: number) => {
  const fixedPrice = price.toFixed(2);
  return fixedPrice.replace(".", ",");
};

export const currencyStringToNumber = (string: string) => {
  return Number(string.replaceAll(",", "")) / 100;
};

export const maskCurrency = (inputText: string) => {
  const pattern = /\d$/;

  if (pattern.test(inputText)) {
    const currency = currencyStringToNumber(inputText);
    return currencyNumberToString(currency);
  }

  return inputText.slice(0, -1);
};

export const formatToBRL = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export const convertToFloat = (value: string) => {
  return parseFloat(value.replace(",", "."));
};
