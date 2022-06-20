import { handleActions } from "redux-actions";
import {
  Building,
  Unit,
  Sensor,
  GET_INFOS_SUCCESS,
  ResponseGetInfo,
  INIT_INFOS,
} from "./types";

type InformationStore = {
  buildings?: Building[] | null;
  units?: Unit[] | null;
  sensors?: Sensor[] | null;
};

const informationStore: InformationStore = {
  buildings: null,
  units: null,
  sensors: null,
};

type Payload = ResponseGetInfo;
const informationReducer = handleActions<InformationStore, Payload>(
  {
    [INIT_INFOS]: () => ({
      buildings: null,
      units: null,
      sensors: null,
    }),
    [GET_INFOS_SUCCESS]: (state, action) => ({
      ...state,
      ...(action.payload.target === "building"
        ? {
            buildings: action.payload.data as Building[],
          }
        : action.payload.target === "unit"
        ? {
            units: action.payload.data as Unit[],
          }
        : action.payload.target === "sensor"
        ? {
            sensors: action.payload.data as Sensor[],
          }
        : {}),
    }),
  },
  informationStore
);
export default informationReducer;
