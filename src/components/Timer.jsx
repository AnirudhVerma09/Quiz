import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
  const { startTime, endTime } = useSelector((state) => state.timer);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime) return;
    let intervalId;
    if (endTime) {
      setElapsed(Math.floor((endTime - startTime) / 1000));
    } else {
      intervalId = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [startTime, endTime]);

  if (!startTime) return null;

  return (
    <div className="fixed top-0 right-0 m-4 p-3 bg-[#3E3A2A] text-[#EBE5C2] text-xl font-bold rounded shadow-md">
      Timer: {elapsed} seconds
    </div>
  );
};

export default Timer;
