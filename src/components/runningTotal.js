import React from "react";

import { formatCurrency } from "../utils";

import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import { useGetRunningTotalsQuery } from "../server/apiSlice";
import { getMonth} from '../state/store'
import { useSelector } from "react-redux";


function RunningTotal() {

  const monthId = useSelector(getMonth)
  const { data, error, loading} = useGetRunningTotalsQuery(monthId)

 
  if(loading) {
    return <div>Loading...</div>
  }

  if(!data) {
    return <div>No data</div>
  }

  return (
    <StatGroup>
      <Stat pl="10">
        <StatLabel>Spent</StatLabel>
        <StatNumber>{formatCurrency(data.spent)}</StatNumber>
      </Stat>

      <Stat pl="10">
        <StatLabel>Predicted</StatLabel>
        <StatNumber>{formatCurrency(data.budgetted)}</StatNumber>
      </Stat>
    </StatGroup>
  );
}

export default RunningTotal;
