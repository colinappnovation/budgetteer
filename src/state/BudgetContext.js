import React from "react";

import { useDisclosure } from "@chakra-ui/react";

export const BudgetContext = React.createContext();

function BudgetProvider({ children }) {
 
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenExpense,
    onOpen: onOpenExpense,
    onClose: onCloseExpense,
  } = useDisclosure();

  return (
    <BudgetContext.Provider
      value={{
        drawer: {
          isOpen,
          onOpen,
          onClose,
        },
        modal: {
          isOpenExpense,
          onOpenExpense,
          onCloseExpense,
        },
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export default BudgetProvider;
