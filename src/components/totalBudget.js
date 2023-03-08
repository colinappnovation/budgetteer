import React, { useEffect, useState } from "react";
import { BudgetContext } from "../state/BudgetContext";
import { formatCurrency } from "../utils";

function BudgetTotal({ id }) {

  const ctx = React.useContext(BudgetContext);

  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchExpensesAndTotal(id) {
      const exps = await ctx.budgetItem.fetchExpenses(id);
      const totalOfExpenses = exps.data.reduce((acc, cv) => acc + cv.Amt, 0);
      setTotal(totalOfExpenses)
    }

    fetchExpensesAndTotal(id)

  }, [id]);


  return formatCurrency(total);
}

export default BudgetTotal;
