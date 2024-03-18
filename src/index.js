import "./all.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import "./Pages/Dashboard/dashboard.css";
import { BrowserRouter as Router } from "react-router-dom";
// import { TestContext } from "./Pages/Website/Context/TestContext";
import UserProvider from "./Pages/Website/Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// <TestContext.Provider value="Hello From Test Context">
// <App />
// </TestContext.Provider>
