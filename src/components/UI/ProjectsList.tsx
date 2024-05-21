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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  endtLoading,
  selectProjects,
  setError,
  setProjects,
  startLoading,
} from "../../redux/slices/projectsSlice";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import UIButton from "./UIButton";
import axios from "axios";
import { APIURL } from "../../utils/api";
import { selectUser } from "../../redux/slices/userSlice";
import { token } from "../../utils/auth";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../redux/slices/fileFolderSlice";

const ProjectsList = ({ creator }: { creator: JSX.Element }) => {
  const projects = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  console.log(token);
  useEffect(() => {
    const getProjects = async (ownerID: string) => {
      try {
        dispatch(startLoading());
        const res = await axios.get(`${APIURL}/project/byOwner/${ownerID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data) {
          dispatch(setProjects(res.data));
        }
        dispatch(endtLoading());
      } catch (error) {
        //dispatch(setError("Can't fetch projects"));
        dispatch(endtLoading());
      }
    };
    getProjects(user.id);
  }, [user.id]);
  return (
    <VStack spacing={2}>
      <Box padding={2}>{creator}</Box>
      <Divider />
      {projects.loading == true ? (
        <Center>
          <Loader text="Loading projects, please wait!" />
        </Center>
      ) : projects.error.length > 0 ? (
        <Center>
          <ErrorMessage message={projects.error} />
        </Center>
      ) : (
        <SimpleGrid spacing={2} width={"full"} columns={4}>
          {projects.data.map((i, index) => (
            <Card w={"200px"} padding={10} key={index}>
              <Text fontSize={22} fontWeight="semibold" color="gray.800">
                {i.name}
              </Text>

              <HStack>
                <UIButton
                  onClick={() => {
                    //dispatch(changeFolder(i.id));
                    navigate(`/my-projects/${i.id}`);
                  }}
                  text="Open"
                  type="info"
                />
                <IconButton mt={8} aria-label="Delete" icon={<BsTrash />} />
              </HStack>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default ProjectsList;
