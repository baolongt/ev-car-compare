function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatVNDCompact(amount) {
  if (amount >= 1e9) {
    return `${(amount / 1e9).toFixed(1).replace(/\.0$/, "")} tỷ`;
  }
  if (amount >= 1e6) {
    return `${(amount / 1e6).toFixed(0)} triệu`;
  }
  return formatVND(amount);
}
function formatNumber(num) {
  return new Intl.NumberFormat("vi-VN").format(num);
}
function formatRange(km) {
  return `${formatNumber(km)} km`;
}
function formatBattery(kwh) {
  return `${kwh} kWh`;
}
function formatPower(hp) {
  return `${formatNumber(hp)} HP`;
}
export {
  formatRange as a,
  formatBattery as b,
  formatVND as c,
  formatPower as d,
  formatNumber as e,
  formatVNDCompact as f
};
