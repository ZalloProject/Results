/* eslint-disable import/extensions */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

fetch(
  "http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homes",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
)
  .then(response => response.json())
  .then(myJson => {
    myJson.forEach(home => Object.assign(home, { saved: false }));
    ReactDOM.render(<App homes={myJson} />, document.getElementById("results"));
  })
  .catch(err => console.log(err));
