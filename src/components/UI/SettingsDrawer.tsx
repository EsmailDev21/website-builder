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
import React from "react";
import { FiSettings } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";

function SettingsDrawer({ children, title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        fontFamily={"heading"}
        bgGradient="linear(to-r, blue.400,cyan.400)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-r, blue.400,cyan.400)",
          boxShadow: "xl",
        }}
        leftIcon={<FiSettings />}
        my={2}
        mx={2}
        ref={btnRef}
        onClick={onOpen}
      >
        {title}
      </Button>
      <Drawer
        size={"md"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SettingsDrawer;
