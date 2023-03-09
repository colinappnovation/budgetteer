import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonGroup,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { BudgetContext } from "../state/BudgetContext";

import { FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/react";

function AddExpense() {
  const ctx = React.useContext(BudgetContext);

  const budgetSelected = ctx.budgetItem.currentBudgetItem;

  console.log(budgetSelected);

  const { isOpenExpense, onCloseExpense } = ctx.modal;

  const { name, setName} = React.useState('')
  const { desc, setDesc} = React.useState('')
  const { amt, setAmt} = React.useState(0)

 
  function handleSubmit(event){
    event.preventDefault()
  }

  return (
    <Modal isOpen={isOpenExpense} onClose={onCloseExpense}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add an Expense for {budgetSelected.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
            <FormHelperText>Provide name of the expense.</FormHelperText>

            <FormLabel>Description</FormLabel>
            <Input type="text" />
            <FormHelperText>Provide the expense description.</FormHelperText>
         
            <FormLabel>Amt</FormLabel>
            <Input type="text" />
            <FormHelperText>Provide the expense amount.</FormHelperText>
         
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button type="submit" onSubmit={handleSubmit}>Save</Button>
            <Button colorScheme="red" mr={3} onClick={onCloseExpense}>
              Close
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddExpense;
