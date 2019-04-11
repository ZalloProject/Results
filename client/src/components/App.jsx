/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
import React from "react";
import style from "../style.css";
import Home from "./Home.jsx";
import Filter from "./Filter.jsx";
import MoreDropdown from "./MoreDropdown.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: this.props.homes,
      currentPage: 1,
      activeFilter: "Homes for you",
      thirdFilter: "Cheapest",
      moreFilterActive: false,
      filterOptions: [
        "Cheapest",
        "Price (High to Low)",
        "Bedrooms",
        "Bathrooms",
        "Square Feet",
        "Year Built",
        "Lot Size",
        "Zalloximation (High to Low)",
        "Zalloximation (Low to High)"
      ]
    };
    this.filterSelect = this.filterSelect.bind(this);
    this.moreFiltersDD = this.moreFiltersDD.bind(this);
  }

  filterSelect(e) {
    let newFilter = this.state.thirdFilter;
    if (this.state.filterOptions.includes(e.target.textContent)) {
      newFilter = e.target.textContent;
    }

    this.setState({
      activeFilter: e.target.textContent,
      moreFilterActive: false,
      thirdFilter: newFilter
    });
  }

  moreFiltersDD() {
    const currentState = this.state.moreFilterActive;
    this.setState({
      moreFilterActive: !currentState
    });
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

    const filters = [
      <Filter
        filterClass="for-you"
        filterName="Homes for you"
        selected={this.state.activeFilter === "Homes for you"}
        clicked={this.filterSelect}
      />,
      <Filter
        filterClass="newest"
        filterName="Newest"
        selected={this.state.activeFilter === "Newest"}
        clicked={this.filterSelect}
      />,
      <Filter
        filterClass="third-filter"
        filterName={this.state.thirdFilter}
        selected={this.state.activeFilter === this.state.thirdFilter}
        clicked={this.filterSelect}
      />,
      <Filter
        filterClass="more"
        filterName="More"
        selected={this.state.activeFilter === "More"}
        clicked={this.moreFiltersDD}
      />
    ];

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
          <ul className={style["results-buttons"]}>{filters}</ul>
          <MoreDropdown
            active={this.state.moreFilterActive}
            options={this.state.filterOptions}
            displayedFilter={this.state.thirdFilter}
            click={this.filterSelect}
          />
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
