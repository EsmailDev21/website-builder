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
import FileList from "./FileList";
import CreateFile from "./CreateFile";

const FolderList = ({
  creator,
  folders,
  projectID,
  files,
}: {
  creator: JSX.Element;
  folders: Folder[];
  projectID: string;
  files: Document[];
}) => {
  const dispatch = useAppDispatch();
  // const { userFolders, currentFolder } = useAppSelector(getFileFoldersState);
  const navigate = useNavigate();

  const handleclickFolder = (id: string) => {
    dispatch(changeFolder(id));
    navigate(`/my-projects/${projectID}/folder/${id}`);
  };

  const currentFolder = useAppSelector(getFileFoldersState).currentFolder;

  // useEffect(() => {
  // const fetchFolders = async () => {
  //await dispatch(fetchFoldersByProject(projectID));
  //};

  //fetchFolders();
  // }, [projectID]);
  return (
    <VStack spacing={2}>
      <HStack width={"full"} justifyContent={"space-between"}>
        <FoldersBreadcrumb projectID={projectID} />

        <HStack>
          {
            //<Box padding={2}>
            //// <CreateFile
            //  parentId={currentFolder != null ? currentFolder.id : null}
            //  projectID={projectID}
            //  />
            // </Box>
          }
          <Box padding={2}>{creator}</Box>
        </HStack>
      </HStack>

      <Divider />
      <>
        <SimpleGrid spacing={2} width={"full"} columns={4}>
          {folders.map((folder, index) => (
            <Card w={"200px"} padding={2} key={index}>
              <VStack>
                <Box width={"51px"} height={"51px"}>
                  <BsFolderFill color="#f5d742" size={"51px"} />
                </Box>
                <Text fontSize={22} fontWeight="semibold" color="gray.800">
                  {folder.name}
                </Text>
                <Text fontSize={12} fontWeight="thin" color="gray.600">
                  Created : {new Date(folder.createdAt).toLocaleDateString()}
                </Text>
              </VStack>
              <HStack>
                <UIButton
                  onClick={() => handleclickFolder(folder.id)}
                  text="Open"
                  type="info"
                />
                <IconButton mt={8} aria-label="Delete" icon={<BsTrash />} />
              </HStack>
            </Card>
          ))}
        </SimpleGrid>
      </>
      {
        //<FileList
        // files={files}
        // folderID={currentFolder != null ? currentFolder.id : null}
        // projectID={projectID}
        ///>
      }
    </VStack>
  );
};

export default FolderList;
