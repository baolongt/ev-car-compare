import { g as getCarBySlug, d as allCars } from "../../../../chunks/filters.js";
import { error } from "@sveltejs/kit";
const load = ({ params }) => {
  const car = getCarBySlug(params.slug);
  if (!car) {
    throw error(404, "Không tìm thấy xe");
  }
  return { car };
};
const entries = () => {
  return allCars.map((car) => ({ slug: car.slug }));
};
export {
  entries,
  load
};
