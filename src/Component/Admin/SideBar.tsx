import React from "react";
import { menuItems } from "../../Interface";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action";

type Props = {
  sideBarItems: menuItems;
};

function SideBar({ sideBarItems }: Props) {
  const dispatch = useDispatch();
  return (
    <aside className="xl:w-80 md:w-64 w-44 bg-gray-900 text-white min-h-screen p-4">
      <div className="text-2xl font-bold mb-8">Menu</div>
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
