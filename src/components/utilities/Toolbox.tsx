import React from "react";
import { Box, Text, Stack, Button as MaterialButton } from "@chakra-ui/react";
import { useEditor } from "@craftjs/core";
import CButton from "../core/CButton";
import CText from "../core/CText";
import CContainer from "../core/CContainer";

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <Box px={2} py={2}>
      <Stack
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Box pb={2}>
          <Text>Drag to add</Text>
        </Box>
        <Box>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <CButton
                  children="Drag me"
                  variant={"solid"}
                  colorScheme={"messenger"}
                  rounded={"md"}
                />
              )
            }
            variant="solid"
          >
            Button
          </MaterialButton>
        </Box>
        <Box>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <CText
                  children="Drag me"
                  fontWeight={"normal"}
                  color={"black"}
                  fontSize={14}
                />
              )
            }
            variant="solid"
          >
            Text
          </MaterialButton>
        </Box>
        <Box>
          <MaterialButton
            ref={(ref) =>
              connectors.create(
                ref,
                <CContainer
                  children="Drag me (I am a container)"
                  padding={0}
                  bgColor={"white"}
                  margin={0}
                />
              )
            }
            variant="solid"
          >
            Container
          </MaterialButton>
        </Box>
        <Box>
          <MaterialButton variant="solid">Card</MaterialButton>
        </Box>
      </Stack>
    </Box>
  );
};
