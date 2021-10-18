import React, { useEffect, useState } from "react";
import { loadingWeatherObj } from "../constants/loadingWeatherObj";
import getWeather from "../utils/getWeather";

function getGradient(time: string) {
  return time.slice(-4).startsWith("a")
    ? parseInt(time.slice(0, -11)) < 5
      ? "linear-gradient(#152853, #040c24);"
      : "linear-gradient(#7dc7ff, #3e67ed);"
    : parseInt(time.slice(0, -11)) < 6
    ? "linear-gradient(#7dc7ff, #3e67ed);"
    : "linear-gradient(#152853, #040c24);";
}

export const WeatherWidget = ({ time }: { time: string }) => {
  const gradient = getGradient(time);

  const [weatherObj, setWeatherObj] = useState(loadingWeatherObj);
  const [temperatureUnit, setTemperatureUnit] = useState("F");

  useEffect(() => {
    (async function () {
      let currentWeather = await getWeather();
      setWeatherObj(currentWeather);
    })();
  }, []);

  return (
    <div
      className="m-[1rem] h-[10rem] w-[25rem] rounded-[1rem] color-[#fff] flex flex-col justify-center p-[1.4rem]"
      style={{
        background: gradient,
        filter: "drop-shadow(3px 3px 0.35rem rgba(0, 0, 0, 0.3))",
      }}
    >
      <img
        src={`http://openweathermap.org/img/wn/${weatherObj.weather?.[0].icon}@2x.png`}
        className="mr-[10px] w-[100px] h-[100px]"
        alt="Weather"
        style={{ filter: "drop-shadow(0 0 5px #fff)" }}
      />

      <div className="flex flex-col items-start justify-center">
        <h1 className="text-[#fff] text-[2rem] font-extrabold">
          {temperatureUnit == "C"
            ? Math.floor((weatherObj.main?.temp - 32) / 1.8)
            : Math.floor(weatherObj.main?.temp)}
          º{temperatureUnit}
        </h1>

        <div className="text-[#fff] text-[1.25rem] font-medium w-[16rem]">
          {weatherObj.weather?.[0].main}
          {" - "}
          <span className="font-normal text-[rgba(255,255,255,0.6)]">
            {weatherObj.weather?.[0].description}
          </span>
        </div>
      </div>
    </div>
  );
};
