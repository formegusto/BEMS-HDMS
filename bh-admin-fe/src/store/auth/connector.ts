import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";

const mapState = ({ auth }: RootReducer) => ({
  ...auth,
});

const AuthConnector = connect(mapState, { ...actions });
export default AuthConnector;
