/** @format */

import { useState } from "react";
import { useEffect } from "react";

const CountDown = ({ handleFinish }) => {
  const [count, setCount] = useState(500);

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };
  useEffect(() => {
    if (count === 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return <>{toHHMMSS(count)}</>;
};

export default CountDown;
