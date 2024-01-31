import React, { useState } from "react";
import { register } from "../../Api";
import { registerUserApi, registerUserErr, role } from "../../Interface";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { showSwal } from "../ShowAlert";
import {
  isValidAadhar,
  isValidEmail,
  isValidMobile,
  isValidPan,
  isValidPassword,
} from "../Validation/Validations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const handleRegisterInputChange = (
  field: keyof registerUserApi,
  value: string,
  setRegisterDetails: (value: React.SetStateAction<registerUserApi>) => void,
  setRegisterDetailsErr: (value: React.SetStateAction<registerUserErr>) => void
) => {
  switch (field) {
    case "fname":
      setRegisterDetails((prevDetails) => {
        let lastName = prevDetails.name.split(" ")[1];
        return {
          ...prevDetails,
          name: value + " " + lastName,
        };
      });
      break;
    case "lname":
      setRegisterDetails((prevDetails) => {
        let firstName = prevDetails.name.split(" ")[0];
        return {
          ...prevDetails,
          name: firstName + " " + value,
        };
      });
      break;
    case "mobile_no":
      setRegisterDetails((prevDetails) => ({
        ...prevDetails,
        mobile_no: parseInt(value),
      }));
      setRegisterDetailsErr((prevDetails) => ({
        ...prevDetails,
        mobile_no: isValidMobile(value),
      }));
      break;
    case "email":
      setRegisterDetails((prevDetails) => ({
        ...prevDetails,
        email: value,
      }));
      setRegisterDetailsErr((prevDetails) => ({
        ...prevDetails,
        email: isValidEmail(value),
      }));
      break;
    case "aadhar_no":
      setRegisterDetails((prevDetails) => ({
        ...prevDetails,
        aadhar_no: value,
      }));
      setRegisterDetailsErr((prevDetails) => ({
        ...prevDetails,
        aadhar_no: isValidAadhar(value),
      }));
      break;
    case "pan_no":
      setRegisterDetails((prevDetails) => ({
        ...prevDetails,
        pan_no: value,
      }));
      setRegisterDetailsErr((prevDetails) => ({
        ...prevDetails,
        pan_no: isValidPan(value),
      }));
      break;
    case "password":
      setRegisterDetails((prevDetails) => ({
        ...prevDetails,
        password: value,
      }));
      setRegisterDetailsErr((prevDetails) => ({
        ...prevDetails,
        password: isValidPassword(value),
      }));
      break;
    case "confirmPassword":
      let password:any
      setRegisterDetails((prevDetails) => {
        password = prevDetails.password
        return {
        ...prevDetails,
        confirmPassword: value,
      }});
      setRegisterDetailsErr((prevDetails) => {
        console.log('prevDetails.password, value',prevDetails, password);
        return {
          ...prevDetails,
          confirmPassword:
          password === value ? "" : "Password does not match",
        };
      });
      break;
    case "role":
      setRegisterDetails((prevDetails) => ({
        ...prevDetails,
        role: value == role.admin ? role.admin : role.user,
      }));
      setRegisterDetailsErr((prevDetails) => ({
        ...prevDetails,
        confirmPassword:
          prevDetails.password === value ? "" : "Password does not match",
      }));
      break;
    default:
      setRegisterDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
      break;
  }
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        let response = await register(registerDetails);
        dispatch(loginSuccess(response.data.user, response.data.token));
        showSwal("Success", response.data.message, 200, () =>
          navigate("/user/dashboard")
        );
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-1/4">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex">
            <div className="w-full">
              <div className="mb-4 me-1">
                <label
                  htmlFor="fname"
                  className="block text-gray-600 text-sm font-medium mb-2"
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
                  className="block text-gray-600 text-sm font-medium mb-2"
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
              className="block text-gray-600 text-sm font-medium mb-2"
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
              className="block text-gray-600 text-sm font-medium mb-2"
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
              className="block text-gray-600 text-sm font-medium mb-2"
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
              className="block text-gray-600 text-sm font-medium mb-2"
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
              className="block text-gray-600 text-sm font-medium mb-2"
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
              className="block text-gray-600 text-sm font-medium mb-2"
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
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </div>
            </div>
            <p id="mobileError" className="text-red-500">
              {registerDetailsErr.password !== "" &&
                registerDetailsErr.password}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 text-sm font-medium mb-2"
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Register
          </button>
        </form>
        <div className="flex justify-end">
          <button
            className="my-4 bg-blue-500 text-white p-1 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            onClick={() => navigate("/login")}
          >
            Go To Login Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
