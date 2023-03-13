import React from "react";
import { formatCurrency } from "../utils";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { useGetExpensesForBudgetAndMonthQuery } from "../server/apiSlice";
import { useSelector } from "react-redux";
import { getMonth } from "../state/store";

function BudgetTotal({ budgetId = 0, maxAmt = 0 }) {
  const monthId = useSelector(getMonth);
  const { data, error, loading } = useGetExpensesForBudgetAndMonthQuery({
    monthId,
    budgetId,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && data) {
    const percentageCalc = parseFloat((data.totalSpent / maxAmt) * 100).toFixed(0);
    const typeOfArrow = percentageCalc >= 100 ? "decrease" : "increase";

    return (
      <Stat>
        <StatLabel>Spent</StatLabel>
        <StatNumber color={percentageCalc >= 100 ? "red" : ""}>
          {formatCurrency(data.totalSpent)}
        </StatNumber>
        <StatHelpText>
          <StatArrow type={typeOfArrow} />
          {percentageCalc}% [Budget: {formatCurrency(maxAmt)}]
        </StatHelpText>
      </Stat>
    );
  }
}

export default BudgetTotal;
