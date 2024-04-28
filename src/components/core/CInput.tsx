import { Button, Input } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import React from "react";

export interface CInputProps {
  variant: string;
  colorScheme: string;
  rounded: string;
  onChange?: () => void;
  value?: string;
}
const CInput = ({
  colorScheme = "messenger",
  rounded = "md",
  variant = "solid",
  onChange = () => console.log("Input changed"),
  value = "",
}: CInputProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Input
      ref={(ref) => connect(drag(ref))}
      value={value}
      onChange={onChange}
      colorScheme={colorScheme}
      rounded={rounded}
      variant={variant}
      width={"auto"}
      borderWidth={"2px"}
      placeholder="drag me"
    ></Input>
  );
};

export default CInput;
