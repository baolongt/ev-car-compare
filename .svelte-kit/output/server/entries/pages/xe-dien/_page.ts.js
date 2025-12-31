import { d as allCars } from "../../../chunks/filters.js";
const load = () => {
  return {
    cars: allCars,
    totalCars: allCars.length
  };
};
export {
  load
};
