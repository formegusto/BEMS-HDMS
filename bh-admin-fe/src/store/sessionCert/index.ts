import { handleActions } from "redux-actions";
import { Response } from "../types";
import {
  PATCH_ESTABLISH_SUCCESS,
  GET_PUBLICKEY_SUCCESS,
  ResponsePublicKey,
  SAVE_SYMKEY,
  POST_SYMKEY_SUCCESS,
} from "./types";

type SessionCert = {
  id: number | null;
  publicKey: string | null;
  symmetricKey: string | null;
};
interface SessionCertChain extends SessionCert {
  testString: string | null;
}
interface SessionCertStore extends SessionCert {
  tmp: SessionCertChain | null;
}

const sessionCertStore: SessionCertStore = {
  id: null,
  publicKey: null,
  symmetricKey: null,
  tmp: null,
};

type Payload = Response<ResponsePublicKey> | string;
const sessionCertReducer = handleActions<SessionCertStore, Payload>(
  {
    // step 1. request publicKey
    [GET_PUBLICKEY_SUCCESS]: (state, { payload }) => ({
      ...state,
      tmp: {
        ...(payload as Response<ResponsePublicKey>).sessionCert,
        symmetricKey: null,
        testString: null,
      },
    }),

    // step 2. save symetric key
    [SAVE_SYMKEY]: (state, { payload }) => ({
      ...state,
      tmp: {
        ...(state.tmp as SessionCertChain),
        symmetricKey: payload as string,
      },
    }),

    // step 3. store my symkey
    [POST_SYMKEY_SUCCESS]: (state, { payload }) => ({
      ...state,
      tmp: {
        ...(state.tmp as SessionCertChain),
        testString: payload as string,
      },
    }),

    // step 4. request establish
    [PATCH_ESTABLISH_SUCCESS]: (state) => ({
      ...(state.tmp as SessionCertChain),
      tmp: null,
    }),
  },
  sessionCertStore
);
export default sessionCertReducer;
