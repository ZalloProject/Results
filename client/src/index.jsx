/* eslint-disable no-unused-expressions */
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
    const savedHomes =
      JSON.parse(window.localStorage.getItem("SavedHomes")) || [];
    myJson.forEach(home => {
      savedHomes.includes(home._id)
        ? Object.assign(home, { saved: true })
        : Object.assign(home, { saved: false });
    });
    window.dispatchEvent(
      new CustomEvent("home_saved", {
        detail: { homesSaved: savedHomes.length }
      })
    );
    ReactDOM.render(
      <App homes={myJson} saved={savedHomes} />,
      document.getElementById("results")
    );
  })
  .catch(err => console.log(err));
