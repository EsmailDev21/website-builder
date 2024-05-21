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

const CreateFile = ({
  projectID,
  parentId,
}: {
  projectID: string;
  parentId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<{ file: any }>({ file: "" });
  const dispatch = useAppDispatch();
  const toast = useToast();
  const folders = useAppSelector(getFileFoldersState).userFolders;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parentFolder = folders.find((folder) => folder.id === parentId);
      await dispatch(
        createNewFolder({
          //name: formData.name,
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
        description: "File created successfully",
        status: "success",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to create file",
        description: error.message || "Failed to create file!",
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
          <ModalHeader>New File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                name="file"
                type="file"
                placeholder="File"
                value={formData.file}
                onChange={handleChange}
              />
              <Button mt={2} colorScheme={"messenger"}>
                Upload
              </Button>
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

export default CreateFile;
