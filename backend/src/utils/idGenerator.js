function generateId(prefix) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < 16; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}_${str}`;
}

module.exports = generateId;
