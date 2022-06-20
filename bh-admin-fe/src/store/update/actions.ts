import { createAction } from "redux-actions";
import { ADD_UPDATE, REMOVE_UPDATE, SAVE_UPDATE, UpdateForm } from "./types";

export const addUpdate = createAction<UpdateForm>(ADD_UPDATE);
export const removeUpdate = createAction<number>(REMOVE_UPDATE);
export const saveUpdate = createAction(SAVE_UPDATE);
