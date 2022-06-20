import { connect } from "react-redux";
import { RootReducer } from "../";
import * as actions from "./actions";

const mapState = ({ auth, sessionCert }: RootReducer) => ({
  ...auth,
  ...sessionCert,
});

const AuthConnector = connect(mapState, { ...actions });
export default AuthConnector;
