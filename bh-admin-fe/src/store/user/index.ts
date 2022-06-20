import { handleActions } from "redux-actions";
import { GetUsersResponse, GET_USER_LIST_SUCCESS, ResponseUser } from "./types";

type UserStore = {
  users?: GetUsersResponse | null;
};

const userStore: UserStore = {
  users: null,
};

type Payload = ResponseUser;
const userReducer = handleActions<UserStore, Payload>(
  {
    [GET_USER_LIST_SUCCESS]: (state, action) => ({
      ...state,
      users: {
        ...action.payload,
      },
    }),
  },
  userStore
);

export default userReducer;
