import React, { useState } from "react";
import {
  Box,
  Card,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  IconButton,
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
import { BsFileText, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteDocumentById,
  getFileFoldersState,
} from "../../redux/slices/fileFolderSlice";
import UIButton from "./UIButton";
import { Document, Folder } from "../../types";
import { CodeBlock, atomOneDark } from "react-code-blocks";

const DocumentList = ({
  documents,
  parentId,
  projectID,
}: {
  documents: Document[];
  parentId: string;
  projectID: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<Document>({
    content: "",
    createdAt: null,
    fileName: "",
    extension: "",
    folderId: "",
    id: "",
    jsonContent: "",
    path: [],
    projectId: "",
    savedAt: null,
  });
  const handleclickFile = (id: string) => {
    //dispatch(changeFolder(id));
    setSelectedFile(documents.find((f) => f.id === id));
    onOpen();
    //navigate(`/my-projects/${projectID}/folder/${id}`)
    return;
  };
  const handleDeleteDocument = (documentId: string) => {
    // Dispatch delete document action
    dispatch(deleteDocumentById(documentId));
  };

  const handleEditDocument = (documentId: string) => {
    // Navigate to edit document page or open modal for editing
    navigate(`/my-projects/${projectID}/document/${documentId}/edit`);
  };
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
          <ModalHeader>Code Preview - {selectedFile?.fileName}</ModalHeader>
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
      <Divider />
      <SimpleGrid spacing={8} width={"759px"} columns={4}>
        {documents.map((document, index) => (
          <Card w={"200px"} padding={2} key={index}>
            <Box width={"51px"} height={"51px"} marginBottom={2}>
              <BsFileText color="#3f51b5" size={"51px"} />
            </Box>
            <Heading fontSize={18} fontWeight="semibold" color="gray.800">
              {document.fileName}
            </Heading>
            <Text fontSize={12} fontWeight="thin" color="gray.600">
              {/* Display other information as needed */}
            </Text>
            <HStack marginTop={2}>
              <UIButton
                onClick={() => handleclickFile(document.id)}
                text="Open"
                type="info"
              />
              <IconButton
                aria-label="Delete"
                icon={<BsTrash />}
                onClick={() => handleDeleteDocument(document.id)}
              />
            </HStack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default DocumentList;
