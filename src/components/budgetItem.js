import React, { useLayoutEffect } from "react";

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


function BudgetItem() {
  const ctx = React.useContext(BudgetContext)

  return ctx?.items?.map((b) => {
    return <Card key={b.id} variant="outline" minWidth={500}>
      <CardHeader>
        <Heading>{b.Name}</Heading>
      </CardHeader>
      <CardBody>
        <Stat>
          <StatLabel>Spent</StatLabel>
          <StatNumber>
            {Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "GBP",
            }).format(50)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            50% [Budget:{" "}
            {Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "GBP",
            }).format(b.Max)}
            ]
          </StatHelpText>
        </Stat>
      </CardBody>
      <CardFooter py="2">
        <VStack>
          <ButtonGroup>
            <Button>Add Expense</Button>
            <Button>View Expenses</Button>
          </ButtonGroup>
        </VStack>
      </CardFooter>
    </Card>;
  });
}

export default BudgetItem;
