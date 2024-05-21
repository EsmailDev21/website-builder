import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { Topbar } from "../../components/utilities/Topbar";
import { Toolbox } from "../../components/utilities/Toolbox";
import { SettingsPanel } from "../../components/utilities/SettingsPanel";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Container } from "../../components/core/CContainer";
import { Card, CardBottom, CardTop } from "../../components/core/CCard";
import { Editor, Element, Frame } from "@craftjs/core";
import { Text } from "../../components/core/CText";
import { Button } from "../../components/core/CButton";
import { Box, Image, Spinner } from "@chakra-ui/react";
import { CImage } from "../../components/core/CImage";
import { CInput } from "../../components/core/CInput";
import { CScript } from "../../components/core/CScript";
import { CTable } from "../../components/core/CTable";
import { CTHead } from "../../components/core/cTable/CTHead";
import { CTBody } from "../../components/core/cTable/CTBody";
import { Cth } from "../../components/core/cTable/Cth";
import { Ctr } from "../../components/core/cTable/Ctr";
import { Ctd } from "../../components/core/cTable/Ctd";
import Indicator from "../../components/core/Indicator";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectUser, setUser } from "../../redux/slices/userSlice";
import { APIURL } from "../../utils/api";
import axios from "axios";
import Loader from "../../components/UI/Loader";

const Home = () => {
  return (
    <Layout>
      <div style={{ margin: "0 auto", width: "100%" }}>
        <Typography variant="h5" align="center">
          Start dragging components to build your UI
        </Typography>

        <Box maxWidth={"100%"}>
          <Editor
            resolver={{
              Card,
              Button,
              Box,
              Text,
              Container,
              CardTop,
              CardBottom,
              CImage,
              Image,
              CInput,
              CScript,
              CTable,
              CTHead,
              CTBody,
              Cth,
              Ctr,
              Ctd,
              Indicator,
            }}
          >
            <Topbar />
            <Grid container spacing={3} style={{ paddingTop: "10px" }}>
              <Grid item xs>
                <Frame>
                  <Element
                    id={"ROOT"}
                    is={Container}
                    padding={5}
                    width={"700px"}
                    canvas
                    background={"#ffffff"}
                    children={undefined}
                    height={500}
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
                    borderWidth={1}
                    borderRadius={undefined}
                    borderColor={"#000000"}
                    shadow={undefined}
                    shadowColor={undefined}
                    shadowRadius={undefined}
                    shadowBlur={undefined}
                  ></Element>
                </Frame>
              </Grid>
              <Grid item xs={3}>
                <Paper style={{ overflow: "scroll", height: "70vh" }}>
                  <Toolbox />
                  <SettingsPanel />
                </Paper>
              </Grid>
            </Grid>
          </Editor>
        </Box>
      </div>
    </Layout>
  );
};

export default Home;
