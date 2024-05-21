import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createNewFolder,
  getFileFoldersState,
} from "../../redux/slices/fileFolderSlice";
import { Folder } from "../../types";
import UIButton from "./UIButton";

const CreateFolder = ({
  projectID,
  parentId,
}: {
  projectID: string;
  parentId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<Partial<Folder>>({ name: "" });
  const dispatch = useAppDispatch();
  const toast = useToast();
  const folders = useAppSelector(getFileFoldersState).userFolders;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parentFolder = folders.find((folder) => folder.id === parentId);
      await dispatch(
        createNewFolder({
          name: formData.name,
          parent: parentFolder
            ? { connect: { id: parentFolder.id } }
            : undefined,
          project: { connect: { id: projectID } },
          path: {
            set: parentFolder
              ? [...parentFolder.path.set, parentFolder.name]
              : ["root"],
          },
        })
      ).unwrap();
      toast({
        description: "Folder created successfully",
        status: "success",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to create folder",
        description: error.message || "Failed to create folder!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <UIButton text="New Folder" type="info" onClick={onOpen}></UIButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                name="name"
                placeholder="Folder Name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFolder;
