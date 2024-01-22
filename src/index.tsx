import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Component/Public/Login";
import ErrorPage from "./ErrorPage";
import AuthRoot from "./Route/AuthRoot";
import OpenRoot from "./Route/OpenRoot";
import TextAlert from "./Component/TextAlert";
import ThemeProvider from "./ThemeProvider";
import Register from "./Component/Public/Register";
import SideBarProvider from "./SideBarProvider";
import LandingPage from "./Component/Public/Pages";
import Users from "./Component/Admin/Pages/Users";

const SideBarProviderRoot = () => <SideBarProvider><AuthRoot /></SideBarProvider>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <OpenRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: <SideBarProviderRoot />,
        children: [
          {
            path: "/user",
            //Absolute route path "/" nested under path "/user" is not valid. An absolute child route path must start with the combined path of all its parent routes i.e. "/user" instead of "/".
            element: <>Hii</>,
          },
          {
            path: "/user/dashboard",
            element: <TextAlert />,
          },
        ],
      },
      {
        path: "/admin",
        element: <SideBarProviderRoot />,
        children: [
          {
            path: "/admin",
            element: <>Hii3</>,
          },
          {
            path: "/admin/dashboard",
            element: <>Admin Dashboard</>,
          },
          {
            path: "/admin/profile",
            element: <>Profile</>,
          },
          {
            path: "/admin/setting",
            element: <>Setting</>,
          },
          {
            path: "/admin/users",
            element: <Users />,
          },
        ],
      },
      {
        path: "/superAdmin",
        element: <SideBarProviderRoot />,
      },
    ],
  },
]);

const portalDiv = document.getElementById("root")!;

ReactDOM.createRoot(portalDiv).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();
