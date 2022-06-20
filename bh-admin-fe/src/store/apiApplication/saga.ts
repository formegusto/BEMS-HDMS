import { takeLatest } from "redux-saga/effects";
import Api from "src/api";
import createRequestSaga from "src/utils/createRequestSaga";
import { GetApplicationsQuery, GET_APPLICATIONS } from "./types";

const getApplicationsSaga = createRequestSaga<GetApplicationsQuery>(
  GET_APPLICATIONS,
  Api["ApiApplicationAPI"].getApplicationList,
  {
    encryption: {
      isDecrypt: true,
    },
  }
);

export default function* apiApplicationSaga() {
  yield takeLatest(GET_APPLICATIONS, getApplicationsSaga);
}
