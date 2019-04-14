/* eslint-disable no-unused-expressions */
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
      savedList: this.props.saved || [],
      currentPage: 1,
      activeSort: "Homes for you",
      activeFilters: {
        price: {
          high: 950000,
          low: 125000
        },
        beds: 1,
        homeTypes: ["houses", "apts", "condos", "townHomes"]
      },
      thirdSort: "Cheapest",
      moreSortActive: false,
      sortOptions: [
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
    // window.addEventListener("houses", e => {
    //   this.setState({ homes: e.detail.houses }, () => {
    //     this.filteredHomes({ target: { detail: this.state.activeFilters } });
    //     this.sortHomes({ target: { detail: this.state.activeSort } });
    //   });
    // });
    window.addEventListener("bounds", e => this.getHomesByBounds(e));
  }

  getHomesByBounds(e) {
    const { north, south, east, west } = e.detail.bounds;
    fetch(
      `http://zallosimilarhomesservice-env.3cy6gkds47.us-east-2.elasticbeanstalk.com/homesByCoord/${south}&${north}&${east}&${west}`
    )
      .then(response => response.json())
      .then(myJson => {
        const savedHomes = this.state.savedList;
        myJson.forEach(home => {
          savedHomes.includes(home._id)
            ? Object.assign(home, { saved: true })
            : Object.assign(home, { saved: false });
        });
        this.setState(
          {
            homes: myJson
          },
          () => {
            this.filteredHomes(
              {
                detail: this.state.activeFilters,
                type: "none"
              },
              this.sortHomes({ target: { textContent: this.state.activeSort } })
            );
          }
        );
      })
      .catch(err => console.log(err));
  }

  filteredHomes(e, cb = null) {
    const filters = this.state.activeFilters;

    switch (e.type) {
      case "price_change":
        filters.price.high = e.detail.high;
        filters.price.low = e.detail.low;
        break;
      case "beds_change":
        filters.beds = e.detail.beds;
        break;
      case "options":
        filters.homeTypes = e.detail.options;
        break;
      default:
    }

    const newList = this.state.homes.filter(
      home =>
        home.price >= filters.price.low &&
        home.price <= filters.price.high &&
        home.beds >= filters.beds &&
        filters.homeTypes.includes(home.homeType)
    );

    this.setState(
      {
        filteredList: newList,
        currentPage: 1,
        activeSort: "Homes for you",
        activeFilters: filters,
        moreSortActive: false
      },
      cb
    );
  }

  sortHomes(e) {
    let sorted = [];
    let newSort = this.state.thirdSort;

    if (this.state.sortOptions.includes(e.target.textContent)) {
      newSort = e.target.textContent;
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
      activeSort: e.target.textContent,
      moreSortActive: false,
      thirdSort: newSort,
      currentPage: 1
    });
  }

  moreFiltersDD() {
    const currentState = this.state.moreSortActive;
    this.setState({
      moreSortActive: !currentState
    });
  }

  houseSelect() {
    window.dispatchEvent(
      new CustomEvent("house_view", { detail: { houseView: true } })
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

    let newList = this.state.savedList;

    if (!this.state.filteredList[filterIndex].saved) {
      newList.push(id);
    } else {
      newList = newList.filter(savedId => savedId !== id);
    }
    window.localStorage.setItem("SavedHomes", JSON.stringify(newList));
    window.dispatchEvent(
      new CustomEvent("home_saved", { detail: { homesSaved: newList.length } })
    );

    this.setState({
      homes: update(this.state.homes, {
        [index]: { saved: { $set: !this.state.homes[index].saved } }
      }),
      filteredList: update(this.state.filteredList, {
        [filterIndex]: {
          saved: { $set: !this.state.filteredList[filterIndex].saved }
        }
      }),
      savedList: newList
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
        selected={this.state.activeSort === "Homes for you"}
        clicked={this.sortHomes}
        key={1}
      />,
      <Filter
        filterClass="newest"
        filterName="Newest"
        selected={this.state.activeSort === "Newest"}
        clicked={this.sortHomes}
        key={2}
      />,
      <Filter
        filterClass="third-filter"
        filterName={this.state.thirdSort}
        selected={this.state.activeSort === this.state.thirdSort}
        clicked={this.sortHomes}
        key={3}
      />,
      <Filter
        filterClass="more"
        filterName="More"
        selected={this.state.activeSort === "More"}
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
            active={this.state.moreSortActive}
            options={this.state.sortOptions}
            displayedFilter={this.state.thirdSort}
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
