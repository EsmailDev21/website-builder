// SaveModal.js
import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { TextField } from "@material-ui/core";

const SaveModal = ({
  projects,
  folders,
  selectedProject,
  setSelectedProject,
  selectedFolder,
  setSelectedFolder,
  filename,
  setFilename,
  createDocumentFromHTML,
  htmlContent,
}) => {
  const { isOpen, onClose,onOpen } = useDisclosure();
  return (
    <>
    <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
              onClick={onOpen}
              mr={3}
            >
              Preview & Save
            </Button>
    <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Project and Folder</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Menu>
            <MenuButton as={Button}>Select Project</MenuButton>
            <MenuList>
              {projects.map((project) => (
                <MenuItem
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                >
                  {project.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button}>Select Folder</MenuButton>
            <MenuList>
              {folders.map((folder) => (
                <MenuItem
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder)}
                >
                  {folder.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <TextField
            variant="outlined"
            label="Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            style={{ marginTop: "10px" }}
            fullWidth
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              createDocumentFromHTML(htmlContent);
              onClose();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal></>
  );
};

export default SaveModal;
