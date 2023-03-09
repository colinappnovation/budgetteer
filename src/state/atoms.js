import { atom, selector } from "recoil";

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

export const budgetItemId = atom({
  key: "budgetItemId",
  default: { id: 0, name: "" },
});

export const budgetItemIdExpenses = atom({
  key: "budgetItemIdExpenses",
  default: [],
});

export const totalBudgetCard = atom({
  key: "totalBudgetCard",
  default: [{id: 0, total: 0}]
})

export const totalSpendAndBudgeted = atom({
  key: "totalSpendAndBudgeted",
  default: [{spent: 0, budgetted: 0}]
})

// ---- Selectors

export const totalOfExpenses = selector({
  key: "totalOfExpenses",
  get: ({ get }) => {
    const exp = get(budgetItemIdExpenses);

    if(!exp) return 0

    const sumWithInitial = exp.reduce(
      (accumulator, currentValue) => accumulator + currentValue.Amt,
      0
    );
    return sumWithInitial;
  },
});