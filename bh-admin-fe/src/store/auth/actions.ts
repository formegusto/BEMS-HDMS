import { createAction } from "redux-actions";
import { CHECK, SIGNIN, SignInInput } from "./types";

export const signIn = createAction<SignInInput>(SIGNIN);
export const check = createAction(CHECK);
