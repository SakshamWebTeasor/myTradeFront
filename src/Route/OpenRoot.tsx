import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

function OpenRoot() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default OpenRoot;
