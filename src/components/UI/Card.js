import classes from "./Card.module.css";

import React, { useState, useEffect } from "react";

const Card = ({ rotation = 0, timing = 150, children }) => {
  const [isShaken, setIsShaken] = useState(false);

  const style = {
    //display: "inline-block",
    backfaceVisibility: "hidden",
    transform: isShaken ? `rotate(${rotation}deg)` : `rotate(0deg)`,
    transition: `transform ${timing}ms`,
  };

  useEffect(() => {
    if (!isShaken) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsShaken(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isShaken, timing]);

  const trigger = () => {
    setIsShaken(true);
  };

  return (
    <div className={classes.card} onMouseEnter={trigger} style={style}>
      {children}
    </div>
  )
};

export default Card;
