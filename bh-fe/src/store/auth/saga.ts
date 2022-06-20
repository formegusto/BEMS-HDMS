import { put, takeLatest } from "redux-saga/effects";
import Api from "src/api";
import createRequestSaga from "src/utils/createRequestSaga";
import { showAlert } from "../alert/actions";
import { CHECK, CLEANAUTH, LOGOUT, SIGNIN, SIGNUP } from "./types";

const signInSaga = createRequestSaga<string>(SIGNIN, Api["AuthAPI"].signIn, {
  encryption: {
    isEncrypt: true,
    isDecrypt: true,
  },
  alert: {
    infoMessage: "로그인 되었습니다.",
    isShowError: true,
  },
});

const signUpSaga = createRequestSaga<string>(SIGNUP, Api["AuthAPI"].signUp, {
  encryption: {
    isEncrypt: true,
    isDecrypt: true,
  },
  alert: {
    infoMessage: "회원가입에 성공하였습니다.",
    isShowError: true,
  },
});

const checkSaga = createRequestSaga(CHECK, Api["AuthAPI"].check, {
  encryption: {
    isEncrypt: false,
    isDecrypt: true,
  },
});

function* logoutSaga() {
  yield put({
    type: CLEANAUTH,
  });

  sessionStorage.removeItem("auth");

  yield put(
    showAlert({
      type: "info",
      action: LOGOUT,
      message: "로그아웃 되었습니다.",
    })
  );
}

export default function* authSaga() {
  yield takeLatest(SIGNIN, signInSaga);
  yield takeLatest(SIGNUP, signUpSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
