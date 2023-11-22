import React, { useEffect, useState } from 'react';

export default function Timer(props) {
  const requestTime = props.matchRequestDate;
  const requestTimePlusOneWeek = props.matchRequestDate;

  function getCurrentDate(separator = '') {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${date}`;
  }

  const currentDatePlusOne = getCurrentDate();

  const calculateTimePassed = () => {
    let timePassed = {};

    const difference = +new Date(currentDatePlusOne) - +new Date(requestTime);

    if (difference < 0) {
      timePassed = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    console.log(timePassed);
    return timePassed;
  };

  const [timePassed, setTimePassed] = useState(calculateTimePassed());

  useEffect(() => {
    setTimeout(() => {
      setTimePassed(calculateTimePassed());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timePassed).forEach((interval) => {
    if (!timePassed[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timePassed[interval]} {interval}{' '}
      </span>,
    );
  });
  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}
