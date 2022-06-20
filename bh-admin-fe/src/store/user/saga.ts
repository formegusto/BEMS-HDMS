import { takeLatest } from "redux-saga/effects";
import Api from "src/api";
import createRequestSaga from "src/utils/createRequestSaga";
import { GetUsersQuery, GET_USER_LIST } from "./types";

const getUsersSaga = createRequestSaga<GetUsersQuery>(
  GET_USER_LIST,
  Api["UserAPI"].getUsers,
  {
    encryption: {
      isDecrypt: true,
    },
  }
);

export default function* userSaga() {
  yield takeLatest(GET_USER_LIST, getUsersSaga);
}
