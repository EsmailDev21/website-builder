// components/user/Card.js
import React from "react";
import { Text } from "./CText";
import { Button } from "./CButton";
import {
  Container,
  ContainerDefaultProps,
  ContainerSettings,
} from "./CContainer";
import { Element, useNode } from "@craftjs/core";

export const CardTop = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div ref={connect} className="text-only">
      {children}
    </div>
  );
};
CardTop.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
  rules: {
    // Only accept Text
    canMoveIn: (incomingNodes) =>
      incomingNodes.every(
        (incomingNode) =>
          incomingNode.data.type === Text ||
          incomingNode.data.type === Container ||
          incomingNode.data.type === Card
      ),
  },
};

export const CardBottom = ({ children }) => {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={connect}>{children}</div>;
};

CardBottom.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((incomingNode) => incomingNode.data.type === Button),
  },
};
export const Card = ({
  background,
  padding = 20,
  children,
  height,
  width,
  top,
  bottom,
  left,
  right,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  display,
  flexDirection,
  justifyContent,
  alignItems,
}) => {
  return (
    <Container
      background={background}
      padding={padding}
      height={height}
      width={width}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      alignItems={alignItems}
      justifyContent={justifyContent}
      display={display}
      flexDirection={flexDirection}
    >
      <Element is={CardTop} id="text" canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>
      <Element is={CardBottom} id="Btns" canvas>
        <Button
          size="small"
          text="Learn more"
          variant="contained"
          color="primary"
          children={"Learn more"}
        />
      </Element>
    </Container>
  );
};
Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
