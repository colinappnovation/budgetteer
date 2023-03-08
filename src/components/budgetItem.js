import React, { Suspense } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  VStack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { BudgetContext } from "../state/BudgetContext";

import { GridItem } from '@chakra-ui/react'
import { formatCurrency } from "../utils";
import BudgetTotal from "./totalBudget";


function BudgetItem() {
  const ctx = React.useContext(BudgetContext)

  function handleClick(e) { 
    ctx.budgetItem.setItemId({ id: e.target.dataset.id, name: e.target.dataset.name})
    ctx.drawer.onOpen()
  }

  return ctx?.items?.map((b) => {
    return (
      <GridItem>
        <Card key={b.id} variant="outline" minWidth={500}>
        <CardHeader>
          <Heading>{b.Name}</Heading>
        </CardHeader>
        <CardBody>
          <Stat>
            <StatLabel>Spent</StatLabel>
            <StatNumber>
              <Suspense fallback="Loading...">
                <BudgetTotal id={b.id} />
              </Suspense>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              50% [Budget: {formatCurrency(b.Max)}]
            </StatHelpText>
          </Stat>
        </CardBody>
        <CardFooter py="2">
          <VStack>
            <ButtonGroup>
              <Button>Add Expense</Button>
              <Button data-id={b.id} data-name={b.Name} onClick={handleClick}>View Expenses</Button>
            </ButtonGroup>
          </VStack>
        </CardFooter>
      </Card>
    </GridItem>
    )
  });
}

export default BudgetItem;
