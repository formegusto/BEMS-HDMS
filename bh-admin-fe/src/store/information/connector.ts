import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";

const mapState = ({ information, sessionCert }: RootReducer) => ({
  ...information,
  sessionCert: sessionCert.id,
});

const InformationConnector = connect(mapState, { ...actions });
export default InformationConnector;
