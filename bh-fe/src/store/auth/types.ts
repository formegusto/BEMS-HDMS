import createActionTypes from "src/utils/createActionTypes";
import { ApiApplication } from "../apiApplication/types";
import { Response } from "../types";

// auth variable type
export interface ResponseAuth extends Response<any> {
  token?: string;
  user?: UserData;
}

export interface RequestSignIn {
  username: string;
  password: string;
}

export interface RequestSignUp extends RequestSignIn {
  name: string;
  organization: string;
  email: string;
  phone: string;
}

export interface SignUpForm extends RequestSignUp {
  passwordConfirm: string;
  termsOfUse: boolean;
  privacyPolicy: boolean;
}

export interface UserData {
  id: number;
  username: string;
  role: string;
  name: string;
  organization: string;
  apiApplication?: ApiApplication;
}

// redux action type
export const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createActionTypes("auth/signin");
export const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createActionTypes("auth/signup");
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createActionTypes("auth/check");
export const SETAUTH = "auth/set";
export const SET_AUTH_NEW_APPLICATION = "auth/set/new_application";
export const LOGOUT = "auth/logout";
export const CLEANAUTH = "auth/clean";
