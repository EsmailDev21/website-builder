import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <Card bg={"white"} p={5}>
      <Text fontSize={18} fontWeight={"bold"} color={"red.400"}>
        An Error has occured!
      </Text>
      <Text fontSize={14} fontWeight={"semibold"} color={"gray.400"}>
        {message}
      </Text>
    </Card>
  );
};

export default ErrorMessage;
