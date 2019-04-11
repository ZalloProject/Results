/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import style from "../style.css";

const Filter = ({ filterClass, filterName, selected, clicked }) => {
  const active = selected === true ? "active" : "inactive";

  return (
    <li
      className={[
        style[`results-${filterClass}`],
        style["results-filter"],
        style[active]
      ].join(" ")}
      onClick={clicked}
    >
      {filterName}
    </li>
  );
};

export default Filter;
