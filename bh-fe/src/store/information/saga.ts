import createRequestSaga from "src/utils/createRequestSaga";
import { GET_INFOS } from "./types";
import Api from "src/api";
import { takeLatest } from "redux-saga/effects";

const getInfosSaga = createRequestSaga(
  GET_INFOS,
  Api["InformationAPI"].getInfos,
  {
    encryption: {
      isDecrypt: true,
    },
  }
);

export function* informationSaga() {
  yield takeLatest(GET_INFOS, getInfosSaga);
}
