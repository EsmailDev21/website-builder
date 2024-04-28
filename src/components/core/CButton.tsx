import { Button } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import React from "react";

export interface CButtonProps {
  variant: string;
  colorScheme: string;
  rounded: string;
  children?: any;
  onClick?: () => void;
}
const CButton: React.FC<CButtonProps> = ({
  colorScheme = "messenger",
  rounded = "md",
  variant = "solid",
  children = "Button",
  onClick = () => console.log("Button clicked"),
}: CButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Button
      ref={(ref) => connect(drag(ref))}
      onClick={onClick}
      colorScheme={colorScheme}
      rounded={rounded}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default CButton;
