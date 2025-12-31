const SITE_NAME = "So Sánh Xe Điện Việt Nam";
function pageTitle(title) {
  if (!title) return SITE_NAME;
  return `${title} | ${SITE_NAME}`;
}
export {
  pageTitle as p
};
