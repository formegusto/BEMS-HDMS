import { ConnectedProps } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { UserData } from "src/store/auth/types";
import AuthConnector from "../store/auth/connector";
import BaseTemplate from "../templates/BaseTemplate";
import AppMgmtPage from "./AppMgmtPage";
import AuthPage from "./AuthPage";
import DataMgmtPage from "./DataMgmtPage";
import UserMgmtPage from "./UserMgmtPage";

const routes = (user?: UserData | null) => [
  {
    path: "/",
    element: user ? <BaseTemplate /> : <Navigate to="/auth" />,
    children: [
      { path: "user-mgmt", element: <UserMgmtPage /> },
      { path: "app-mgmt", element: <AppMgmtPage /> },
      { path: "data-mgmt", element: <DataMgmtPage /> },
    ],
  },
  {
    path: "/auth",
    element: user ? <Navigate to="/user-mgmt" /> : <AuthPage />,
  },
];

function Routing({ user }: ConnectedProps<typeof AuthConnector>) {
  const routing = useRoutes(routes(user));

  return <>{routing}</>;
}

export default AuthConnector(Routing);
