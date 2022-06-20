import {
  RequestSymmetricKey,
  ResponsePublicKey,
  RequestEstablish,
} from "src/store/sessionCert/types";
import { Response } from "src/store/types";
import client from "../client";
import { REQUEST_ENC_HEADER } from "../types";

const BASEPATH = "/sessionCert";

export const getPublicKey = () =>
  client.get<Response<ResponsePublicKey>>(`${BASEPATH}/publicKey`);

export const postSymmetricKey = (data: RequestSymmetricKey) =>
  client.post(`${BASEPATH}/symmetricKey`, data);

export const patchEstablish = ({ id, encBodyStr }: RequestEstablish) =>
  client.patch(`${BASEPATH}/establish`, encBodyStr, {
    headers: {
      "session-cert-id": id.toString(),
      ...REQUEST_ENC_HEADER,
    },
  });
