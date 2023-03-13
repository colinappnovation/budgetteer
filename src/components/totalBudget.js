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
import { useGetTotalOfExpensesQuery } from "../server/apiSlice";

function BudgetTotal({ budgetId, maxAmt }) {

  const { data: total, error, loading } = useGetTotalOfExpensesQuery(budgetId);

  const percentageCalc = parseFloat((total / maxAmt) * 100).toFixed(0);

  const typeOfArrow = percentageCalc >= 100 ? "decrease" : "increase";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Stat>
      <StatLabel>Spent</StatLabel>
      <StatNumber color={percentageCalc >= 100 ? "red" : ""}>
        {formatCurrency(total)}
      </StatNumber>
      <StatHelpText>
        <StatArrow type={typeOfArrow} />
        {percentageCalc}% [Budget: {formatCurrency(maxAmt)}]
      </StatHelpText>
    </Stat>
  );
}

export default BudgetTotal;
