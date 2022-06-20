import createRequestSaga from "src/utils/createRequestSaga";
import { ApiApplication, APPLY_API, SET_NEW_APPLICATION } from "./types";
import Api from "src/api";
import { put, takeLatest } from "redux-saga/effects";
import { Action } from "redux-actions";
import { SET_AUTH_NEW_APPLICATION } from "../auth/types";

const applyApiSaga = createRequestSaga<string>(
  APPLY_API,
  Api["ApiApplicationAPI"].applyApi,
  {
    encryption: {
      isEncrypt: true,
      isDecrypt: true,
    },
    alert: {
      infoMessage: "API 신청이 완료되었습니다.",
      isShowError: true,
    },
  }
);

function* setNewApplicationSaga(action: Action<ApiApplication>) {
  yield put<Action<ApiApplication>>({
    type: SET_AUTH_NEW_APPLICATION,
    payload: action.payload,
  });
}

export default function* apiApplicationSaga() {
  yield takeLatest(APPLY_API, applyApiSaga);
  yield takeLatest(SET_NEW_APPLICATION, setNewApplicationSaga);
}
