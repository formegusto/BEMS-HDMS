import { all } from "redux-saga/effects";
import apiApplicationSaga from "./apiApplication/saga";
import authSaga from "./auth/saga";
import consoleSaga from "./console/saga";
import { informationSaga } from "./information/saga";
import sessionCertSaga from "./sessionCert/saga";

export default function* RootSaga() {
  yield all([
    sessionCertSaga(),
    authSaga(),
    apiApplicationSaga(),
    consoleSaga(),
    informationSaga(),
  ]);
}
