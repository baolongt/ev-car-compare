import { b as attr, d as stringify, e as ensure_array_like, f as attr_style, a as attr_class, c as clsx, s as store_get, h as head, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { p as pageTitle } from "../../../chunks/seo.js";
import { f as filters, a as filteredCars, s as setRangeKm, b as setBatteryKwh, c as setPriceRange } from "../../../chunks/filters.js";
import { f as formatVNDCompact, a as formatRange, b as formatBattery } from "../../../chunks/format.js";
import { e as escape_html } from "../../../chunks/context.js";
import "clsx";
function Car_card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { car } = $$props;
    $$renderer2.push(`<a${attr("href", `/xe-dien/${stringify(car.slug)}`)} class="group block"><article class="card h-full transition-shadow hover:shadow-md"><div class="relative aspect-video overflow-hidden rounded-lg bg-gray-100"><img${attr("src", car.images[0] || "/images/placeholder-car.svg")}${attr("alt", `${car.brand} ${car.model}`)} class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy"/> `);
    if (car.featured) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="absolute left-2 top-2 rounded bg-accent-500 px-2 py-0.5 text-xs font-medium text-white">Nổi bật</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-4"><div class="flex items-start justify-between gap-2"><div><p class="text-sm font-medium uppercase tracking-wide text-gray-500">${escape_html(car.brand)}</p> <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600">${escape_html(car.model)}</h3></div> <p class="whitespace-nowrap text-lg font-bold text-primary-600">${escape_html(formatVNDCompact(car.price))}</p></div> <div class="mt-4 flex flex-wrap gap-3 text-sm text-gray-600"><div class="flex items-center gap-1"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> <span>${escape_html(formatRange(car.specs.range))}</span></div> <div class="flex items-center gap-1"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg> <span>${escape_html(formatBattery(car.specs.battery))}</span></div> <div class="flex items-center gap-1"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${escape_html(car.specs.acceleration)}s</span></div></div></div></article></a>`);
  });
}
function Car_grid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { cars } = $$props;
    if (cars.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="py-12 text-center"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <h3 class="mt-2 text-lg font-medium text-gray-900">Không tìm thấy xe</h3> <p class="mt-1 text-gray-500">Thử điều chỉnh bộ lọc để xem thêm kết quả.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      const each_array = ensure_array_like(cars);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let car = each_array[$$index];
        Car_card($$renderer2, { car });
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { checked, label } = $$props;
    $$renderer2.push(`<label class="flex cursor-pointer items-center gap-2"><input type="checkbox"${attr("checked", checked, true)} class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"/> <span class="text-sm text-gray-700">${escape_html(label)}</span></label>`);
  });
}
const brandsData = [
  {
    id: "vinfast",
    name: "VinFast",
    logo: "/images/brands/vinfast.svg",
    country: "Việt Nam",
    website: "https://vinfastauto.com"
  },
  {
    id: "byd",
    name: "BYD",
    logo: "/images/brands/byd.svg",
    country: "Trung Quốc",
    website: "https://byd.com"
  },
  {
    id: "tesla",
    name: "Tesla",
    logo: "/images/brands/tesla.svg",
    country: "Hoa Kỳ",
    website: "https://tesla.com"
  },
  {
    id: "hyundai",
    name: "Hyundai",
    logo: "/images/brands/hyundai.svg",
    country: "Hàn Quốc",
    website: "https://hyundai.com"
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    logo: "/images/brands/mercedes.svg",
    country: "Đức",
    website: "https://mercedes-benz.com"
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "/images/brands/bmw.svg",
    country: "Đức",
    website: "https://bmw.com"
  }
];
function Brand_filter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { selected } = $$props;
    const brands = brandsData;
    $$renderer2.push(`<div class="space-y-2"><h3 class="text-sm font-medium text-gray-900">Hãng xe</h3> <div class="space-y-1"><!--[-->`);
    const each_array = ensure_array_like(brands);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let brand = each_array[$$index];
      Checkbox($$renderer2, {
        label: brand.name,
        checked: selected.includes(brand.id)
      });
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function Range_slider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      min,
      max,
      value,
      step = 1,
      formatValue = (v) => String(v),
      onchange
    } = $$props;
    let minValue = value[0];
    let maxValue = value[1];
    $$renderer2.push(`<div class="space-y-2"><div class="flex justify-between text-sm text-gray-600"><span>${escape_html(formatValue(minValue))}</span> <span>${escape_html(formatValue(maxValue))}</span></div> <div class="relative h-2"><div class="absolute inset-0 rounded-full bg-gray-200"></div> <div class="absolute h-full rounded-full bg-primary-500"${attr_style(`left: ${stringify((minValue - min) / (max - min) * 100)}%; right: ${stringify(100 - (maxValue - min) / (max - min) * 100)}%`)}></div> <input type="range"${attr("min", min)}${attr("max", max)}${attr("step", step)}${attr("value", minValue)} class="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&amp;::-webkit-slider-thumb]:pointer-events-auto [&amp;::-webkit-slider-thumb]:h-4 [&amp;::-webkit-slider-thumb]:w-4 [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:bg-primary-600 [&amp;::-webkit-slider-thumb]:shadow"/> <input type="range"${attr("min", min)}${attr("max", max)}${attr("step", step)}${attr("value", maxValue)} class="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent [&amp;::-webkit-slider-thumb]:pointer-events-auto [&amp;::-webkit-slider-thumb]:h-4 [&amp;::-webkit-slider-thumb]:w-4 [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:bg-primary-600 [&amp;::-webkit-slider-thumb]:shadow"/></div></div>`);
  });
}
function Price_filter($$renderer, $$props) {
  let { value, onchange } = $$props;
  $$renderer.push(`<div class="space-y-2"><h3 class="text-sm font-medium text-gray-900">Giá (VND)</h3> `);
  Range_slider($$renderer, {
    min: 0,
    max: 5e9,
    step: 1e8,
    value,
    formatValue: formatVNDCompact,
    onchange
  });
  $$renderer.push(`<!----></div>`);
}
function Range_filter($$renderer, $$props) {
  let { value, onchange } = $$props;
  function formatKm(v) {
    return `${v} km`;
  }
  $$renderer.push(`<div class="space-y-2"><h3 class="text-sm font-medium text-gray-900">Tầm xa (km)</h3> `);
  Range_slider($$renderer, {
    min: 0,
    max: 700,
    step: 50,
    value,
    formatValue: formatKm,
    onchange
  });
  $$renderer.push(`<!----></div>`);
}
function Battery_filter($$renderer, $$props) {
  let { value, onchange } = $$props;
  function formatKwh(v) {
    return `${v} kWh`;
  }
  $$renderer.push(`<div class="space-y-2"><h3 class="text-sm font-medium text-gray-900">Dung lượng pin</h3> `);
  Range_slider($$renderer, {
    min: 0,
    max: 150,
    step: 10,
    value,
    formatValue: formatKwh,
    onchange
  });
  $$renderer.push(`<!----></div>`);
}
function Filter_panel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      filters: filters2,
      onPriceChange,
      onRangeChange,
      onBatteryChange
    } = $$props;
    $$renderer2.push(`<div class="mb-4 lg:hidden"><button type="button" class="btn-secondary w-full"><svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg> Bộ lọc</button></div> <aside${attr_class(clsx([
      "space-y-6 rounded-xl bg-white p-6 shadow-sm",
      "hidden lg:block"
    ].join(" ")))}><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900">Bộ lọc</h2> <button type="button" class="text-sm text-primary-600 hover:text-primary-700">Đặt lại</button></div> `);
    Brand_filter($$renderer2, { selected: filters2.brands });
    $$renderer2.push(`<!----> `);
    Price_filter($$renderer2, { value: filters2.priceRange, onchange: onPriceChange });
    $$renderer2.push(`<!----> `);
    Range_filter($$renderer2, { value: filters2.rangeKm, onchange: onRangeChange });
    $$renderer2.push(`<!----> `);
    Battery_filter($$renderer2, { value: filters2.batteryKwh, onchange: onBatteryChange });
    $$renderer2.push(`<!----></aside>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let currentFilters = store_get($$store_subs ??= {}, "$filters", filters);
    let cars = store_get($$store_subs ??= {}, "$filteredCars", filteredCars);
    head("ufl4h9", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(pageTitle("Danh sách xe điện"))}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", `Danh sách ${stringify(data.totalCars)}+ xe điện tại Việt Nam. So sánh VinFast, BYD, Tesla, Hyundai, Mercedes, BMW. Lọc theo giá, tầm xa, dung lượng pin.`)}/> <meta name="keywords" content="xe điện Việt Nam, VinFast, BYD, Tesla, so sánh xe điện, giá xe điện"/>`);
    });
    $$renderer2.push(`<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900">Xe Điện tại Việt Nam</h1> <p class="mt-2 text-gray-600">Khám phá ${escape_html(data.totalCars)} mẫu xe điện từ các thương hiệu hàng đầu</p></div> <div class="lg:grid lg:grid-cols-4 lg:gap-8"><div class="lg:col-span-1">`);
    Filter_panel($$renderer2, {
      filters: currentFilters,
      onPriceChange: setPriceRange,
      onRangeChange: setRangeKm,
      onBatteryChange: setBatteryKwh
    });
    $$renderer2.push(`<!----></div> <div class="mt-6 lg:col-span-3 lg:mt-0"><div class="mb-4 flex items-center justify-between"><p class="text-sm text-gray-600">Hiển thị <span class="font-medium">${escape_html(cars.length)}</span> xe</p></div> `);
    Car_grid($$renderer2, { cars });
    $$renderer2.push(`<!----></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
