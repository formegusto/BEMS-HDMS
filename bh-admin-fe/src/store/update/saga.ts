import { call, put, select, takeLatest } from "redux-saga/effects";
import { symmetricEncrypt } from "src/utils/ARIAUtils";
import {
  SAVE_UPDATE,
  SAVE_UPDATE_FAILURE,
  SAVE_UPDATE_SUCCESS,
  UpdateForm,
} from "./types";

function* saveSaga() {
  try {
    const updates: UpdateForm[] = yield select((state) => state.update.updates);

    for (let i = 0; i < updates.length; i++) {
      if (updates[i].action) {
        if (updates[i].action.requestInfo) {
          const { id, body, query } = updates[i].action.requestInfo;

          let params = [];

          id && params.push(id);

          if (body) {
            const symKey: string = yield select(
              (state) => state.sessionCert.symmetricKey
            );
            params.push(symmetricEncrypt(JSON.stringify(body), symKey));
          }

          query && params.push(query);

          yield call(updates[i].action.api, ...params);
        } else {
          yield call(updates[i].action.api);
        }
      }
    }

    yield put({
      type: SAVE_UPDATE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SAVE_UPDATE_FAILURE,
    });
  }
}

export default function* updateSaga() {
  yield takeLatest(SAVE_UPDATE, saveSaga);
}
