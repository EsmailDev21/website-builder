import React from "react";
import Layout from "../../components/Layout";
import {
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Topbar } from "../../components/utilities/Topbar";
import { Toolbox } from "../../components/utilities/Toolbox";
import { SettingsPanel } from "../../components/utilities/SettingsPanel";
import { CCard } from "../../components/core/CCard";
import { BiBox } from "react-icons/bi";
import { Editor, Element, Frame } from "@craftjs/core";
import CButton from "../../components/core/CButton";
import CContainer from "../../components/core/CContainer";
import CInput from "../../components/core/CInput";
import CText from "../../components/core/CText";

const Home = () => {
  return (
    <Layout>
      <Box style={{ margin: "0 auto", width: "full" }}>
        <Heading variant="h5" textAlign="center">
          A super simple page editor
        </Heading>
        <Editor
          resolver={{ CCard, CButton, CContainer, CInput, Stack, Box, CText }}
        >
          <Topbar />
          <Stack
            width={"full"}
            direction={"row"}
            spacing={3}
            style={{ paddingTop: "10px" }}
          >
            <Stack>
              <Frame>
                <Element
                  is={Box}
                  padding={2}
                  w={"1100px"}
                  bgColor="#fff"
                  canvas
                >
                  <CCard />
                  <CText fontSize={22} color="black" fontWeight={""}>
                    Data
                  </CText>
                  <CInput
                    variant={"solid"}
                    colorScheme={"blue"}
                    rounded={"full"}
                  />
                  <CButton
                    variant={"outline"}
                    colorScheme={"red"}
                    rounded={"full"}
                  >
                    Drag me
                  </CButton>
                </Element>
              </Frame>
            </Stack>

            <Stack>
              <Card>
                <Toolbox />
                <SettingsPanel />
              </Card>
            </Stack>
          </Stack>
        </Editor>
      </Box>
    </Layout>
  );
};

export default Home;
