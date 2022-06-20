import { takeLatest } from "redux-saga/effects";
import Api from "src/api";
import createRequestSaga from "src/utils/createRequestSaga";
import { Response } from "../types";
import {
  GET_PUBLICKEY,
  PATCH_ESTABLISH,
  POST_SYMKEY,
  RequestEstablish,
  RequestSymmetricKey,
  ResponsePublicKey,
} from "./types";

const getPublicKeySaga = createRequestSaga<any, Response<ResponsePublicKey>>(
  GET_PUBLICKEY,
  Api["SessionCertAPI"].getPublicKey
);
const postSymmetricKeySaga = createRequestSaga<RequestSymmetricKey, string>(
  POST_SYMKEY,
  Api["SessionCertAPI"].postSymmetricKey
);
const patchEstablishSaga = createRequestSaga<any, RequestEstablish>(
  PATCH_ESTABLISH,
  Api["SessionCertAPI"].patchEstablish
);

export default function* sessionCertSaga() {
  yield takeLatest(GET_PUBLICKEY, getPublicKeySaga);
  yield takeLatest(POST_SYMKEY, postSymmetricKeySaga);
  yield takeLatest(PATCH_ESTABLISH, patchEstablishSaga);
}
