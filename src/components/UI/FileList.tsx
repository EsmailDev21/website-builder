import React, { useEffect } from "react";
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

  const handleclickFile = (id: string) => {
    dispatch(changeFolder(id));
    navigate(`/my-projects/${projectID}/folder/${id}`);
  };

  // useEffect(() => {
  // const fetchFolders = async () => {
  //await dispatch(fetchFoldersByProject(projectID));
  //};

  //fetchFolders();
  // }, [projectID]);
  return (
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
  );
};

export default FileList;
