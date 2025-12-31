import { _ as head } from "../../../chunks/index2.js";
import { p as pageTitle } from "../../../chunks/seo.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("ufl4h9", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(pageTitle("Danh sách xe điện"))}</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Danh sách tất cả xe điện có mặt tại Việt Nam. Lọc theo thương hiệu, giá, tầm xa và dung lượng pin."/>`);
    });
    $$renderer2.push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold text-gray-900">Xe Điện</h1> <p class="mt-2 text-gray-500">Danh sách xe điện sẽ được cập nhật trong Phase 2.</p></div>`);
  });
}
export {
  _page as default
};
