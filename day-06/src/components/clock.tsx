"use client";

import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState({
    hours: "00",
    mins: "00",
    secs: "00",
    ampm: "AM"
  });

  const [offset, setOffset] = useState({
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const [dots, setDots] = useState({
    hours: "",
    mins: "",
    secs: "",
  });

  // Update the clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const hours = now.getHours() % 12; // Convert to 12-hour format
      const mins = now.getMinutes();
      const secs = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      
      const hoursStr = hours.toString().padStart(2, "0");
      const minsStr = mins.toString().padStart(2, "0");
      const secsStr = secs.toString().padStart(2, "0");

      setTime({
        hours: hoursStr,
        mins: minsStr,
        secs: secsStr,
        ampm: ampm
      });

      setOffset({
        hours: 440 - (440 * hours) / 12,
        mins: 440 - (440 * mins) / 60,
        secs: 440 - (440 * secs) / 60,
      });

      setDots({
        hours: `rotate(${hours * 30}deg)`, // 360 / 12
        mins: `rotate(${mins * 6}deg)`,    // 360 / 60
        secs: `rotate(${secs * 6}deg)`,    // 360 / 60
      });
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#2f363e]">
      <div className="time flex gap-7 items-center text-white">

        {/* Hours */}
        <div className="circle relative w-[9.4rem] h-[9.4rem] flex items-center justify-center">
          <div style={{ transform: dots.hours }} className="dots absolute h-full w-full rounded-full flex justify-center items-start z-50"></div>
          <svg className="relative h-[9.4rem] w-[9.4rem] rotate-[270deg]">
            <circle
              cx="70" cy="70" r="70"
              className="w-full h-full fill-transparent stroke-[5] translate-x-[5px] translate-y-[5px] transition-all stroke-[#191919]"
              strokeLinecap="round"
            ></circle>
            <circle
              cx="70" cy="70" r="70"
              className="w-full h-full fill-transparent stroke-[5] translate-x-[5px] translate-y-[5px] transition-all stroke-purple-700"
              strokeDasharray={440} strokeDashoffset={offset.hours}
            ></circle>
          </svg>
          <div className="absolute text-center font-medium text-[1.5em]">
            {time.hours}
            <br />
            <span className="absolute text-sm text-light uppercase -translate-x-1/2 translate-y-2.5">Hours</span>
          </div>
        </div>

        {/* Minutes */}
        <div className="circle relative w-[9.4rem] h-[9.4rem] flex items-center justify-center">
          <div style={{ transform: dots.mins }} className="dots absolute h-full w-full rounded-full flex justify-center items-start z-50"></div>
          <svg className="relative h-[9.4rem] w-[9.4rem] rotate-[270deg]">
            <circle
              cx="70" cy="70" r="70"
              className="w-full h-full fill-transparent stroke-[5] translate-x-[5px] translate-y-[5px] transition-all stroke-[#191919]"
              strokeLinecap="round"
            ></circle>
            <circle
              cx="70" cy="70" r="70"
              className="w-full h-full fill-transparent stroke-[5] translate-x-[5px] translate-y-[5px] transition-all stroke-purple-700"
              strokeDasharray={440} strokeDashoffset={offset.mins}
            ></circle>
          </svg>
          <div className="absolute text-center font-medium text-[1.5em]">
            {time.mins}
            <br />
            <span className="absolute text-sm text-light uppercase -translate-x-1/2 translate-y-2.5">Minutes</span>
          </div>
        </div>

        {/* Seconds */}
        <div className="circle relative w-[9.4rem] h-[9.4rem] flex items-center justify-center">
          <div style={{ transform: dots.secs }} className="dots absolute h-full w-full rounded-full flex justify-center items-start z-50"></div>
          <svg className="relative h-[9.4rem] w-[9.4rem] rotate-[270deg]">
            <circle
              cx="70" cy="70" r="70"
              className="w-full h-full fill-transparent stroke-[5] translate-x-[5px] translate-y-[5px] transition-all stroke-[#191919]"
              strokeLinecap="round"
            ></circle>
            <circle
              cx="70" cy="70" r="70"
              className="w-full h-full fill-transparent stroke-[5] translate-x-[5px] translate-y-[5px] transition-all stroke-purple-700"
              strokeDasharray={440} strokeDashoffset={offset.secs}
            ></circle>
          </svg>
          <div className="absolute text-center font-medium text-[1.5em]">
            {time.secs}
            <br />
            <span className="absolute text-sm text-light uppercase -translate-x-1/2 translate-y-2.5">Seconds</span>
          </div>
        </div>

        {/* AM/PM */}
        <div className="ap relative text-[1em] translate-x-5">
          <div id="ampm">{time.ampm}</div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
