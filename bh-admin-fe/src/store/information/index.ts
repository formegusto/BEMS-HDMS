import { handleActions } from "redux-actions";
import {
  Building,
  OPEN_CREATE_MODE,
  GET_INFOS_SUCCESS,
  Report,
  ResponseGetInfo,
  Sensor,
  Unit,
  UPDATE_DATA,
  OPEN_UPDATE_MODE,
  VIEWMODE,
  CLOSE_CREATE_MODE,
  INIT_INFOS,
} from "./types";

type InforamtionStore = {
  buildings?: Building[] | null;
  units?: Unit[] | null;
  sensors?: Sensor[] | null;
  reports?: Report[] | null;
  viewMode?: VIEWMODE | null;
  updateData?: Building | Unit | Sensor | null;
};

const informationStore: InforamtionStore = {
  buildings: null,
  units: null,
  sensors: null,
  reports: null,
  viewMode: null,
  updateData: null,
};

type Payload = ResponseGetInfo &
  VIEWMODE & { viewMode: VIEWMODE; updateData: UPDATE_DATA };
const informationReducer = handleActions<InforamtionStore, Payload>(
  {
    [INIT_INFOS]: (state, action) => ({
      buildings: null,
      units: null,
      sensors: null,
      reports: null,
      viewMode: null,
      updateData: null,
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
        : action.payload.target === "report"
        ? {
            reports: action.payload.data as Report[],
          }
        : {}),
    }),
    [OPEN_CREATE_MODE]: (state, action) => ({
      ...state,
      viewMode: {
        ...action.payload,
      },
    }),
    [OPEN_UPDATE_MODE]: (state, action) => ({
      ...state,
      viewMode: {
        ...action.payload.viewMode,
      },
      updateData: {
        ...action.payload.updateData,
      },
    }),
    [CLOSE_CREATE_MODE]: (state, action) => ({
      ...state,
      viewMode: null,
    }),
  },
  informationStore
);
export default informationReducer;
