import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getFileFoldersState,
  changeFolder,
} from "../../redux/slices/fileFolderSlice";
import { Link } from "react-router-dom";
import { selectProjects } from "../../redux/slices/projectsSlice";
import { BsChevronRight } from "react-icons/bs";

const FoldersBreadcrumb = ({ projectID }: { projectID: string }) => {
  const dispatch = useAppDispatch();
  const { userFolders, currentFolder } = useAppSelector(getFileFoldersState);
  const folderPath = currentFolder ? currentFolder.path.set : [];

  const { data } = useAppSelector(selectProjects);

  return (
    <Breadcrumb
      spacing="8px"
      separator={<BsChevronRight color="gray.500" />}
      colorScheme="linkedin"
    >
      <BreadcrumbItem>
        <BreadcrumbLink
          color="blue.500"
          as={Link}
          to={`/my-projects/${projectID}`}
          onClick={() => dispatch(changeFolder("root"))}
        >
          {data.find((i) => i.id === projectID).name}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {folderPath &&
        folderPath.map((item, index) => {
          const folder = userFolders.find((f) => f.name === item);
          if (!folder) return null;
          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                color="blue.500"
                as={Link}
                to={`/my-projects/${projectID}/folder/${folder.id}`}
                onClick={() => dispatch(changeFolder(folder.id))}
              >
                {item}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      {currentFolder && (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            color="blue.500"
            as={Link}
            to={`/my-projects/${projectID}/folder/${currentFolder.id}`}
          >
            {currentFolder.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default FoldersBreadcrumb;
