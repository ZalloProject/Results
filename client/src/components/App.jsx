/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
import React from "react";
import style from "../style.css";
import Home from "./Home.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: this.props.homes,
      currentPage: 1
    };
  }

  render() {
    const { homes } = this.state;
    const display = [];
    const totalPages = homes.length / 25;
    const pages = [];

    for (let i = 0; i < homes.length; i++) {
      if (i === 25) {
        break;
      }
      display.push(<Home details={homes[i]} />);
    }

    for (let i = 0; i < totalPages; i++) {
      const classes =
        i === this.state.currentPage - 1
          ? [
              style["results-page-number"],
              `results-page-${i + 1}`,
              style["results-active-page"]
            ]
          : [style["results-page-number"], `results-page-${i + 1}`];

      pages.push(<div className={classes.join(" ")}>{i + 1}</div>);
    }
    pages.push(<div className={style["results-page-next"]}>Next</div>);

    return (
      <div className={style["results-container"]}>
        <div className={style["results-title-container"]}>
          <h1 className={style["results-header"]}>
            Phoenix Metro Area Real Estate
          </h1>
          <span className={style["results-quantity"]}>
            {homes.length} homes for sale.
          </span>
        </div>
        <div className={style["results-buttons-row"]}>
          <ul className={style["results-buttons"]} id={style.filter}>
            <li
              className={[
                style["results-for-you"],
                style["results-filter"],
                style.active
              ].join(" ")}
            >
              Homes for you
            </li>
            <li
              className={[
                style["results-newest"],
                style["results-filter"]
              ].join(" ")}
            >
              Newest
            </li>
            <li
              className={[
                style["results-cheapest"],
                style["results-filter"]
              ].join(" ")}
            >
              Cheapest
            </li>
            <li
              className={[style["results-more"], style["results-filter"]].join(
                " "
              )}
            >
              More
            </li>
          </ul>
        </div>
        <div className={style["results-homes"]}>{display}</div>
        <div className={style["results-bottom-filter-bar"]}>
          <div
            className={[style["results-bottom-filters"], style.filter1].join(
              " "
            )}
          >
            <img
              className={style["filter-images"]}
              src="https://s3-us-west-1.amazonaws.com/zallosimilarhomes/025.jpg"
              alt=""
            />
            <div className={style["filter-text"]}>Largest homes</div>
          </div>
          <div
            className={[style["results-bottom-filters"], style.filter2].join(
              " "
            )}
          >
            <img
              className={style["filter-images"]}
              src="https://s3-us-west-1.amazonaws.com/zallosimilarhomes/050.jpg"
              alt=""
            />
            <div className={style["filter-text"]}>Popular homes</div>
          </div>
          <div
            className={[style["results-bottom-filters"], style.filter3].join(
              " "
            )}
          >
            <img
              className={style["filter-images"]}
              src="https://s3-us-west-1.amazonaws.com/zallosimilarhomes/075.jpg"
              alt=""
            />
            <div className={style["filter-text"]}>Largest lots</div>
          </div>
        </div>
        <div className={style["results-page-bar"]}>{pages}</div>
      </div>
    );
  }
}

export default App;
