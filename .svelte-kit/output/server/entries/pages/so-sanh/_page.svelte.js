import { h as head } from "../../../chunks/index2.js";
import { p as pageTitle } from "../../../chunks/seo.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("5jieps", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(pageTitle("So sánh xe điện"))}</title>`);
      });
      $$renderer3.push(`<meta name="description" content="So sánh thông số kỹ thuật và giá cả giữa các mẫu xe điện. Chọn tối đa 3 xe để so sánh chi tiết."/>`);
    });
    $$renderer2.push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold text-gray-900">So Sánh Xe</h1> <p class="mt-2 text-gray-500">Tính năng so sánh xe sẽ được cập nhật trong Phase 4.</p></div>`);
  });
}
export {
  _page as default
};
