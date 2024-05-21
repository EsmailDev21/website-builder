// components/Toolbox.js
import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { Element, useEditor } from "@craftjs/core";
import { Button } from "../core/CButton";
import { Text } from "../core/CText";
import { Container } from "../core/CContainer";
import { Card } from "../core/CCard";
import { CImage } from "../core/CImage";
import { CInput } from "../core/CInput";
import { CScript } from "../core/CScript";
import { Button as ChakraBtn } from "@chakra-ui/react";
import { CTable } from "../core/CTable";
import Dropdown from "../UI/Dropdown";
import { BsGrid } from "react-icons/bs";
import Indicator from "../core/Indicator";
export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <Box px={2} py={2}>
      <Grid
        style={{ padding: "10px" }}
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Dropdown rightIcon={<BsGrid />} title="Components">
          <Grid container direction="column" item>
            <ChakraBtn
              ref={(ref) =>
                connectors.create(
                  ref,
                  <Button
                    text="Click me"
                    size="small"
                    variant={undefined}
                    color={undefined}
                  />
                )
              }
              fontFamily={"heading"}
              my={2}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
            >
              Button
            </ChakraBtn>
          </Grid>
          <Grid container direction="column" item>
            <ChakraBtn
              ref={(ref) =>
                connectors.create(
                  ref,
                  <Text
                    color={"#000000"}
                    text="Hi world"
                    fontSize={18}
                    fontWeight={undefined}
                  />
                )
              }
              fontFamily={"heading"}
              my={2}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
            >
              Text
            </ChakraBtn>
          </Grid>
          <Grid container direction="column" item>
            <ChakraBtn
              ref={(ref) =>
                connectors.create(
                  ref,

                  <Element
                    is={Container}
                    padding={20}
                    canvas
                    children={undefined}
                    background={undefined}
                    height={undefined}
                    width={undefined}
                    top={undefined}
                    bottom={undefined}
                    left={undefined}
                    right={undefined}
                    marginTop={undefined}
                    marginBottom={undefined}
                    marginLeft={undefined}
                    marginRight={undefined}
                    display={undefined}
                    flexDirection={undefined}
                    justifyContent={undefined}
                    alignItems={undefined}
                    borderWidth={undefined}
                    borderRadius={undefined}
                    borderColor={undefined}
                    shadow={undefined}
                    shadowColor={undefined}
                    shadowRadius={undefined}
                    shadowBlur={undefined}
                  />
                )
              }
              fontFamily={"heading"}
              my={2}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
            >
              Container
            </ChakraBtn>
          </Grid>
          <Grid container direction="column" item>
            <ChakraBtn
              ref={(ref) =>
                connectors.create(
                  ref,
                  <CImage
                    borderRadius={0}
                    height={400}
                    src="https://unsplash.it/600/400"
                    width={600}
                  />
                )
              }
              fontFamily={"heading"}
              my={2}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
            >
              Image
            </ChakraBtn>
          </Grid>
          <Grid container direction="column" item>
            <ChakraBtn
              ref={(ref) =>
                connectors.create(
                  ref,
                  <CInput
                    background={undefined}
                    children={undefined}
                    height={undefined}
                    width={undefined}
                    top={undefined}
                    bottom={undefined}
                    left={undefined}
                    right={undefined}
                    marginTop={undefined}
                    marginBottom={undefined}
                    marginLeft={undefined}
                    marginRight={undefined}
                    display={undefined}
                    flexDirection={undefined}
                    justifyContent={undefined}
                    alignItems={undefined}
                    borderWidth={undefined}
                    borderRadius={undefined}
                    borderColor={undefined}
                    shadow={undefined}
                    shadowColor={undefined}
                    shadowRadius={undefined}
                    shadowBlur={undefined}
                    value={undefined}
                    onChange={undefined}
                    placeholder={undefined}
                    type={undefined}
                  />
                )
              }
              fontFamily={"heading"}
              my={2}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
            >
              Input
            </ChakraBtn>
          </Grid>
          <Grid container direction="column" item>
            <ChakraBtn
              ref={(ref) => connectors.create(ref, <CScript />)}
              fontFamily={"heading"}
              my={2}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
            >
              Script
            </ChakraBtn>
          </Grid>
          <Grid container direction="column" item>
            <ChakraBtn
              ref={(ref) =>
                connectors.create(
                  ref,
                  <Element
                    canvas
                    is={CTable}
                    children={undefined}
                    background={undefined}
                    height={500}
                    width={undefined}
                    top={undefined}
                    bottom={undefined}
                    left={undefined}
                    right={undefined}
                    marginTop={undefined}
                    marginBottom={undefined}
                    marginLeft={undefined}
                    marginRight={undefined}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={undefined}
                    alignItems={undefined}
                    borderWidth={2}
                    borderRadius={undefined}
                    borderColor={undefined}
                    shadow={undefined}
                    shadowColor={undefined}
                    shadowRadius={undefined}
                    shadowBlur={undefined}
                    type={undefined}
                    _id={undefined}
                    ths={undefined}
                    tds={undefined}
                    trs={undefined}
                  />
                )
              }
              fontFamily={"heading"}
              my={2}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
            >
              Table
            </ChakraBtn>
          </Grid>
        </Dropdown>
      </Grid>
    </Box>
  );
};
