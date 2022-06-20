import createActionType from "src/utils/createActionType";

// sessionCert variable type
export interface ResponsePublicKey {
  sessionCert: {
    id: number;
    publicKey: string;
  };
}

export interface RequestSymmetricKey {
  id: number;
  symmetricKey: string;
}

export interface RequestEstablish {
  id: number;
  encBodyStr: string;
}

export const [GET_PUBLICKEY, GET_PUBLICKEY_SUCCESS, GET_PUBLICKEY_FAILURE] =
  createActionType("sessionCert/publickey");
export const [POST_SYMKEY, POST_SYMKEY_SUCCESS, POST_SYMKEY_FAILURE] =
  createActionType("sessionCert/symmetricKey");
export const [
  PATCH_ESTABLISH,
  PATCH_ESTABLISH_SUCCESS,
  PATCH_ESTABLISH_FALURE,
] = createActionType("sessionCert/establish");
export const SAVE_SYMKEY = "sessionCert/save/symmetricKey";
