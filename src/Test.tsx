import React from "react";
import { login } from "./Api";
import { loginUserApi } from "./Interface";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/action";
import { useNavigate } from "react-router-dom";
import { showSwal } from "./Component/ShowAlert";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = "" + data.get("username");
    let password = "" + data.get("password");
    const myData: loginUserApi = { email, password };
    try {
      let response = await login(myData);
      dispatch(loginSuccess(response.data.user, response.data.token));
      let roleToNavigate =
        response.data.user.role === "admin" ||
        response.data.user.role === "superAdmin"
          ? "admin"
          : "user";
      showSwal("Success", response.data.message, 200, () =>
        navigate(`/${roleToNavigate}/dashboard`)
      );
    } catch (error: any) {
      console.log(error.response);
      showSwal("Failure", error.response.data.message, 400, undefined);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
