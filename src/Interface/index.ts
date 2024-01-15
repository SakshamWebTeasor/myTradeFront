enum role {
  user = "user",
  admin = "admin",
  superAdmin = "superAdmin",
}
export interface User {
  name: string;
  gender?: string;
  age?: number;
  email: string;
  aadhar_no?: string;
  pan_no?: string;
  role: role;
  mobile: number;
}


export interface loginUserApi {
  email: string;
  password: string;
}