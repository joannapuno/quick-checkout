const formatCardNumber = (cardNumber: string) => {
  if(!cardNumber) return ''
  const digits = cardNumber.replace(/\D/g, '');

  // Group digits in chunks of 4
  return digits.replace(/(.{4})/g, '$1 ').trim();
}
export default formatCardNumber
