import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faCircleLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { handleRegisterInputChange } from "../../Public/Register";
import { registerUserApi, registerUserErr } from "../../../Interface";
import { useSelector } from "react-redux";
import { showSwal } from "../../ShowAlert";

function AddUser() {
  const navigate = useNavigate();

  const loginToken = useSelector((state: any) => state.reducer.userToken);

  const [registerDetails, setRegisterDetails] = useState<registerUserApi>({
    name: "",
    email: "",
    mobile_no: 0,
    password: "",
    confirmPassword: "",
    gender: "",
    aadhar_no: "",
    pan_no: "",
  });

  const [registerDetailsErr, setRegisterDetailsErr] = useState<registerUserErr>(
    {
      name: "",
      email: "",
      mobile_no: "",
      password: "",
      confirmPassword: "",
      gender: "",
      aadhar_no: "",
      pan_no: "",
    }
  );

  const isRegisterDetailsErrEmpty = (errors: registerUserErr): boolean => {
    return Object.values(errors).every((value) => value === "");
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isRegisterDetailsErrEmpty(registerDetailsErr)) {
        // let response = await register(registerDetails);
        // dispatch(loginSuccess(response.data.user, response.data.token));
        showSwal("Success", "", 200);
      } else {
        showSwal(
          "Invalid Details",
          "Please fullfill all creadentials requirement to pass",
          400,
          undefined
        );
      }
    } catch (error: any) {
      console.log(error.response);
      showSwal(
        error.response.data.message,
        error.response.data.error,
        400,
        undefined
      );
    }
  };

  return (
    <div>
      <strong className="text-2xl w-100 flex justify-start mt-2 ml-3">
        <FontAwesomeIcon
          icon={faCircleLeft}
          onClick={() => navigate(window.location.pathname.split("/add")[0])}
        />
        <div className="ml-5">Add New User</div>
      </strong>
      <div className="container mx-auto p-4 mt-8 bg-black border-2">
        <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-full">
            <div className="mb-4 me-1">
              <label
                htmlFor="fname"
                className="block text-white text-sm font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                onChange={(e) =>
                  handleRegisterInputChange(
                    "fname",
                    e.target.value,
                    setRegisterDetails,
                    setRegisterDetailsErr
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mb-4 ms-1">
              <label
                htmlFor="lname"
                className="block text-white text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                onChange={(e) =>
                  handleRegisterInputChange(
                    "lname",
                    e.target.value,
                    setRegisterDetails,
                    setRegisterDetailsErr
                  )
                }
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) =>
              handleRegisterInputChange(
                "email",
                e.target.value,
                setRegisterDetails,
                setRegisterDetailsErr
              )
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <p id="emailError" className="text-red-500">
            {registerDetailsErr.email !== "" && registerDetailsErr.email}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile_no"
            className="block text-white text-sm font-medium mb-2"
          >
            Mobile Number
          </label>
          <input
            type="number"
            id="mobile_no"
            name="mobile_no"
            onChange={(e) =>
              handleRegisterInputChange(
                "mobile_no",
                e.target.value,
                setRegisterDetails,
                setRegisterDetailsErr
              )
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <p id="mobileError" className="text-red-500">
            {registerDetailsErr.mobile_no !== "" &&
              registerDetailsErr.mobile_no}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-white text-sm font-medium mb-2"
          >
            Select Your Gender
          </label>
          <div className="flex">
            <select
              id="gender"
              name="gender"
              value={registerDetails.gender}
              onChange={(e) =>
                handleRegisterInputChange(
                  "gender",
                  e.target.value,
                  setRegisterDetails,
                  setRegisterDetailsErr
                )
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="preferNotToSay">Prefer Not to Say</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="aadhar_no"
            className="block text-white text-sm font-medium mb-2"
          >
            Aadhar Number
          </label>
          <input
            type="number"
            id="aadhar_no"
            name="aadhar_no"
            onChange={(e) =>
              handleRegisterInputChange(
                "aadhar_no",
                e.target.value,
                setRegisterDetails,
                setRegisterDetailsErr
              )
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <p id="mobileError" className="text-red-500">
            {registerDetailsErr.aadhar_no !== "" &&
              registerDetailsErr.aadhar_no}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="pan_no"
            className="block text-white text-sm font-medium mb-2"
          >
            PAN Number
          </label>
          <input
            type="text"
            id="pan_no"
            name="pan_no"
            onChange={(e) =>
              handleRegisterInputChange(
                "pan_no",
                e.target.value,
                setRegisterDetails,
                setRegisterDetailsErr
              )
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <p id="mobileError" className="text-red-500">
            {registerDetailsErr.pan_no !== "" && registerDetailsErr.pan_no}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={(e) =>
                handleRegisterInputChange(
                  "password",
                  e.target.value,
                  setRegisterDetails,
                  setRegisterDetailsErr
                )
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <div
              onClick={togglePasswordVisibility}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none ml-2"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>
          <p id="mobileError" className="text-red-500">
            {registerDetailsErr.password !== "" && registerDetailsErr.password}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-white text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) =>
                handleRegisterInputChange(
                  "confirmPassword",
                  e.target.value,
                  setRegisterDetails,
                  setRegisterDetailsErr
                )
              }
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <div
              onClick={togglePasswordVisibility}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none ml-2"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>
          <p id="mobileError" className="text-red-500">
            {registerDetailsErr.confirmPassword !== "" &&
              registerDetailsErr.confirmPassword}
          </p>
        </div>
        {/* Add more fields as needed (e.g., gender, age, aadhar_no, pan_no) */}
        <button
          type="submit"
          className="min-w-fit w-1/3 mt-8 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Add User
        </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
