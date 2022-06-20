import { AxiosError, AxiosResponse } from "axios";
import { Action } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { ConsoleApi } from "./api";
import {
  RequestConsole,
  REQUEST_API,
  REQUEST_API_FAILURE,
  REQUEST_API_SUCCESS,
} from "./types";

const requestApiSaga = function* (action: Action<RequestConsole>) {
  try {
    const response: AxiosResponse<string> = yield call(
      ConsoleApi,
      action.payload
    );

    yield put({
      type: REQUEST_API_SUCCESS,
      payload: response.data,
    });
  } catch (err: any) {
    yield put({
      type: REQUEST_API_FAILURE,
      payload: JSON.stringify((err as AxiosError).response?.data, null, "\t"),
    });
  }
};

export default function* consoleSaga() {
  yield takeLatest(REQUEST_API, requestApiSaga);
}
