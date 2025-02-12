import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";

Timer.propTypes = {
  minutes: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired
};

export default function Timer(props) {

  const { minutes, onTimeout } = props;
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      alert("time out");
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Typography sx={{ fontWeight: 500, color: "#b32828" }}>{formatTime(timeLeft)}</Typography>
  );
};
