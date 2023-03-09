import React from "react";
import { useRecoilState } from "recoil";
import { getBudgetMonths, getBudgetItemsForBudgetMonth, getExpensesForBudgetId } from "../server";

import { budgetItems, budgetMonthSelected, budgetMonths, budgetItemId, budgetItemIdExpenses } from "./atoms";

import { useDisclosure } from "@chakra-ui/react";

export const BudgetContext = React.createContext();

function BudgetProvider({ children }) {
  const [budgetMonthItems, initBudgetMonths] = useRecoilState(budgetMonths);
  const [budgetSelected, setBudgetSelected] = useRecoilState(budgetMonthSelected);
  const [items, setItems] = useRecoilState(budgetItems);

  const [itemId, setItemId] = useRecoilState(budgetItemId);
  const [expenses, setExpenses] = useRecoilState(budgetItemIdExpenses);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isOpen: isOpenExpense, onOpen: onOpenExpense, onClose: onCloseExpense } = useDisclosure();

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


  const fetchExpenses = async (id = itemId.id) => {
    const data = await getExpensesForBudgetId(id)
    return data
  }

  React.useEffect(() => {
    fetchExpenses().then((d) => {
      setExpenses(d.data)
    });
  }, [itemId.id]);


  return (
    <BudgetContext.Provider
      value={{
        budgets: budgetMonthItems,
        setBudgetSelected,
        budgetId: budgetSelected,
        items,
        drawer: {
          isOpen,
          onOpen,
          onClose
        },
        modal: {
          isOpenExpense,
          onOpenExpense,
          onCloseExpense
        },
        budgetItem: {
          currentBudgetItem: itemId,
          setItemId,
          expenses,
          setExpenses,
          fetchExpenses
        }
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export default BudgetProvider;
