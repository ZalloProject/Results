/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
import React from "react";
import update from "react-addons-update";
import style from "../style.css";
import Home from "./Home.jsx";
import Filter from "./Filter.jsx";
import MoreDropdown from "./MoreDropdown.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: this.props.homes,
      filteredList: this.props.homes,
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
        "Zapproximation (High to Low)",
        "Zapproximation (Low to High)"
      ]
    };
    this.sortHomes = this.sortHomes.bind(this);
    this.moreFiltersDD = this.moreFiltersDD.bind(this);
    this.pageSelect = this.pageSelect.bind(this);
    this.houseSelect = this.houseSelect.bind(this);
    this.saveHome = this.saveHome.bind(this);
  }

  componentWillMount() {
    window.addEventListener("price_change", e => this.filteredHomes(e));
    window.addEventListener("beds_change", e => this.filteredHomes(e));
    window.addEventListener("options", e => this.filteredHomes(e));
    window.addEventListener("houses", e => {
      this.setState(
        { filteredList: e.detail.houses },
        this.sortHomes({ target: { detail: this.state.activeFilter } })
      );
    });
  }

  filteredHomes(e) {
    let newList = [];

    switch (e.type) {
      case "price_change":
        newList = this.state.homes.filter(
          home => home.price >= e.detail.low && home.price <= e.detail.high
        );
        break;
      case "beds_change":
        newList = this.state.homes.filter(home => home.beds >= e.detail.beds);
        break;
      case "options":
        newList = this.state.homes.filter(home =>
          e.detail.options.includes(home.homeType)
        );
        break;
      default:
        newList = this.state.homes;
    }

    this.setState({
      filteredList: newList,
      currentPage: 1,
      activeFilter: "Homes for you",
      moreFilterActive: false
    });
  }

  sortHomes(e) {
    let sorted = [];

    let newFilter = this.state.thirdFilter;
    if (this.state.filterOptions.includes(e.target.textContent)) {
      newFilter = e.target.textContent;
    }

    switch (e.target.textContent) {
      case "Newest":
        sorted = this.state.filteredList.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "Zapproximation (Low to High)":
      case "Cheapest":
        sorted = this.state.filteredList.sort((a, b) => a.price - b.price);
        break;
      case "Zapproximation (High to Low)":
      case "Price (High to Low)":
        sorted = this.state.filteredList.sort((a, b) => b.price - a.price);
        break;
      case "Bedrooms":
        sorted = this.state.filteredList.sort((a, b) => b.beds - a.beds);
        break;
      case "Bathrooms":
        sorted = this.state.filteredList.sort((a, b) => b.baths - a.baths);
        break;
      case "Square Feet":
      case "Largest Homes":
        sorted = this.state.filteredList.sort((a, b) => b.size - a.size);
        break;
      case "Largest Lots":
      case "Lot Size":
        sorted = this.state.filteredList.sort((a, b) => b.lotSize - a.lotSize);
        break;
      case "Year Built":
        sorted = this.state.filteredList.sort(
          (a, b) => b.yearBuilt - a.yearBuilt
        );
        break;
      case "Popular Homes":
        sorted = this.state.filteredList.sort((a, b) => b.saves - a.saves);
        break;
      case "Homes for you":
        sorted = this.state.filteredList.sort((a, b) => b.saved - a.saved);
        break;
      default:
        sorted = this.state.filteredList;
    }
    this.setState({
      filteredList: sorted,
      activeFilter: e.target.textContent,
      moreFilterActive: false,
      thirdFilter: newFilter,
      currentPage: 1
    });
  }

  moreFiltersDD() {
    const currentState = this.state.moreFilterActive;
    this.setState({
      moreFilterActive: !currentState
    });
  }

  houseSelect() {
    window.dispatchEvent(
      new CustomEvent(("house_view", { detail: { houseView: true } }))
    );
  }

  saveHome(id) {
    let index;
    this.state.homes.forEach((home, i) => {
      if (home._id === id) {
        index = i;
      }
    });

    let filterIndex;
    this.state.filteredList.forEach((home, i) => {
      if (home._id === id) {
        filterIndex = i;
      }
    });

    this.setState({
      homes: update(this.state.homes, {
        [index]: { saved: { $set: !this.state.homes[index].saved } }
      }),
      filteredList: update(this.state.filteredList, {
        [filterIndex]: {
          saved: { $set: !this.state.filteredList[filterIndex].saved }
        }
      })
    });
  }

  pageSelect(e) {
    let page = e.target.textContent;
    if (
      page === "Next" &&
      this.state.currentPage <= Math.floor(this.state.filteredList.length / 25)
    ) {
      page = this.state.currentPage + 1;
    } else if (page === "Next") {
      page = this.state.currentPage;
    }
    this.setState({
      currentPage: Number(page)
    });
  }

  render() {
    const { filteredList } = this.state;
    const display = [];
    const totalPages = filteredList.length / 25;
    const pages = [];

    for (
      let i = 0 + (this.state.currentPage - 1) * 25;
      i < filteredList.length;
      i++
    ) {
      if (i === (this.state.currentPage - 1) * 25 + 25) {
        break;
      }
      display.push(
        <Home
          details={filteredList[i]}
          select={this.houseSelect}
          key={i}
          save={this.saveHome}
        />
      );
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

      pages.push(
        <div className={classes.join(" ")} onClick={this.pageSelect} key={i}>
          {i + 1}
        </div>
      );
    }
    pages.push(
      <div
        className={style["results-page-next"]}
        onClick={this.pageSelect}
        key="Next"
      >
        Next
      </div>
    );

    const filters = [
      <Filter
        filterClass="for-you"
        filterName="Homes for you"
        selected={this.state.activeFilter === "Homes for you"}
        clicked={this.sortHomes}
        key={1}
      />,
      <Filter
        filterClass="newest"
        filterName="Newest"
        selected={this.state.activeFilter === "Newest"}
        clicked={this.sortHomes}
        key={2}
      />,
      <Filter
        filterClass="third-filter"
        filterName={this.state.thirdFilter}
        selected={this.state.activeFilter === this.state.thirdFilter}
        clicked={this.sortHomes}
        key={3}
      />,
      <Filter
        filterClass="more"
        filterName="More"
        selected={this.state.activeFilter === "More"}
        clicked={this.moreFiltersDD}
        key={4}
      />
    ];

    const bottomFilters = [];
    let filterText;
    for (let i = 0; i < 3; i++) {
      switch (i) {
        case 0:
          filterText = "Largest Homes";
          break;
        case 1:
          filterText = "Popular Homes";
          break;
        case 2:
          filterText = "Largest Lots";
          break;
        default:
      }

      bottomFilters.push(
        <div className={style["results-bottom-filters"]} key={i}>
          <img
            className={style["filter-images"]}
            src={`https://s3-us-west-1.amazonaws.com/zallosimilarhomes/0${25 *
              (i + 1)}.jpg`}
            alt=""
          />
          <div className={style["filter-text"]} onClick={this.sortHomes}>
            {filterText}
          </div>
        </div>
      );
    }

    return (
      <div className={style["results-container"]}>
        <div className={style["results-title-container"]}>
          <h1 className={style["results-header"]}>
            Phoenix Metro Area Real Estate
          </h1>
          <span className={style["results-quantity"]}>
            {filteredList.length} homes for sale.
          </span>
        </div>
        <div className={style["results-buttons-row"]}>
          <ul className={style["results-buttons"]}>{filters}</ul>
          <MoreDropdown
            active={this.state.moreFilterActive}
            options={this.state.filterOptions}
            displayedFilter={this.state.thirdFilter}
            click={this.sortHomes}
            key={1}
          />
        </div>
        <div className={style["results-homes"]}>{display}</div>
        <div className={style["results-bottom-filter-bar"]}>
          {bottomFilters}
        </div>
        <div className={style["results-page-bar"]}>{pages}</div>
      </div>
    );
  }
}

export default App;
