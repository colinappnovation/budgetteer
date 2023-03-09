import React from "react";
import { useRecoilState } from "recoil";
import { getBudgetMonths, getBudgetItemsForBudgetMonth, getExpensesForBudgetId } from "../server";

import { budgetItems, budgetMonthSelected, budgetMonths, budgetItemId, budgetItemIdExpenses, totalSpendAndBudgeted} from "./atoms";

import { useDisclosure } from "@chakra-ui/react";

import { getPredictedBudgetTotal, getTotalExpenses } from "../server";

export const BudgetContext = React.createContext();

function BudgetProvider({ children }) {
  const [budgetMonthItems, initBudgetMonths] = useRecoilState(budgetMonths);
  const [budgetSelected, setBudgetSelected] = useRecoilState(budgetMonthSelected);
  const [items, setItems] = useRecoilState(budgetItems);

  const [itemId, setItemId] = useRecoilState(budgetItemId);
  const [expenses, setExpenses] = useRecoilState(budgetItemIdExpenses);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { isOpen: isOpenExpense, onOpen: onOpenExpense, onClose: onCloseExpense } = useDisclosure();

  const [runningTotal, setRunningTotal] = useRecoilState(totalSpendAndBudgeted);

  const fetchBudgetData = async (id = 0) => {
    const data = await getBudgetItemsForBudgetMonth(id);
    return data;
  };

  React.useEffect(() => {
    console.log('Budget Selected...')
    fetchBudgetData(budgetSelected).then((d) => setItems(d.data));
  }, [budgetSelected]);


  const fetchData = async () => {
    const data = await getBudgetMonths();
    return data;
  };

  React.useEffect(() => {
    console.log('Get Months...');
    fetchData().then((d) => initBudgetMonths(d.data));
  }, []);


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

  // Totals stats

  async function getAllTotals(id) {
    const exps = await getTotalExpenses(id);
    const sum = exps.data?.reduce((acc, cv) => acc + cv.Amt, 0);

    const bg = await getPredictedBudgetTotal(id);
    const bgSum = bg.data?.reduce((accPB, cvPB) => accPB + cvPB.Max, 0);

    return { spent: sum, budgetted: bgSum };
  }

  React.useEffect(() => { 
    console.log('Get totals...', budgetSelected);
    getAllTotals(budgetSelected).then((n) => {
        setRunningTotal(n);
    });
  }, [budgetSelected]);


 


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
        },
        totals: {
          runningTotal,
          setRunningTotal
        }

      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export default BudgetProvider;
