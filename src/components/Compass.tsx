import { ModuleData, App } from "@formant/data-sdk";
import { useEffect, useState } from "react";
import compass from "../images/compass.png";
import styles from "./Compass.module.scss";

export const Compass = () => {
  const [state, setState] = useState({ angle: 0, distance: 0 });
  useEffect(() => {
    App.addModuleDataListener(receiveModuleData);
  }, []);

  const receiveModuleData = async (newValue: ModuleData) => {
    const streams = newValue.streams;
    if (Object.keys(streams).length === 0) {
      throw new Error("No streams.");
    }

    const currentState = state;

    Object.keys(streams).forEach((stream, idx) => {
      const latestState = getLatestData(streams, stream);
      if (typeof latestState !== "string" && latestState !== undefined) {
        if (streams[stream].data[0].name === "home.angle")
          currentState.angle = latestState;
        if (streams[stream].data[0].name === "home.distance")
          currentState.distance = latestState;
      }
    });
    if (JSON.stringify(state) !== JSON.stringify(currentState)) {
      setState(currentState);
    }
  };
  return (
    <div className={styles.container}>
      <div
        style={{
          transform: `rotate(${state.angle}deg)`,
          transition: "200ms",
        }}
        className="compass-container"
      >
        <img height={80} src={compass} />
      </div>
      <div className={styles["distance-container"]}>
        <span>{`${state.distance}M`}</span>
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
