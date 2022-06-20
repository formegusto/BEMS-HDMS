import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./store";
import { Provider } from "react-redux";
import createSagaMW from "@redux-saga/core";
import RootSaga from "./store/saga";
import AlertModal from "./containers/common/AlertModal";
import SessionCertConfig from "./containers/common/SessionCertConfig";
import AuthCheck from "./containers/auth/AuthCheck";

const sagaMW = createSagaMW();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMW))
);
sagaMW.run(RootSaga);

ReactDOM.render(
  <Provider store={store}>
    <SessionCertConfig />
    <AuthCheck />
    <AlertModal />
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
