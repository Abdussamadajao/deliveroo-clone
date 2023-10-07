import { useSelector } from "react-redux";

const items = useSelector((state) => state.basket.items);

export const selectBasketTotal = items.reduce(
  (total, item) => (total += item.price),
  0
);
