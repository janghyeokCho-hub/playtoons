import { useState, useEffect } from "react";

const useTimer = (endAt) => {
  const currentTime = new Date();
  const [timeLeft, setTimeLeft] = useState(new Date(endAt) - currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(new Date(endAt) - new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [endAt]);

  if (currentTime > new Date(endAt)) {
    return { timer: "00:00:00" };
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const formatTimer = (hours, minutes, seconds) => {
    return (
      (hours === 0
        ? `00:`
        : hours.toString().length === 1
        ? `0${hours}:`
        : `${hours}:`) +
      (minutes === 0
        ? `00:`
        : minutes.toString().length === 1
        ? `0${minutes}:`
        : `${minutes}:`) +
      (seconds === 0
        ? `00`
        : seconds.toString().length === 1
        ? `0${seconds}`
        : `${seconds}`)
    );
  };

  return { timer: formatTimer(days * 24 + hours, minutes, seconds) };
};

export default useTimer;
