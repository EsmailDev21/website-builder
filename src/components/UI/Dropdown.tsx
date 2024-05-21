import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsGrid } from "react-icons/bs";
import { FiChevronDown, FiChevronUp, FiSettings } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";

function Dropdown({ children, title, rightIcon }) {
  const btnRef = React.useRef();
  const [shown, setShown] = useState(false);
  return (
    <>
      <Button
        rightIcon={rightIcon ?? null}
        fontFamily={"heading"}
        bgGradient="linear(to-r, blue.400,cyan.400)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-r, blue.400,cyan.400)",
          boxShadow: "xl",
        }}
        leftIcon={shown === true ? <FiChevronUp /> : <FiChevronDown />}
        my={2}
        mx={2}
        ref={btnRef}
        onClick={() => setShown(!shown)}
      >
        {title}
      </Button>
      {shown && children}
    </>
  );
}

export default Dropdown;
