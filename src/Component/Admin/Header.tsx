import React from "react";
import ButtonMemo from "./EasyDev/ButtonMemo";
import ButtonRef from "./EasyDev/ButtonRef";
import ButtonUseContext from "./EasyDev/ButtonUseContext";
import ButtonReducerIncDec from "./EasyDev/ButtonReducerIncDec";
import ReducerTodo from "./EasyDev/ReducerTodo";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      {/* <ButtonMemo /> */}
      {/* <ButtonRef /> */}
      {/* <ButtonUseContext /> */}
      {/* <ButtonReducerIncDec /> */}
      <ReducerTodo />
    </>
  );
};

export default Header;
