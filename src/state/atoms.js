import { atom } from "recoil";

export const budgetMonthSelected = atom({
  key: "budgetMonthSelected", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const budgetMonths = atom({
  key: "budgetMonths", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const budgetItems = atom({
  key: "budgetItems", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

