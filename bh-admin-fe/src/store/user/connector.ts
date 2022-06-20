import { connect } from "react-redux";
import { RootReducer } from "..";
import * as actions from "./actions";
import { addUpdate } from "../update/actions";

const mapState = ({ user }: RootReducer) => ({
  ...user,
});

const UserConnector = connect(mapState, { ...actions, addUpdate });
export default UserConnector;
