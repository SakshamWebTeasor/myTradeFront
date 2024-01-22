import React, { useEffect, useState } from "react";
import { User } from "../../../Interface";
import { getAdminUsers } from "../../../Api";
import { useSelector } from "react-redux";
import { showSwal } from "../../ShowAlert";
import { useLocation } from "react-router-dom";

type Props = {};

function Users({}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const loginToken = useSelector((state: any) => state.reducer.userToken);

  const fetchUsers = async () => {
    try {
      let response = await getAdminUsers({ token: loginToken });
      setUsers(response.data.users);
    } catch (error: any) {
      console.log(error.response);
      showSwal(
        "Unable to fetch users",
        error.response.data.message,
        400,
        undefined
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-2 border-slate-700">
              Name
            </th>
            <th className="py-2 px-4 border-b border-2 border-slate-700">
              Email
            </th>
            <th className="py-2 px-4 border-b border-2 border-slate-700">
              Role
            </th>
            <th className="py-2 px-4 border-b border-2 border-slate-700">
              Mobile
            </th>
            <th className="py-2 px-4 border-b border-2 border-slate-700"></th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className={"bg-gray-100"}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.mobile}</td>
              <td className="py-2 px-4 border-b">Edit</td>
              {/* Add more cells for additional columns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
