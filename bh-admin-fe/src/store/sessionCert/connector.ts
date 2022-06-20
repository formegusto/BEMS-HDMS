import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";

const mapState = ({ sessionCert }: RootReducer) => ({
  ...sessionCert,
});

const SessionCertConnector = connect(mapState, { ...actions });
export default SessionCertConnector;
