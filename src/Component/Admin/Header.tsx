import React from "react";
import ButtonMemo from "./ButtonMemo";
import ButtonRef from "./ButtonRef";
import ButtonUseContext from "./ButtonUseContext";
import ButtonReducerIncDec from "./ButtonReducerIncDec";
import ReducerTodo from "./ReducerTodo";

interface HeaderProps {
}

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
