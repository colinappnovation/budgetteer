import "./App.css";

import React from "react";

import { Container, Grid, Box } from "@chakra-ui/react";

import Header from "../src/components/header";
import BudgetItem from "../src/components/BudgetItem";

import ViewExpensesDrawer from "./components/viewExpenses";
import AddExpense from "./components/addExpense";

function App() {
  return (
    <>
      <ViewExpensesDrawer />
      <AddExpense />
      <Container mt={6}>
        <Box borderRadius="md" borderWidth="1px" padding={3}>
          <Header />
        </Box>
      </Container>
      <Container alignContent={"left"} centerContent mt="6">
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <BudgetItem />
        </Grid>
      </Container>
    </>
  );
}

export default App;
