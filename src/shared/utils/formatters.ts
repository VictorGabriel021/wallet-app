const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const formatCNPJ = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
};

export const formatPhone = (value: string) => {
  const formattedNumber = value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2");

  return formattedNumber.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
};

export const formatForNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const formatToBRL = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export const formatCPF_CNPJ = (event: React.ChangeEvent<HTMLInputElement>) => {
  const regex = /^[0-9\b/./-]+$/;
  const numberLength = event.target.value.replace(/\D/g, "").length;

  if (event.target.value === "" || regex.test(event.target.value)) {
    if (numberLength <= 11) {
      return formatCPF(event.target.value);
    } else {
      return formatCNPJ(event.target.value);
    }
  }

  return event.target.value;
};
