import { Card, Spinner, VStack, Text, Flex } from "@chakra-ui/react";
import { Typography } from "@material-ui/core";
import React from "react";

const Loader = ({ text = "Loading ..." }) => {
  return (
    <Flex
      mt={20}
      height={"100%"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Card padding={5}>
        <VStack>
          <Spinner size={"lg"} color={"linear(to-r, blue.400,cyan.400)"} />
          <Text fontSize={18} fontWeight={"semibold"} color={"gray.400"}>
            {text}
          </Text>
        </VStack>
      </Card>
    </Flex>
  );
};

export default Loader;
