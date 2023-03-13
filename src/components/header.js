import React from "react";
import { HStack, Select, Box, Heading, Button } from "@chakra-ui/react";

import { store, monthSelected } from "../state/store";
import { useGetMonthsQuery } from "../server/apiSlice";

function Header() {
  function handleChange(e) {
    store.dispatch(monthSelected(e.target.value));
  }

  const { data, error, isLoading } = useGetMonthsQuery();

  if(error) {
    return <div>{error.message}</div>
  }

  return (
    <HStack spacing={5}>
      <Box mr={10}>
        <Heading>Budgets</Heading>
      </Box>

      <Box>
        <Select onChange={handleChange}>
          <option value="null">Select Budget</option>
          {!isLoading &&
            data &&
            data.map((m) => {
              return <option value={m.id}>{m.Month}</option>;
            })}
        </Select>
      </Box>

      <Button variant="solid">Add Budget Month</Button>
    </HStack>
  );
}

export default Header;
