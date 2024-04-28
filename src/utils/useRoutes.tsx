import React, { ReactNode } from "react";
import Signin from "../pages/auth/Signin";
import Home from "../pages/home";

interface Route {
  url: string;
  element: ReactNode;
}
const useRoutes = () => {
  const routes: Route[] = [
    {
      url: "/auth/signin",
      element: <Signin />,
    },
    {
      url: "/auth/signup",
      element: null,
    },
    {
      url: "/home",
      element: <Home />,
    },
  ];
  return routes;
};

export default useRoutes;
