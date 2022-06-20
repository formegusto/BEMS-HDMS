import { UPDATE_DATA } from "src/store/information/types";
import client from "../client";

const BASHPATH = "/admin/data";

export const getInfos = (infoPath: string) =>
  client.get(`${BASHPATH}${infoPath}`);
export const postInfos = (infoPath: string, body: UPDATE_DATA) =>
  client.post(`${BASHPATH}${infoPath}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
