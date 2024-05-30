import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import FolderList from "../../components/UI/FolderList";
import CreateFolder from "../../components/UI/CreateFolder";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAllDocuments,
  fetchFoldersByProject,
  getFileFoldersState,
} from "../../redux/slices/fileFolderSlice";

const Project = () => {
  const { project_id } = useParams<{ project_id: string }>();
  const dispatch = useAppDispatch();
  const { userFolders, currentFolder } = useAppSelector(getFileFoldersState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      await dispatch(fetchFoldersByProject(project_id));
    };

    fetchFolders();
  }, [project_id]);
  useEffect(() => {
    const fetchFiles = async () => {
      await dispatch(fetchAllDocuments());
    };

    fetchFiles();
  }, [dispatch]);
  return (
    <Layout>
      <FolderList
        files={[]}
        creator={<CreateFolder parentId={null} projectID={project_id!} />}
        projectID={project_id}
        folders={userFolders.filter((f) => f.parentID === null)}
      />
    </Layout>
  );
};

export default Project;
