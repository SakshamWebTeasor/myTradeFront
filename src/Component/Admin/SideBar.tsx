import React from "react";
import { menuItems } from "../../Interface";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSideBarContext } from "../../SideBarProvider";

type Props = {
  sideBarItems: menuItems;
};

function SideBar({ sideBarItems }: Props) {
  const { isOpen, toggleSidebar } = useSideBarContext();
  const dispatch = useDispatch();
  return (
    <aside className="xl:w-80 md:w-64 w-44 bg-gray-900 text-white min-h-screen p-4" hidden={!isOpen}>
      <div className="text-2xl font-bold mb-8 flex justify-between">
        <strong>Menu</strong>
        <FontAwesomeIcon onClick={toggleSidebar} icon={faCircleLeft} />
      </div>
      <nav>
        <ul>
          {Object.values(sideBarItems).map((sideBarItemData, index) => (
            <li className="mb-2" key={index}>
              <Link
                to={sideBarItemData.path}
                className="hover:text-gray-300"
                onClick={() => {
                  if (sideBarItemData.name === "Logout") {
                    dispatch(logout());
                  }
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
