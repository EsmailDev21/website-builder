import { Button } from "@chakra-ui/react";
import React from "react";

const UIButton = ({
  loading,
  type = "normal",
  isSubmit,
  onClick,
  text,
}: {
  loading?: boolean;
  type: "normal" | "danger" | "info";
  isSubmit?: boolean;
  onClick?: () => void;
  text: string;
}) => {
  return (
    <Button
      isLoading={loading}
      type={isSubmit ? "submit" : "button"}
      fontFamily={"heading"}
      onClick={onClick}
      mt={8}
      mx={2}
      w={"full"}
      bgGradient={
        type == "normal"
          ? "linear(to-r, blue.400,cyan.400)"
          : type == "danger"
          ? "linear(to-r, red.400,pink.400)"
          : "linear(to-r, green.400,teal.400)"
      }
      color={"white"}
      _hover={{
        bgGradient:
          type == "normal"
            ? "linear(to-r, blue.400,cyan.400)"
            : type == "danger"
            ? "linear(to-r, red.400,pink.400)"
            : "linear(to-r, green.400,teal.400)",
        boxShadow: "xl",
      }}
    >
      {text}
    </Button>
  );
};

export default UIButton;
