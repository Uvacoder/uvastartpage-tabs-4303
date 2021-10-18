import React from "react";

function getGreeting(time: string) {
  return time.slice(-4).startsWith("a")
    ? parseInt(time.slice(0, -11)) < 12
      ? "Good morning."
      : "Good afternoon."
    : parseInt(time.slice(0, -11)) < 5
    ? "Good afternoon."
    : "Good evening.";
}

function getGradient(time: string) {
  return time.slice(-4).startsWith("a")
    ? parseInt(time.slice(0, -11)) < 5
      ? "linear-gradient(#152853, #040c24);"
      : "linear-gradient(#7dc7ff, #3e67ed);"
    : parseInt(time.slice(0, -11)) < 6
    ? "linear-gradient(#7dc7ff, #3e67ed);"
    : "linear-gradient(#152853, #040c24);";
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const TimeWidget = ({ time }: { time: string }) => {
  const greeting = getGreeting(time);
  const gradient = getGradient(time);

  return (
    <div
      className="m-[1rem] h-[10rem] w-[25rem] rounded-[1rem] color-[#fff] flex items-center justify-center"
      style={{
        background: gradient,
        filter: "drop-shadow(3px 3px 0.35rem rgba(0, 0, 0, 0.3))",
      }}
    >
      <h1 className="color-[#fff] text-[1.75rem] font-semibold tracking-[0.035rem]">
        {greeting}
      </h1>

      <div className="flex items-center justify-start w-[20rem] font-light text-[1.35rem] color-[#fff]">
        {days[new Date().getDay()]} • {time.slice(0, -4)}
        <span className="ml-[0.5rem] text-[#e6e6e6] text-[1.2rem] font-light">
          {time.slice(-4).toUpperCase()}
        </span>
      </div>
    </div>
  );
};
