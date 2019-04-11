/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import style from "../style.css";

const MoreDropdown = ({ active, options, displayedFilter, click }) => {
  if (active === false) return null;

  return (
    <div className={style["results-more-filters-dd"]}>
      {options.map(option =>
        option === displayedFilter ? null : (
          <p className={style["results-more-filters"]} onClick={click}>
            {option}
          </p>
        )
      )}
    </div>
  );
};

export default MoreDropdown;
