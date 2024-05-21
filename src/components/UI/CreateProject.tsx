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
import React, { useState } from "react";
import { Folder, Project } from "../../types";
import { APIURL } from "../../utils/api";
import axios from "axios";
import { token } from "../../utils/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectProjects, setProjects } from "../../redux/slices/projectsSlice";
import { selectUser } from "../../redux/slices/userSlice";
import UIButton from "./UIButton";
import { createFolder } from "../services/folderService";
import { createNewFolder } from "../../redux/slices/fileFolderSlice";

const CreateProject = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
  });
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const user = useAppSelector(selectUser);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const toast = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, data: Partial<Project>) => {
    e.preventDefault();
    try {
      setLoadingSubmit(true);
      const res = await axios.post(
        `${APIURL}/project?ownerID=${user.id}`,
        {
          name: data.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast({
          title: "Project created Successfully",
          description: res.data.message || "Happy Building!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        const resFolder = dispatch(
          createNewFolder({
            name: "root",
            parent: null,
            path: {
              set: ["root"],
            },
            projectId: res.data.id,
          })
        );
        console.log(res.data);
        dispatch(setProjects([res.data.data, ...projects.data]));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create project!";
      toast({
        title: "Failed to create project",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingSubmit(false);
      onClose();
    }
  };
  return (
    <>
      <Button
        fontFamily={"heading"}
        onClick={onOpen}
        mt={8}
        w={"full"}
        bgGradient="linear(to-r, blue.400,cyan.400)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-r, blue.400,cyan.400)",
          boxShadow: "xl",
        }}
      >
        New Project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form action="" onSubmit={(e) => handleSubmit(e, formData)}>
            <ModalHeader>Create Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <Input
                  name="name"
                  placeholder="Project name"
                  value={formData.name}
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={loadingSubmit}
                type="submit"
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.400,cyan.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, blue.400,cyan.400)",
                  boxShadow: "xl",
                }}
              >
                Create now
              </Button>
              <UIButton text="Cancel" onClick={onClose} type="danger" />
            </ModalFooter>{" "}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProject;
