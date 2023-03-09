import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  VStack,
  Button,
  ButtonGroup,
  Divider,
} from "@chakra-ui/react";

import { ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons'

import { BudgetContext } from "../state/BudgetContext";


import BudgetTotal from '../components/totalBudget'

function BudgetItem() {
  const ctx = React.useContext(BudgetContext)

  function handleClick(e) { 
    ctx.budgetItem.setItemId({ id: e.target.dataset.id, name: e.target.dataset.name})
    ctx.drawer.onOpen()
  }

  return ctx?.items?.map((b) => {
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
              <Button leftIcon={<PlusSquareIcon/>}>Add Expense</Button>
              <Button rightIcon={<ArrowForwardIcon />} data-id={b.id} data-name={b.Name} onClick={handleClick}>View Expenses</Button>
            </ButtonGroup>         
        </CardFooter>
      </Card>
 
    )
  });
}

export default BudgetItem;
