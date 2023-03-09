import React from "react";

import { renderToString } from "react-dom/server";

import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tag,
  Highlight,
  Box,
  Divider,
  Td,
} from "@chakra-ui/react";
import { BudgetContext } from "../state/BudgetContext";
import { totalOfExpenses } from "../state/atoms";

import { useRecoilValue } from 'recoil'
import { formatCurrency } from "../utils";

function ViewExpensesDrawer() {
  const ctx = React.useContext(BudgetContext);

  const {
    budgetItem: { currentBudgetItem, expenses },
  } = ctx;

  const total = useRecoilValue(totalOfExpenses)

  return (
    <Drawer isOpen={ctx.drawer.isOpen} onClose={ctx.drawer.onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Highlight
            styles={{ px: "2", py: "2", bg: "orange.100" }}
            query={currentBudgetItem.name}
          >
            {renderToString(`Expenses for ${currentBudgetItem.name}`)}
          </Highlight>
        </DrawerHeader>

        <DrawerBody>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Desc</Th>
                  <Th>Amt</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenses && expenses.map((e) => {
                  return (
                    <Tr>
                      <Td>{e.Name}</Td>
                      <Td>{e.Description}</Td>
                      <Td>
                        {formatCurrency(e.Amt)}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Box mt="5">
            <Divider/>
              <strong>Total Expenses: {formatCurrency(total)}</strong>
            <Divider/>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ViewExpensesDrawer;
