import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";
import { setAuth } from "../auth/actions";

const mapState = ({ sessionCert }: RootReducer) => ({
  ...sessionCert,
});

const SessionCertConnector = connect(mapState, { ...actions, setAuth });
export default SessionCertConnector;
