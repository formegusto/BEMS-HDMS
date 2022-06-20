import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";

const mapState = ({ update }: RootReducer) => ({
  ...update,
});

const UpdateConnector = connect(mapState, { ...actions });
export default UpdateConnector;
