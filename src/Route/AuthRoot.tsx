import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { showSwal } from "../Component/ShowAlert";
import { logout } from "../redux/action";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Component/Admin/Header";
import Footer from "../Component/Admin/Footer";
import SideBar from "../Component/Admin/SideBar";
import { menuItems } from "../Interface";

type Props = {};

function AuthRoot({}: Props) {
  const loginToken = useSelector((state: any) => state.reducer.userToken);
  const loginDetail = useSelector((state: any) => state.reducer.userLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideBarItems: menuItems = {
    dashboard: {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    setting: {
      name: "Profile",
      path: "/admin/profile",
    },
    logout: {
      name: "Logout",
      path: "/login",
    },
  };
  useEffect(() => {
    if (loginToken) {
      const decodedToken = jwtDecode(loginToken);
      const expirationTime = decodedToken.exp;
      const currentTime = Date.now() / 1000;
      if (expirationTime && currentTime > expirationTime) {
        console.log("Token has expired");
        dispatch(logout());
        showSwal("Token Expired", "Loggin Out", 400, () => navigate("/"));
      }
      if (
        window.location.pathname.split("/")[1] !== loginDetail.role ||
        window.location.pathname.split("/")[1] === "superAdmin"
      ) {
        let roleToNavigate =
          loginDetail.role === "admin" || loginDetail.role === "superAdmin"
            ? "admin"
            : "user";
        navigate(`/${roleToNavigate}/dashboard`);
      }
      if (window.location.pathname.split("/")[2] === undefined) {
        navigate(`/${window.location.pathname.split("/")[1]}/dashboard`);
      }
    } else {
      console.log("No Token Found");
      dispatch(logout());
      showSwal("No Token Found", "Loggin Out", 400, () => navigate("/login"));
    }
  }, [loginToken]);
  return (
    <>
      <div className="w-full flex">
        <SideBar sideBarItems={sideBarItems} />
        <div className="w-full h-full">
          <Header />
          <div className="min-h-96">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      {/* <SideBar /> */}
    </>
  );
}

export default AuthRoot;
