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
  createNewDocument,
  getFileFoldersState,
} from "../../redux/slices/fileFolderSlice";
import UIButton from "./UIButton";

const CreateDocument = ({
  projectId,
  folderId,
}: {
  projectId: string;
  folderId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const dispatch = useAppDispatch();
  const toast = useToast();
  const currentFolder = useAppSelector(getFileFoldersState).currentFolder;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        createNewDocument({
          dto: {
            content: formData.content,
            folderId: folderId,
            path: currentFolder.path,
            fileName: formData.title,
            // Add other fields as needed
          },
          projectId: projectId,
          fileName: formData.title, // Set the filename here or adjust as needed
        })
      ).unwrap();
      toast({
        description: "Document created successfully",
        status: "success",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to create document",
        description: error.message || "Failed to create document!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <UIButton text="New File" type="info" onClick={onOpen}></UIButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
              />
            </FormControl>
            {/* Add other fields as needed */}
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

export default CreateDocument;
