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
} from "@chakra-ui/react";
import { BudgetContext } from "../state/BudgetContext";
import { totalOfExpenses } from "../state/atoms";

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
                {expenses.map((e) => {
                  return (
                    <Tr>
                      <Th>{e.Name}</Th>
                      <Th>{e.Description}</Th>
                      <Th>
                        {" "}
                        {Intl.NumberFormat(undefined, {
                          style: "currency",
                          currency: "GBP",
                        }).format(e.Amt)}
                      </Th>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Box>
            Total Expenses: {total}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ViewExpensesDrawer;
