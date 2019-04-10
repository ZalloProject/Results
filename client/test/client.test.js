/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from "react";
import { shallow, mount } from "enzyme";

import App from "../src/components/App.jsx";
import Home from "../src/components/Home.jsx";

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
  baths: 3,
  size: 2650,
  listingType: "Sale",
  createdAt: "2019-03-24T02:59:14.416+00:00",
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
  createdAt: "2019-02-24T02:59:14.416+00:00",
  pictureURL: "https://s3-us-west-1.amazonaws.com/zallosimilarhomes/050.jpg"
};

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
