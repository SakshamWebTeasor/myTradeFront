import React, { useEffect, useRef, useState } from "react";
import { menuItems } from "../../Interface";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSideBarContext } from "../../SideBarProvider";
import "./Admin.css";

type Props = {
  sideBarItems: menuItems;
};

function SideBar({ sideBarItems }: Props) {
  const { isOpen, toggleSidebar, activePage, setActivePage } = useSideBarContext();
  const [mySideBarOpen, setMySideBarOpen] = useState<Boolean>(!isOpen);
  const dispatch = useDispatch();
  const sideBarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    const sideBar = sideBarRef.current;
    if (sideBar) {
      if (!isOpen) {
        setTimeout(() => {
          sideBar.style.display = "none";
        }, 300);
      } else {
        sideBar.style.display = "block";
        sideBar.className = sideBar.className.replace(/\bopen\b/g, "closed");
      }
      setTimeout(() => {
        setMySideBarOpen(isOpen);
      }, 50);
    }
  }, [isOpen]);
  return (
    <aside
      id="sideBar"
      ref={sideBarRef}
      className={`xl:w-80 md:w-64 w-44 bg-gray-900 text-white min-h-screen p-4 ${
        !mySideBarOpen ? "closed" : "open"
      }`}
    >
      <div className="text-2xl font-bold mb-8 flex justify-between">
        <strong>Menu</strong>
        <FontAwesomeIcon onClick={toggleSidebar} icon={faCircleLeft} />
      </div>
      <nav>
        <ul>
          {Object.values(sideBarItems).map((sideBarItemData, index) => (
            <li className={`mb-2 ${location.pathname === sideBarItemData.path.toLowerCase() ? "active" : ""}`} key={index}>
              <Link
                to={sideBarItemData.path}
                className="hover:text-gray-300"
                onClick={() => {
                  if (sideBarItemData.name === "Logout") {
                    dispatch(logout());
                  }
                  setActivePage(sideBarItemData.name)
                }}
              >
                {sideBarItemData.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
