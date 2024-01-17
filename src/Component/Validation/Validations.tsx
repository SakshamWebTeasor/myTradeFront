export const isValidMobile: (mobile: string) => string = (mobile: string) => {
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    return "Invalid Mobile No";
  }
  return "";
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (email: string) => {
  let valid = emailRegex.test(email);
  return valid ? "" : "Invalid Email";
};

export const isValidPassword = (password: string) => {
  const errorS = [];
  if (password.length < 8) {
    errorS.push("8 characters");
  }
  if (!/[a-z]/.test(password)) {
    errorS.push("one lowercase letter");
  }
  if (!/[A-Z]/.test(password)) {
    errorS.push("one uppercase letter");
  }
  if (!/\d/.test(password)) {
    errorS.push("one numberical digit");
  }
  if (!/[@$!%*?&]/.test(password)) {
    errorS.push("one special character");
  }
  if (errorS.length > 0) {
    return `Password must have at least [${errorS.join(", ")}]`;
  }
  return "";
};

export const isValidPan = (pan: string) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  if (!panRegex.test(pan)) {
    return "Invalid PAN No"
  }
  return ""
};

export const isValidAadhar = (aadhar: string) => {
  const aadharRegex = /^\d{12}$/;
  if (!aadharRegex.test(aadhar)) {
    return "Invalid Aadhar No"
  }
  return ""
};
