module.exports = function getSubdomain(h) {
  const parts = h.split('.');
  if (parts.length === 2) return null;
  return parts[0];
};
