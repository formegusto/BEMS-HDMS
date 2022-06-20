import { createAction } from "redux-actions";
import {
  PATCH_ESTABLISH,
  GET_PUBLICKEY,
  RequestSymmetricKey,
  POST_SYMKEY,
  SAVE_SYMKEY,
  RequestEstablish,
} from "./types";

export const getPublicKey = createAction(GET_PUBLICKEY);
export const postSymKey = createAction<RequestSymmetricKey>(POST_SYMKEY);
export const saveSymKey = createAction<string>(SAVE_SYMKEY);
export const patchEstablish = createAction<RequestEstablish>(PATCH_ESTABLISH);
