import client from "../client";

const BASEPATH = "/apiService";

export const applyApi = (encBody: string) =>
  client.post(`${BASEPATH}/apply`, encBody);
