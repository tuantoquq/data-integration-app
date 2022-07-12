import "./App.css";
import React from "react";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./store/store";
function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <div className="App">
          <Router></Router>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
