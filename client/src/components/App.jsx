/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
import React from "react";
import style from "../style.css";
import Home from "./Home.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: this.props.homes
    };
  }

  render() {
    const { homes } = this.state;
    const display = [];

    for (let i = 0; i < homes.length; i++) {
      if (i === 25) {
        break;
      }
      display.push(<Home details={homes[i]} />);
    }

    return (
      <div className={style["results-container"]}>
        <h1 className={style["results-header"]}>
          Phoenix Metro Area Real Estate
        </h1>
        <span className={style["results-quantity"]}>
          {homes.length} homes for sale.
        </span>
        <div className={style["results-buttons"]}>
          <button type="button" className={style["results-for-you"]}>
            Homes for you
          </button>
          <button type="button" className={style["results-newest"]}>
            Newest
          </button>
          <button type="button" className={style["results-cheapest"]}>
            Cheapest
          </button>
          <button type="button" className={style["results-more"]}>
            More
          </button>
        </div>
        <div className={style["results-homes"]}>{display}</div>
      </div>
    );
  }
}

export default App;
