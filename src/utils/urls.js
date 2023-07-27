import { baseUrl } from "./request";

export const sensorUrl = "/sensor-data";
export const historyUrl = (t) => `${baseUrl}/sensor-history?t=${t}`;
