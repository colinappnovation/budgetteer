import React from "react";
import { useRecoilState } from "recoil";
import { getBudgetItemsForBudgetMonth, getExpensesForBudgetId } from "../server";

import { budgetItems, budgetMonthSelected, budgetMonths, budgetItemId, budgetItemIdExpenses, totalSpendAndBudgeted} from "./atoms";

import { useDisclosure } from "@chakra-ui/react";

import { getPredictedBudgetTotal, getTotalExpenses } from "../server";


export const BudgetContext = React.createContext();

function BudgetProvider({ children }) {
  const [budgetSelected, setBudgetSelected] = useRecoilState(budgetMonthSelected);

  const [itemId, setItemId] = useRecoilState(budgetItemId);
  const [expenses, setExpenses] = useRecoilState(budgetItemIdExpenses);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isOpen: isOpenExpense, onOpen: onOpenExpense, onClose: onCloseExpense } = useDisclosure();

  const [runningTotal, setRunningTotal] = useRecoilState(totalSpendAndBudgeted);

  const fetchBudgetData = async (id = 0) => {
    const data = await getBudgetItemsForBudgetMonth(id);
    return data;
  };

  const fetchExpenses = async (id = itemId.id, mid = budgetSelected) => {
    const data = await getExpensesForBudgetId(id, mid)
    return data
  }

  React.useEffect(() => {
    console.log('Get Expenses');
    fetchExpenses().then((d) => {
      setExpenses(d.data)
    });
  }, [itemId.id]);


  return (
    <BudgetContext.Provider
      value={{
        // budgets: budgetMonthItems,
        setBudgetSelected,
        budgetSelected,
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
