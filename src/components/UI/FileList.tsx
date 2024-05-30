import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Center,
  Divider,
  Heading,
  SimpleGrid,
  TableContainer,
  VStack,
  Text,
  HStack,
  IconButton,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeFolder,
  fetchFoldersByProject,
  getFileFoldersState,
} from "../../redux/slices/fileFolderSlice";
import { Link } from "react-router-dom";
import UIButton from "./UIButton";
import { BsFolder, BsFolder2Open, BsFolderFill, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import FoldersBreadcrumb from "./FoldersBreadcrumb";
import { Document, Folder } from "../../types";
import { CodeBlock, atomOneDark } from "react-code-blocks";

const FileList = ({
  folderID,
  projectID,
  files,
}: {
  files: Document[];
  folderID: string;
  projectID: string;
}) => {
  const dispatch = useAppDispatch();
  // const { userFolders, currentFolder } = useAppSelector(getFileFoldersState);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<Document>(null);
  const userFiles = useAppSelector(getFileFoldersState).userFiles;
  const handleclickFile = (id: string) => {
    //dispatch(changeFolder(id));
    setSelectedFile(userFiles.find((f) => f.id === id));
    onOpen();
    //navigate(`/my-projects/${projectID}/folder/${id}`)
    return;
  };

  // useEffect(() => {
  // const fetchFolders = async () => {
  //await dispatch(fetchFoldersByProject(projectID));
  //};

  //fetchFolders();
  // }, [projectID]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Modal
        size={"6xl"}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Code Preview - {selectedFile.fileName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CodeBlock
              text={selectedFile.content}
              language={"html"}
              showLineNumbers={true}
              theme={atomOneDark}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid spacing={2} width={"full"} columns={4}>
        {files.map((file, index) => (
          <Card w={"200px"} padding={2} key={index}>
            <VStack>
              <Box width={"51px"} height={"51px"}>
                <BsFolderFill color="#f5d742" size={"51px"} />
              </Box>
              <Text fontSize={22} fontWeight="semibold" color="gray.800">
                {file.fileName}.{file.extension}
              </Text>
              <Text fontSize={12} fontWeight="thin" color="gray.600">
                Created : {new Date(file.createdAt).toLocaleDateString()}
              </Text>
            </VStack>
            <HStack>
              <UIButton
                onClick={() => handleclickFile(file.id)}
                text="Open"
                type="info"
              />
              <IconButton mt={8} aria-label="Delete" icon={<BsTrash />} />
            </HStack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default FileList;
