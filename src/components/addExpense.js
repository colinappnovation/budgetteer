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

import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { addExpense } from "../server";

function AddExpense() {
  const ctx = React.useContext(BudgetContext);

  const budgetSelected = ctx.budgetItem.currentBudgetItem;

  const { isOpenExpense, onCloseExpense } = ctx.modal;

  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [amt, setAmt] = React.useState(0);

  async function handleSubmit(event) {
    event.preventDefault();
    const { error } = await addExpense({
      name,
      desc,
      amt,
      id: budgetSelected.id,
      budgetMonth: ctx.budgetId,
    });
    console.log('error 😱', error)
    ctx.modal.onCloseExpense();
  }

  return (
    <Modal isOpen={isOpenExpense} onClose={onCloseExpense}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add an Expense for {budgetSelected.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="addExpenseForm">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <FormHelperText>Provide name of the expense.</FormHelperText>

              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                onChange={(event) => setDesc(event.currentTarget.value)}
              />
              <FormHelperText>Provide the expense description.</FormHelperText>

              <FormLabel>Amt</FormLabel>
              <Input
                type="text"
                onChange={(event) => setAmt(event.currentTarget.value)}
              />
              <FormHelperText>Provide the expense amount.</FormHelperText>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button type="submit" form="addExpenseForm">
              Save
            </Button>
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
