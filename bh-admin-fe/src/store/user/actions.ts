import { createAction } from "redux-actions";
import { GetUsersQuery, GET_USER_LIST } from "./types";

export const getUserList = createAction<GetUsersQuery | null>(GET_USER_LIST);
