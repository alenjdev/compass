import { ModuleData, App } from "@formant/data-sdk";
import { useEffect, useState } from "react";
import styles from "./Compass.module.scss";

export const Compass = () => {
  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    App.addModuleDataListener(receiveModuleData);
  }, []);

  const receiveModuleData = async (newValue: ModuleData) => {
    const streams = newValue.streams;
    if (Object.keys(streams).length === 0) {
      throw new Error("No streams.");
    }

    Object.keys(streams).forEach((stream, idx) => {
      const latestState = getLatestData(streams, stream);

      if (typeof latestState !== "string" && latestState !== undefined) {
        if (streams[stream].data[0].name === "home.angle")
          setAngle(latestState);
        if (streams[stream].data[0].name === "home.distance")
          setDistance(latestState);
      }
    });
  };
  return (
    <div className={styles.container}>
      <div
        style={{
          transform: `rotate(${angle}deg)`,
          transition: "200ms",
        }}
        className={styles["compass-container"]}
      >
        {distance === 0 ? (
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="9.76575"
              y="9.89075"
              width="4.46853"
              height="4.46853"
              rx="2.23427"
              fill="white"
            />
            <circle
              cx="12"
              cy="12.125"
              r="6.43592"
              stroke="white"
              stroke-width="2"
            />
            <path d="M12 4.79382V2.14062" stroke="white" />
            <path d="M12 22.1094V19.0024" stroke="white" />
            <path d="M18.9628 12.125L22 12.125" stroke="white" />
            <path d="M2.03126 12.125L4.68445 12.125" stroke="white" />
          </svg>
        ) : (
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: `scale(${1 + distance / 50})`,
              transition: "100ms",
            }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13 4V20H11V4H13Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.2929 3.29289C11.6834 2.90237 12.3166 2.90237 12.7071 3.29289L18.7071 9.29289L17.2929 10.7071L12 5.41421L6.70712 10.7071L5.29291 9.29289L11.2929 3.29289Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <div className={styles["distance-container"]}>
        <span>{`${distance}M`}</span>
      </div>
    </div>
  );
};

const getLatestData = (
  moduleData: {
    [stream_name: string]: Stream;
  },
  stream: string
): number | undefined | string => {
  if (moduleData[stream] === undefined) {
    return "No stream.";
  }
  if (moduleData[stream].loading) {
    return undefined;
  }
  if (moduleData[stream].tooMuchData) {
    return "Too much data.";
  }

  if (moduleData[stream].data.length === 0) {
    return "No data.";
  }
  const latestPoint = moduleData[stream].data[0].points.at(-1);
  if (!latestPoint) {
    return "No datapoints.";
  }
  return latestPoint[1];
};
