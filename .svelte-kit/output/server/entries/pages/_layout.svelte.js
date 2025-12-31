import { U as attr_class, V as clsx, W as ensure_array_like, X as attr, Y as store_get, Z as unsubscribe_stores, _ as head } from "../../chunks/index2.js";
import "clsx";
import { g as getContext, e as escape_html } from "../../chunks/context.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { class: className = "", mobile = false } = $$props;
    const navItems = [
      { href: "/", label: "Trang chủ" },
      { href: "/xe-dien", label: "Xe điện" },
      { href: "/so-sanh", label: "So sánh" },
      { href: "/tinh-gia", label: "Tính giá" }
    ];
    function isActive(href, currentPath) {
      if (href === "/") return currentPath === "/";
      return currentPath.startsWith(href);
    }
    $$renderer2.push(`<nav${attr_class(clsx(className))}><!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", item.href)}${attr_class(clsx([
        "text-sm font-medium transition-colors",
        mobile ? "block rounded-lg px-3 py-2" : "px-3 py-2",
        isActive(item.href, store_get($$store_subs ??= {}, "$page", page).url.pathname) ? "text-primary-600" : "text-gray-600 hover:text-gray-900"
      ].join(" ")))}>${escape_html(item.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Header($$renderer) {
  $$renderer.push(`<header class="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 items-center justify-between"><a href="/" class="flex items-center gap-2"><span class="text-2xl font-bold text-primary-600">EV</span> <span class="text-lg font-medium text-gray-900">So Sánh</span></a> `);
  Navigation($$renderer, { class: "hidden md:flex" });
  $$renderer.push(`<!----> <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden" aria-label="Menu"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
  }
  $$renderer.push(`<!--]--></svg></button></div></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></header>`);
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const footerLinks = [
      {
        title: "Khám phá",
        links: [
          { href: "/xe-dien", label: "Tất cả xe điện" },
          { href: "/so-sanh", label: "So sánh xe" },
          { href: "/tinh-gia", label: "Tính giá lăn bánh" }
        ]
      },
      {
        title: "Thương hiệu",
        links: [
          { href: "/xe-dien?brand=vinfast", label: "VinFast" },
          { href: "/xe-dien?brand=byd", label: "BYD" },
          { href: "/xe-dien?brand=tesla", label: "Tesla" },
          { href: "/xe-dien?brand=hyundai", label: "Hyundai" }
        ]
      }
    ];
    $$renderer2.push(`<footer class="mt-auto border-t border-gray-200 bg-white"><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div class="grid grid-cols-2 gap-8 md:grid-cols-4"><div class="col-span-2 md:col-span-1"><a href="/" class="flex items-center gap-2"><span class="text-2xl font-bold text-primary-600">EV</span> <span class="text-lg font-medium text-gray-900">So Sánh</span></a> <p class="mt-4 text-sm text-gray-500">Nền tảng so sánh xe điện hàng đầu Việt Nam. Giúp bạn tìm chiếc xe điện phù hợp nhất.</p></div> <!--[-->`);
    const each_array = ensure_array_like(footerLinks);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let section = each_array[$$index_1];
      $$renderer2.push(`<div><h3 class="text-sm font-semibold text-gray-900">${escape_html(section.title)}</h3> <ul class="mt-4 space-y-2"><!--[-->`);
      const each_array_1 = ensure_array_like(section.links);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let link = each_array_1[$$index];
        $$renderer2.push(`<li><a${attr("href", link.href)} class="text-sm text-gray-500 hover:text-gray-900">${escape_html(link.label)}</a></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-8 border-t border-gray-200 pt-8"><p class="text-center text-sm text-gray-500">© ${escape_html(currentYear)} EV So Sánh. Tất cả thông tin chỉ mang tính tham khảo.</p></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.push(`<meta name="robots" content="index, follow"/> <meta name="language" content="Vietnamese"/> <meta name="author" content="EV So Sánh"/>`);
  });
  $$renderer.push(`<div class="flex min-h-screen flex-col">`);
  Header($$renderer);
  $$renderer.push(`<!----> <main class="flex-1">`);
  children($$renderer);
  $$renderer.push(`<!----></main> `);
  Footer($$renderer);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
