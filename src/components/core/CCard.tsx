// components/user/Card.js
import React from "react";
import CContainer from "./CContainer";
import CButton from "./CButton";
import { Box, Text } from "@chakra-ui/react";
import CText from "./CText";
import { Element } from "@craftjs/core";
export const CCard = ({ background = "white", padding = 2 }) => {
  return (
    <Element
      id="card"
      is={Box}
      bgColor={background}
      padding={padding}
      margin={0}
      borderWidth={"2px"}
      canvas
    >
      <div className="text-only">
        <CText fontSize={20} fontWeight={"thin"}>
          Title
        </CText>
      </div>
      <div>
        <CText fontSize={15} fontWeight={"bold"}>
          Subtitle
        </CText>
      </div>
      <div className="buttons-only">
        <CButton
          children="Learn more"
          variant="solid"
          colorScheme={"blue"}
          rounded={"md"}
        />
      </div>
      <div className="buttons-only">
        <CText fontSize={15} fontWeight={"bold"}>
          Subtitle2
        </CText>
      </div>
    </Element>
  );
};
