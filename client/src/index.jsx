/* eslint-disable import/extensions */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

fetch("/homes", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(response => response.json())
  .then(myJson => {
    ReactDOM.render(<App homes={myJson} />, document.getElementById("results"));
  })
  .catch(err => console.log(err));
