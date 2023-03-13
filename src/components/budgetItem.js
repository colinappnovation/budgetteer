import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  ButtonGroup,
  Divider,
} from "@chakra-ui/react";

import { ArrowForwardIcon, PlusSquareIcon } from "@chakra-ui/icons";

import { BudgetContext } from "../state/BudgetContext";

import { getMonth, store } from "../state/store";
import { useSelector } from "react-redux";

import BudgetTotal from "../components/totalBudget";
import { useGetBudgetItemsQuery } from "../server/apiSlice";

import { budgetItemSelected } from "../state/store";

function BudgetItem() {
  const ctx = React.useContext(BudgetContext);

  const monthId = useSelector(getMonth);

  const { data, error, loading } = useGetBudgetItemsQuery(monthId);

  function handleClick(e) {
    store.dispatch(
      budgetItemSelected({
        id: e.target.dataset.id,
        name: e.target.dataset.name,
      })
    );
    ctx.drawer.onOpen();
  }

  function handleClickExpenseAdd(e) {
    store.dispatch(
      budgetItemSelected({
        id: e.target.dataset.id,
        name: e.target.dataset.name,
      })
    );
    ctx.modal.onOpenExpense();
  }

  if (!data) {
    return <div>No Data</div>;
  }

  return data.map((b) => {
    return (
      <Card key={b.id} variant="filled" minWidth={500}>
        <CardHeader>
          <Heading size="lg">{b.Name}</Heading>
          <Divider />
        </CardHeader>
        <CardBody>
          <BudgetTotal budgetId={b.id} maxAmt={b.Max} />
        </CardBody>
        <CardFooter py="1">
          <ButtonGroup>
            <Button
              leftIcon={<PlusSquareIcon />}
              data-id={b.id}
              data-name={b.Name}
              onClick={handleClickExpenseAdd}
            >
              Add Expense
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              data-id={b.id}
              data-name={b.Name}
              onClick={handleClick}
            >
              View Expenses
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  });
}

export default BudgetItem;
