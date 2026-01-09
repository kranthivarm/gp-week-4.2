exports.validateVPA = vpa =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(vpa);

exports.luhnCheck = number => {
  const digits = number.replace(/\D/g, "");
  let sum = 0, alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

exports.detectNetwork = num => {
  if (/^4/.test(num)) return "visa";
  if (/^5[1-5]/.test(num)) return "mastercard";
  if (/^3[47]/.test(num)) return "amex";
  if (/^(60|65|8[1-9])/.test(num)) return "rupay";
  return "unknown";
};
