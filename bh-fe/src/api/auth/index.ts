import client from "../client";

const BASEPATH = "/user";

export const signIn = (encBody: string) =>
  client.post(`${BASEPATH}/signin`, encBody);

export const signUp = (encBody: string) =>
  client.post(`${BASEPATH}/signup`, encBody);

export const check = () => client.get(`${BASEPATH}/check`);
