export type validCpfOrCnpjProp = string | null | undefined;

export const validCpf = (strCPF: validCpfOrCnpjProp) => {
  if (strCPF) {
    strCPF = strCPF.replace(/[^\d]+/g, "");
    if (strCPF.length !== 11 || /^(\d)\1+$/.test(strCPF)) return false;
    let soma = 0,
      resto;
    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }
  return false;
};

export const validCNPJ = (cnpj: validCpfOrCnpjProp) => {
  if (cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj === "") return false;

    if (cnpj.length !== 14) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(0))) return false;

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(1))) return false;

    return true;
  }
  return false;
};
