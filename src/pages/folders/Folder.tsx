import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import FolderList from "../../components/UI/FolderList";
import CreateFolder from "../../components/UI/CreateFolder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchChildFolders,
  getFileFoldersState,
  changeFolder,
  fetchAllDocuments,
} from "../../redux/slices/fileFolderSlice";
import Loader from "../../components/UI/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage";

const Folder = () => {
  const { folder_id, project_id } = useParams<{
    folder_id: string;
    project_id: string;
  }>();

  const dispatch = useAppDispatch();
  const { userFolders, currentFolder, isLoading, error, userFiles } =
    useAppSelector(getFileFoldersState);
  const navigate = useNavigate();

  useEffect(() => {
    if (folder_id) {
      dispatch(changeFolder(folder_id));
    }
  }, [folder_id, dispatch]);

  useEffect(() => {
    if (currentFolder && currentFolder.id) {
      dispatch(fetchChildFolders(currentFolder.id));
    }
  }, [currentFolder, dispatch]);
  useEffect(() => {
    const getDocs = async () => {
      await dispatch(fetchAllDocuments()).unwrap();
    };
    getDocs();
  }, [currentFolder, dispatch]);

  if (isLoading) {
    return <Loader text={"Loading folders..."} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Layout>
      <FolderList
        creator={
          currentFolder && (
            <CreateFolder
              projectID={project_id!}
              parentId={currentFolder.id!}
            />
          )
        }
        projectID={project_id}
        folders={userFolders.filter((i) => i.parentID === currentFolder?.id)}
        files={currentFolder ? userFiles : []} // Pass files of current folder
      />
    </Layout>
  );
};

export default Folder;
