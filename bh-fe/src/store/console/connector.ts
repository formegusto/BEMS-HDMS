import { connect } from "react-redux";
import { RootReducer } from "..";
import { showAlert } from "../alert/actions";
import * as actions from "./actions";

const mapState = ({ console, auth }: RootReducer) => ({
  ...console,
  user: auth.user,
});

const ConsoleConnector = connect(mapState, { ...actions, showAlert });
export default ConsoleConnector;
