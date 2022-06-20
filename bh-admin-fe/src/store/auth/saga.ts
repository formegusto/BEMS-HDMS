import { takeLatest } from "redux-saga/effects";
import Api from "src/api";
import createRequestSaga from "src/utils/createRequestSaga";
import { CHECK, SIGNIN } from "./types";

const signInSaga = createRequestSaga(SIGNIN, Api["AuthAPI"].signIn, {
  encryption: {
    isEncrypt: true,
    isDecrypt: true,
  },
});
const checkSaga = createRequestSaga(CHECK, Api["AuthAPI"].check, {
  encryption: {
    isDecrypt: true,
  },
});

export default function* authSaga() {
  yield takeLatest(SIGNIN, signInSaga);
  yield takeLatest(CHECK, checkSaga);
}
