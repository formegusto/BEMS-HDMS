import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import sessionCertSaga from "./sessionCert/saga";
import updateSaga from "./update/saga";
import userSaga from "./user/saga";
import apiApplicationSaga from "./apiApplication/saga";
import { informationSaga } from "./information/saga";

export default function* RootSaga() {
  yield all([
    sessionCertSaga(),
    authSaga(),
    userSaga(),
    updateSaga(),
    apiApplicationSaga(),
    informationSaga(),
  ]);
}
