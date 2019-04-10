import React from "react";
import moment from "moment";
import style from "../style.css";

const Home = ({ details }) => {
  const styles = {
    backgroundImage: `url(${details.pictureURL})`,
    width: "312px",
    height: "170px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <div className={style["results-home-slide"]} style={styles}>
      <span className={style["results-home-days"]}>
        <span>
          {
            moment(details.createdAt)
              .fromNow()
              .split("ago")[0]
          }{" "}
          on Zallo
        </span>
        <span className={style["results-save-home-span"]}>
          <img
            className={style["results-home-heart"]}
            src="https://s3-us-west-1.amazonaws.com/zallosimilarhomes/ZalloHeart.png"
            alt="Similar Home"
          />
        </span>
      </span>
      <span className={style["results-home-line2"]}>
        <span className={style["results-home-listing-dot"]} />
        <span className={style["results-home-listing-type"]}>
          FOR {details.listingType.toUpperCase()}
        </span>
      </span>
      <span className={style["results-home-line3"]}>
        <span className={style["results-home-price"]}>
          {formatter.format(details.price).split(".00")[0]}
        </span>
        <span className={style["results-home-details"]}>
          {details.beds}
          {" bds · "}
          {details.baths}
          {" ba · "}
          {details.size.toLocaleString(undefined, {
            minimumFractionDigits: 0
          })}
          {" ..."}
        </span>
      </span>
      <span className={style["results-home-address"]}>
        {details.address}
        {", "}
        {details.city}
        {", "}
        {details.state} {details.zip}
      </span>
    </div>
  );
};

export default Home;
