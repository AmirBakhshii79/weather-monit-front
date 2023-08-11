import { baseUrl } from "./request";

export const sensorUrl = "/api/sensor-data";
export const historyUrl = (t) => `${baseUrl}/sensor-history?t=${t}`;
export const adminLogin = "/api/admin/login"
export const SettingsUrl = "/api/admin/settings"