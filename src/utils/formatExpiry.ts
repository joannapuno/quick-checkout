const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4); // only 4 digits max
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default formatExpiry