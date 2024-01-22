import { User } from "../../../Interface";
import { getAdminUsers } from "../../../Api";
import { useSelector } from "react-redux";
import { showSwal } from "../../ShowAlert";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {};

const UsersData = () => {
  const loginToken = useSelector((state: any) => state.reducer.userToken);
  const {
    isPending,
    error,
    data,
  }: { isPending: boolean; error: any; data: AxiosResponse<any, any> | any } =
    useQuery({
      queryKey: ["adminUsers"],
      queryFn: async () => await getAdminUsers({ token: loginToken }),
    });
  if (isPending)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  if (error) {
    console.log(error.response);
    showSwal(
      "Unable to fetch users",
      error.response.data.message,
      400,
      undefined
    );
    return (
      <tr>
        <td>An error has occurred: {error.response.data.message}</td>
      </tr>
    );
  }
  const users: User[] = data.users;
  return (
    <>
      {users.map((user, index) => (
        <tr key={user._id} className={"bg-gray-100"}>
          <td className="py-2 px-4 border-b">{index + 1}</td>
          <td className="py-2 px-4 border-b">{user.name}</td>
          <td className="py-2 px-4 border-b">{user.email}</td>
          <td className="py-2 px-4 border-b">{user.role}</td>
          <td className="py-2 px-4 border-b">{user.mobile}</td>
          <td className="py-2 px-4 border-b">Edit</td>
          {/* Add more cells for additional columns */}
        </tr>
      ))}
    </>
  );
};

function Users({}: Props) {
  return (
    <div className="container mx-auto p-4">
      <div className="w-full flex justify-end mb-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New User
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-2 border-slate-700">
              Sr. No.
            </th>
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
        <tbody>{<UsersData />}</tbody>
      </table>
    </div>
  );
}

export default Users;
