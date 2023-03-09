import React from "react";
import {
  HStack,
  Select,
  Box,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import { BudgetContext } from "../state/BudgetContext";

function Header() {
  const ctx = React.useContext(BudgetContext);

  function handleChange(e) {
    ctx.setBudgetSelected(e.target.value);
  }

  return (
    <HStack spacing={5}>
      <Box mr={10}>
        <Heading>Budgets</Heading>
      </Box>

      <Box>
        <Select onChange={handleChange}>
          <option value="null">Select Budget</option>
          {ctx.budgets &&
            ctx.budgets.map((b) => {
              return <option value={b.id}>{b.Month}</option>;
            })}
        </Select>
      </Box>

      <Button variant="solid">Add Budget Month</Button>
    </HStack>
  );
}

export default Header;
