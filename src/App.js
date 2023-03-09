import "./App.css";

import React from "react";

import { Container, Grid, Box, HStack } from "@chakra-ui/react";

import Header from "../src/components/header";
import BudgetItem from "../src/components/BudgetItem";

import ViewExpensesDrawer from "./components/viewExpenses";
import AddExpense from "./components/addExpense";
import RunningTotal from "./components/runningTotal";

function App() {
  return (
    <>
      <ViewExpensesDrawer />
      <AddExpense />

      <Box m={10}>
        <HStack>
          <Header />
          <RunningTotal />
        </HStack>
      </Box>

      <Container alignContent={"left"} centerContent mt="6">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <BudgetItem />
        </Grid>
      </Container>
    </>
  );
}

export default App;
