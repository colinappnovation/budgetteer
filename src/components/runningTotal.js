import React from "react";

import { formatCurrency } from "../utils";

import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import { BudgetContext } from "../state/BudgetContext";

function RunningTotal() {
   const ctx = React.useContext(BudgetContext);

  return (
    <StatGroup>
      <Stat pl="10">
        <StatLabel>Spent</StatLabel>
        <StatNumber>{formatCurrency(ctx.totals.runningTotal.spent)}</StatNumber>
      </Stat>

      <Stat pl="10">
        <StatLabel>Predicted</StatLabel>
        <StatNumber>{formatCurrency(ctx.totals.runningTotal.budgetted)}</StatNumber>
      </Stat>
    </StatGroup>
  );
}

export default RunningTotal;
