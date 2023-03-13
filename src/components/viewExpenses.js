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
  Highlight,
  Box,
  Divider,
  Td,
} from "@chakra-ui/react";
import { BudgetContext } from "../state/BudgetContext";
import { formatCurrency } from "../utils";
import { useGetExpensesForBudgetAndMonthQuery } from "../server/apiSlice";
import { useSelector } from "react-redux";
import { getMonth, getSelectedBudgetItem } from "../state/store";

function ViewExpensesDrawer() {
  const ctx = React.useContext(BudgetContext);

  const monthId = useSelector(getMonth);
  const budgetItemSelected = useSelector(getSelectedBudgetItem);
  const { data, loading } = useGetExpensesForBudgetAndMonthQuery({
    monthId,
    budgetId: budgetItemSelected.id,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Drawer isOpen={ctx.drawer.isOpen} onClose={ctx.drawer.onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Highlight
            styles={{ px: "2", py: "2", bg: "orange.100" }}
            query={budgetItemSelected.title}
          >
            {renderToString(`Expenses for ${budgetItemSelected.title}`)}
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
                {data.expenses.map((e) => {
                  return (
                    <Tr>
                      <Td>{e.Name}</Td>
                      <Td>{e.Description}</Td>
                      <Td>{formatCurrency(e.Amt)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Box mt="5">
            <Divider />
            <strong>Total Expenses: {formatCurrency(data.totalSpent)}</strong>
            <Divider />
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ViewExpensesDrawer;
