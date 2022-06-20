import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";

const mapState = ({ apiApplication, auth }: RootReducer) => ({
  ...apiApplication,
  application: auth.user?.apiApplication,
});

const ApiApplicationConnector = connect(mapState, { ...actions });
export default ApiApplicationConnector;
