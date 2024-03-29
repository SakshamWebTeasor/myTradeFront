import React, { useEffect, useState } from "react";
import ButtonMemo from "./EasyDev/ButtonMemo";
import ButtonRef from "./EasyDev/ButtonRef";
import ButtonUseContext from "./EasyDev/ButtonUseContext";
import ButtonReducerIncDec from "./EasyDev/ButtonReducerIncDec";
import ReducerTodo from "./EasyDev/ReducerTodo";
import CallbackUse from "./EasyDev/CallbackUse";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/action";
import { showSwal } from "../ShowAlert";
import { useSideBarContext } from "../../Providers/SideBarProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import "./Admin.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, toggleSidebar, activePage, setActivePage } =
    useSideBarContext();
  const [mySideBarOpen, setMySideBarOpen] = useState<boolean>(!isOpen);
  useEffect(() => {
    setTimeout(() => {
      setMySideBarOpen(isOpen);
    }, 150);
  }, [isOpen]);
  return (
    <>
      {/* <ButtonMemo /> */}
      {/* <ButtonRef /> */}
      {/* <ButtonUseContext /> */}
      {/* <ButtonReducerIncDec /> */}
      {/* <ReducerTodo /> */}
      {/* <CallbackUse /> */}
      <header className="bg-gray-800 text-white p-4 justify-between flex">
        <div className="text-2xl font-bold">
          <span hidden={mySideBarOpen} className="mr-3">
            <FontAwesomeIcon
              onClick={toggleSidebar}
              icon={faEllipsisVertical}
            />
          </span>
          {activePage}
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-white hover:text-gray-300"
            onClick={() => {
              dispatch(logout());
              localStorage.setItem("myProcess", "logout");
              showSwal("Logged Out", "", 200, () => navigate("/login"));
            }}
          >
            Logout
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
