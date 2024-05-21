import React from "react";
import Layout from "../../components/Layout";
import ProjectsList from "../../components/UI/ProjectsList";
import CreateProject from "../../components/UI/CreateProject";

const MyProjects = () => {
  return (
    <Layout>
      <ProjectsList creator={<CreateProject />} />
    </Layout>
  );
};

export default MyProjects;
