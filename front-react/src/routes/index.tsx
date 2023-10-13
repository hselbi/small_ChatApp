/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// config
import { DEFAULT_PATH } from "./Default";
import LoadingScreen from "../components/LoadingScreen";


const Loadable = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "dashboard", element: <Dashboard /> },
        { path: "chat", element: <Chat /> },
        { path: "private", element: <Private /> },
        { path: "rooms", element: <Rooms /> },
        
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Chat = Loadable(
  lazy(() => import("../pages/Dashboard/Chat")),
);

const Private = Loadable(
  lazy(() => import("../pages/Dashboard/Private")),
);

const Dashboard = Loadable(
  lazy(() => import("../pages/Dashboard")),
);

const Rooms = Loadable(
  lazy(() => import("../pages/Dashboard/Rooms")),
);

const Page404 = Loadable(lazy(() => import("../pages/Page404")));
