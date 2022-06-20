import client from "../client";

const BASEPATH = "/info";

export const getInfos = (path: string) => client.get(`${BASEPATH}${path}`);
