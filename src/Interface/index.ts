export enum role {
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
  _id?: string
}

export interface loginUserApi {
  email: string;
  password: string;
}

export interface registerUserApi {
  name: string;
  gender?: string;
  age?: number;
  email: string;
  aadhar_no?: string;
  pan_no?: string;
  mobile_no: number;
  password: string;
  confirmPassword: string;
  fname?:string;
  lname?:string;
  role?: role;
}

export interface registerUserErr {
  name: string;
  gender?: string;
  age?: string;
  email: string;
  aadhar_no?: string;
  pan_no?: string;
  mobile_no: string;
  password: string;
  confirmPassword: string;
  fname?:string
  lname?:string
}

export interface menuItems {
  dashboard: menuItemData;
  users?: menuItemData;
  orders?: menuItemData;
  profile?: menuItemData;
  notifications?: menuItemData;
  setting?: menuItemData;
  logout?: menuItemData;
}

export interface menuItemData {
  name: string;
  path: string;
}

export interface AuthSimpleGetFecth {
  token: string;
}