import { AxiosResponse } from "axios";
import { Action } from "redux";
import { call, put, select } from "redux-saga/effects";
import { showAlert } from "src/store/alert/actions";
import { symmetricDecrypt, symmetricEncrypt } from "./ARIAUtils";

type EncryptionOption = {
  isEncrypt?: boolean;
  isDecrypt?: boolean;
};

type AlertOption = {
  infoMessage?: string;
  isShowError?: boolean;
};

type Options = {
  encryption?: EncryptionOption;
  alert?: AlertOption;
};

interface SagaAction<Payload = any> extends Action<string> {
  payload: Payload;
  error?: boolean;
}

export default function createRequestSaga<P = any, AR = any>(
  type: string,
  request: (...params: P[]) => Promise<AxiosResponse<AR>>,
  options?: Options
) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: SagaAction<P>) {
    // clickevent 때어놓기
    let clickEvent = null;

    if (action.payload && (action.payload as any).clickEvent) {
      clickEvent = (action.payload as any).clickEvent;
      delete (action.payload as any).clickEvent;
    }
    try {
      if (options?.encryption) {
        const { isEncrypt, isDecrypt } = options.encryption;

        if (isEncrypt) {
          const symKey: string = yield select(
            (state) => state.sessionCert.symmetricKey
          );
          action.payload = symmetricEncrypt(
            JSON.stringify(action.payload),
            symKey
          ) as any;
        }
        const response: AxiosResponse<AR> = yield call(request, action.payload);
        if (isDecrypt) {
          const symKey: string = yield select(
            (state) => state.sessionCert.symmetricKey
          );
          const decBody = symmetricDecrypt(response.data as any, symKey);

          yield put<SagaAction<AR>>({
            type: SUCCESS,
            payload: JSON.parse(decBody),
          });
        } else {
          yield put<SagaAction<AR>>({
            type: SUCCESS,
            payload: response.data,
          });
        }
      } else {
        const response: AxiosResponse<AR> = yield call(request, action.payload);

        yield put<SagaAction<AR>>({
          type: SUCCESS,
          payload: response.data,
        });
      }

      if (options?.alert) {
        if (options.alert.infoMessage) {
          yield put(
            showAlert({
              type: "info",
              action: type,
              message: options.alert.infoMessage,
              clickEvent: clickEvent,
            })
          );
        }
      }
    } catch (e: any) {
      console.error(e);
      yield put({
        type: FAILURE,
      });
      if (options?.alert) {
        if (options.alert.isShowError) {
          yield put(
            showAlert({
              type: "error",
              action: type,
              message: e.response.data.error.message,
              clickEvent: clickEvent,
            })
          );
        }
      }
    }
  };
}
