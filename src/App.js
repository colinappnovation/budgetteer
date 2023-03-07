import "./App.css";

import {
  HStack,
  Container,
} from "@chakra-ui/react";

import Header from '../src/components/header'
import BudgetItem from '../src/components/BudgetItem'

import React from 'react'

function App() {
  
    
  return (
    <>
      <Header />
      <Container alignContent={"center"}>
        <HStack mt="5">
         <BudgetItem />           
        </HStack>
      </Container>
    </>
  );
}

export default App;
