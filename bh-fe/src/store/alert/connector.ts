import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";

const mapState = ({ alert }: RootReducer) => ({
  ...alert,
});
const AlertConnector = connect(mapState, { ...actions });
export default AlertConnector;
