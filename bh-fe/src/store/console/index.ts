import { handleActions } from "redux-actions";
import { symmetricDecrypt } from "src/utils/ARIAUtils";
import {
  DECRYPT_RESPONSE,
  INIT_CONSOLE,
  REQUEST_API_FAILURE,
  REQUEST_API_SUCCESS,
} from "./types";

type ConsoleStore = {
  result?: string | null;
  decryptResult?: string | null;
};

const consoleStore: ConsoleStore = {
  result: null,
  decryptResult: null,
};

type Payload = string;

const consoleReducer = handleActions<ConsoleStore, Payload>(
  {
    [INIT_CONSOLE]: () => ({
      result: null,
      decryptResult: null,
    }),
    [REQUEST_API_SUCCESS]: (_, action) => ({
      result: action.payload,
      decryptResult: null,
    }),
    [REQUEST_API_FAILURE]: (_, action) => ({
      result: action.payload,
      decryptResult: null,
    }),
    [DECRYPT_RESPONSE]: (state, action) => ({
      ...state,
      decryptResult: symmetricDecrypt(state.result!, action.payload),
    }),
  },
  consoleStore
);

export default consoleReducer;
