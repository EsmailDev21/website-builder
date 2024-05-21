import React, { ReactNode, useEffect } from "react";
import Signin from "../pages/auth/Signin";
import Home from "../pages/home";
import Preview from "../pages/preview/Preview";
import Register from "../pages/auth/Register";
import MyProjects from "../pages/my projects/MyProjects";
import Settings from "../pages/settings/Settings";
import { useNavigate } from "react-router-dom";

import { isExpired, decodeToken } from "react-jwt";
import Project from "../pages/my projects/Project";
import Folder from "../pages/folders/Folder";
interface Route {
  url: string;
  element: ReactNode;
}
const Init = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const checkToken = (token: string | null) => {
    console.log(isExpired(token));
    if (!token || isExpired(token)) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (checkToken(token)) {
      navigate("/home");
    } else {
      navigate("/auth/signin");
    }
  }, [token]);
  return null;
};
const useRoutes = () => {
  const routes: Route[] = [
    {
      url: "/",
      element: <Init />,
    },
    {
      url: "/auth/signin",
      element: <Signin />,
    },
    {
      url: "/auth/signup",
      element: <Register />,
    },
    {
      url: "/home",
      element: <Home />,
    },
    {
      url: "/preview",
      element: <Preview />,
    },
    {
      url: "/my-projects",
      element: <MyProjects />,
    },
    {
      url: "/settings",
      element: <Settings />,
    },
    {
      url: "/my-projects/:project_id",
      element: <Project />,
    },
    {
      url: "/my-projects/:project_id/folder/:folder_id",
      element: <Folder />,
    },
    {
      url: "/my-projects/:project_id/:folder_path/:doc_id",
      element: null,
    },
  ];
  return routes;
};

export default useRoutes;
