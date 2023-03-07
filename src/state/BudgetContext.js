import React from "react";
import { useRecoilState } from "recoil";
import { getBudgetMonths, getBudgetItemsForBudgetMonth } from "../server";

import { budgetItems, budgetMonthSelected, budgetMonths } from "./atoms";

export const BudgetContext = React.createContext();

function BudgetProvider({ children }) {
  const [budgetMonthItems, initBudgetMonths] = useRecoilState(budgetMonths);
  const [budgetSelected, setBudgetSelected] = useRecoilState(budgetMonthSelected);
  const [items, setItems] = useRecoilState(budgetItems);

  const fetchBudgetData = async (id = 0) => {
    const data = await getBudgetItemsForBudgetMonth(id);
    return data;
  };

  React.useEffect(() => {
    fetchBudgetData(budgetSelected).then((d) => setItems(d.data));
  }, [budgetSelected]);


  const fetchData = async () => {
    const data = await getBudgetMonths();
    return data;
  };

  React.useEffect(() => {
    fetchData().then((d) => initBudgetMonths(d.data));
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        budgets: budgetMonthItems,
        setBudgetSelected,
        budgetId: budgetSelected,
        items
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export default BudgetProvider;
