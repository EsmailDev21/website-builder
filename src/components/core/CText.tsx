import { Button, Text } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import React, { ReactNode } from "react";

export interface CTextProps {
  fontSize: number;
  fontWeight: string;
  color?: string;
  children: ReactNode;
}
const CText = ({
  color = "black",
  fontSize = 14,
  fontWeight = "thin",
  children = "Text here",
}: CTextProps) => {
  const {
    connectors: { connect, drag },actions: {setProp} 
  } = useNode();

  return (
    <Text
      ref={(ref) => connect(drag(ref))}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </Text>
  );
};

export default CText;
