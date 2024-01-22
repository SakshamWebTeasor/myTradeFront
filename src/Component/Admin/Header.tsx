import React from "react";
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

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {/* <ButtonMemo /> */}
      {/* <ButtonRef /> */}
      {/* <ButtonUseContext /> */}
      {/* <ButtonReducerIncDec /> */}
      {/* <ReducerTodo /> */}
      {/* <CallbackUse /> */}
      <header className="bg-gray-800 text-white p-4 justify-between flex">
        <div className="text-2xl font-bold">Dashboard</div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-white hover:text-gray-300"
            onClick={() => {
              dispatch(logout());
              showSwal("Loggin Out", "", 200, () => navigate("/"));
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
