import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { createReduxStore } from "./redux";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={createReduxStore()}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
