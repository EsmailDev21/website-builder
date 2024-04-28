// components/Topbar.js
import React from "react";
import {
  Box,
  FormLabel,
  Switch,
  Stack,
  Button as MaterialButton,
} from "@chakra-ui/react";

export const Topbar = () => {
  return (
    <Box rounded={2} px={1} py={1} mt={3} mb={1} bgColor="#cbe8e7">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Stack direction={"row"}>
          <FormLabel>Enable</FormLabel>
          <Switch />
        </Stack>
        <Stack>
          <MaterialButton
            size="small"
            variant="outlined"
            colorScheme="messenger"
          >
            Serialize JSON to console
          </MaterialButton>
        </Stack>
      </Stack>
    </Box>
  );
};
