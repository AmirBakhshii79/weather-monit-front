import { baseUrl } from "./request";

export const sensorUrl = "/sensor-data";
export const historyUrl = (t) => `${baseUrl}/sensor-history?t=${t}`;
export const adminLogin = "/admin/login"
export const SettingsUrl = "/admin/settings"