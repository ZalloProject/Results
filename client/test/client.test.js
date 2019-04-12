/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from "react";
import { shallow, mount } from "enzyme";

import App from "../src/components/App.jsx";
import Home from "../src/components/Home.jsx";
import MoreDropdown from "../src/components/MoreDropdown.jsx";

const home1 = {
  address: "883 E Constitution Dr.",
  city: "Chandler",
  zip: "85225",
  state: "AZ",
  price: 320000,
  beds: 5,
  baths: 3,
  size: 2850,
  listingType: "Sale",
  homeType: "houses",
  createdAt: "2019-03-27T02:59:14.416+00:00",
  pictureURL: "https://s3-us-west-1.amazonaws.com/zallosimilarhomes/099.jpg"
};

const home2 = {
  address: "831 E Gary Dr.",
  city: "Chandler",
  zip: "85225",
  state: "AZ",
  price: 280000,
  beds: 4,
  baths: 4,
  size: 2650,
  listingType: "Sale",
  homeType: "houses",
  createdAt: "2019-03-28T02:59:14.416+00:00",
  pictureURL: "https://s3-us-west-1.amazonaws.com/zallosimilarhomes/100.jpg"
};

const home3 = {
  address: "1137 W Butler Ct.",
  city: "Chandler",
  zip: "85225",
  state: "AZ",
  price: 275000,
  beds: 3,
  baths: 2,
  size: 1900,
  listingType: "Sale",
  homeType: "condos",
  createdAt: "2019-02-24T02:59:14.416+00:00",
  pictureURL: "https://s3-us-west-1.amazonaws.com/zallosimilarhomes/050.jpg"
};

const options = ["Cheapest", "Price (High to Low)", "Bedrooms"];

describe("Main Results Component", () => {
  it('should be selectable by class "results-container"', () => {
    expect(
      shallow(<App homes={[home1, home2, home3]} />).is(".results-container")
    ).toBe(true);
  });

  it("should mount in a full DOM", () => {
    expect(
      mount(<App homes={[home1, home2, home3]} />).find(".results-container")
        .length
    ).toBe(1);
  });

  describe("filteredHomes function", () => {
    it("should change state to only include those that meet the given price criteria", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().filteredHomes({
        type: "price_change",
        detail: { low: 280000, high: 400000 }
      });
      expect(wrapper.state("filteredList").length).toBe(2);
      wrapper.instance().filteredHomes({
        type: "price_change",
        detail: { low: 100000, high: 275000 }
      });
      expect(wrapper.state("filteredList").length).toBe(1);
    });

    it("should change state to only include those that meet the given beds criteria", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().filteredHomes({
        type: "beds_change",
        detail: { beds: 5 }
      });
      expect(wrapper.state("filteredList").length).toBe(1);
      wrapper.instance().filteredHomes({
        type: "beds_change",
        detail: { beds: 4 }
      });
      expect(wrapper.state("filteredList").length).toBe(2);
    });

    it("should change state to only include those that meet the given homeType criteria", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().filteredHomes({
        type: "options",
        detail: { options: ["condos"] }
      });
      expect(wrapper.state("filteredList").length).toBe(1);
      wrapper.instance().filteredHomes({
        type: "options",
        detail: { options: ["condos", "houses"] }
      });
      expect(wrapper.state("filteredList").length).toBe(3);
    });

    it("should not change state when invalid event type is passed in", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().filteredHomes({
        type: "wrong",
        detail: { options: "wrong" }
      });
      expect(wrapper.state("filteredList").length).toBe(3);
    });
  });

  describe("sortHomes function", () => {
    it("should change state to order homes by cheapest to most expensive", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().sortHomes({ target: { textContent: "Cheapest" } });
      expect(wrapper.state("filteredList")[0].price).toBe(275000);
    });
    it("should change state to order homes from most to least expensive", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper
        .instance()
        .sortHomes({ target: { textContent: "Price (High to Low)" } });
      expect(wrapper.state("filteredList")[0].price).toBe(320000);
    });
    it("should change state to order by newest", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().sortHomes({ target: { textContent: "Newest" } });
      expect(wrapper.state("filteredList")[0].price).toBe(280000);
    });
    it("should change state to order by most bedrooms", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().sortHomes({ target: { textContent: "Bedrooms" } });
      expect(wrapper.state("filteredList")[0].price).toBe(320000);
    });
    it("should change state to order by most bathrooms", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().sortHomes({ target: { textContent: "Bathrooms" } });
      expect(wrapper.state("filteredList")[0].price).toBe(280000);
    });
    it("should change state to order by square feet", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().sortHomes({ target: { textContent: "Square Feet" } });
      expect(wrapper.state("filteredList")[0].price).toBe(320000);
    });
    it("should not change state when invalid filter is passed in", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().sortHomes({ target: { textContent: "None" } });
      expect(wrapper.state("filteredList")[0].price).toBe(320000);
      expect(wrapper.state("filteredList")[1].price).toBe(280000);
      expect(wrapper.state("filteredList")[2].price).toBe(275000);
    });
  });

  describe("More Filters Dropdown", () => {
    it("should open the dropdown when called once", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().moreFiltersDD();
      expect(wrapper.state("moreFilterActive")).toBe(true);
    });
  });

  describe("Page Select", () => {
    it("should not change active page if there are no more pages", () => {
      const wrapper = shallow(<App homes={[home1, home2, home3]} />);
      wrapper.instance().pageSelect({ target: { textContent: "Next" } });
      expect(wrapper.state("currentPage")).toBe(1);
    });

    it("should change active page if next or a different page number is selected", () => {
      const wrapper = shallow(
        <App
          homes={[
            home1,
            home2,
            home3,
            home1,
            home2,
            home3,
            home1,
            home2,
            home3,
            home1,
            home2,
            home3,
            home1,
            home2,
            home3,
            home1,
            home2,
            home3,
            home1,
            home2,
            home3,
            home1,
            home2,
            home3,
            home1,
            home2,
            home3
          ]}
        />
      );
      wrapper.instance().pageSelect({ target: { textContent: "Next" } });
      expect(wrapper.state("currentPage")).toBe(2);
      wrapper.instance().pageSelect({ target: { textContent: "1" } });
      expect(wrapper.state("currentPage")).toBe(1);
      wrapper.instance().pageSelect({ target: { textContent: "2" } });
      expect(wrapper.state("currentPage")).toBe(2);
    });
  });
});

describe("Home Component", () => {
  it('should be selectable by class "results-home-slide"', () => {
    expect(shallow(<Home details={home1} />).is(".results-home-slide")).toBe(
      true
    );
  });

  it("should mount in a full DOM", () => {
    expect(
      mount(<Home details={home1} />).find(".results-home-slide").length
    ).toBe(1);
  });
});

describe("More Dropdown Component", () => {
  it('should be selectable by class "results-more-filter-dd"', () => {
    expect(
      shallow(<MoreDropdown active options={options} />).is(
        ".results-more-filters-dd"
      )
    ).toBe(true);
  });

  it("should mount in a full DOM", () => {
    expect(
      mount(<MoreDropdown active options={options} />).find(
        ".results-more-filters-dd"
      ).length
    ).toBe(1);
  });

  it("should not mount when active is false", () => {
    expect(
      mount(<MoreDropdown active={false} options={options} />).find(
        ".results-more-filters-dd"
      ).length
    ).toBe(0);
  });

  it("should not display a filter from the options if it is already displayed", () => {
    expect(
      mount(
        <MoreDropdown active displayedFilter="Bedrooms" options={options} />
      )
        .find(".results-more-filters-dd")
        .children().length
    ).toBe(2);
  });
});
