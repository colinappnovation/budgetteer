import React, { useEffect, useState } from "react";
import { BudgetContext } from "../state/BudgetContext";
import { formatCurrency } from "../utils";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";

function BudgetTotal({ budgetId, maxAmt }) {
  const ctx = React.useContext(BudgetContext);

  const [total, setTotal] = useState(0);

  const percentageCalc = parseFloat(total/maxAmt * 100).toFixed(0)

  const typeOfArrow = percentageCalc >= 100 ? "decrease" : "increase"

  useEffect(() => {
    async function fetchExpensesAndTotal(budgetId) {
      const exps = await ctx.budgetItem.fetchExpenses(budgetId);
      const totalOfExpenses = exps.data.reduce((acc, cv) => acc + cv.Amt, 0);
      setTotal(totalOfExpenses);
    }

    fetchExpensesAndTotal(budgetId);
  }, [ctx.budgetItem, budgetId]);

  return (
    <Stat>
      <StatLabel>Spent</StatLabel>
      <StatNumber color={percentageCalc >= 100 ? "red" : ''}>{formatCurrency(total)}</StatNumber>
      <StatHelpText>
        <StatArrow type={typeOfArrow} />
        {percentageCalc}% [Budget: {formatCurrency(maxAmt)}]
      </StatHelpText>
    </Stat>
  );
}

export default BudgetTotal;
