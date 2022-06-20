import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";
import { addUpdate } from "../update/actions";

const mapState = ({ apiApplication }: RootReducer) => ({
  ...apiApplication,
});
const ApiApplicationConnector = connect(mapState, { ...actions, addUpdate });
export default ApiApplicationConnector;
