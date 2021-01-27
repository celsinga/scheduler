import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = function (spots) {
    switch (spots) {
      default:
        return `${spots} spots remaining`;
      case 0:
        return "no spots remaining";
      case 1:
        return "1 spot remaining";
    }
  };

  const itemClass = classNames("day-list__item", {
    "day-list__item--selected ": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li data-testid="day" className={itemClass} onClick={() => props.setDay(props.name)}>
      <h2 className={"text--regular"}>{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}