import "./App.css";
import { useEffect, useState } from "react";
import "react-leaflet";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { request } from "./utils/request";
import { historyUrl, sensorUrl } from "./utils/urls";
import { Slider, Typography } from "antd";
import { Header } from "antd/es/layout/layout";

const { Text } = Typography;

const MarkerSpot = (props) => {
  const { Data: data = {}, Lat: lat, Long: long } = props;
  const [selectedDataAccordingToTime, setSelectedDataAccordingToTime] =
    useState([]);

  const dataArr =
    Object.keys(data).reduce((res, key) => {
      res.push({ features: data[key], time: key });
      return res;
    }, []) ?? [];

  const timesLen = dataArr.length;

  const handleTimeChange = (value = 0) => {
    setSelectedDataAccordingToTime(dataArr[value]?.features ?? []);
  };

  useEffect(() => {
    handleTimeChange(timesLen - 1);
  }, []);

  return (
    <Marker position={[long, lat]}>
      <Popup>
        <div>
          <div>
            {selectedDataAccordingToTime?.map((time) => (
              <div
                key={time.feature}
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                }}
              >
                {time.feature}: {time.amount}{" "}
                {time.dangerous ? (
                  <img
                    alt="dangerous"
                    src="danger.png"
                    style={{ width: "16px" }}
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <div style={{ minWidth: "200px" }}>
            <Slider
              min={0}
              max={timesLen - 1}
              tooltip={{
                formatter: (value) => dataArr[value].time?.substring(0, 19),
              }}
              defaultValue={timesLen - 1}
              onChange={handleTimeChange}
            />
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

const SensorHistory = (props) => {
  const today = new Date();
  const past30Days = [];

  // Loop through the past 30 days and add them to the array
  for (let i = 0; i < 30; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    past30Days.push({
      displayDate: day.toISOString().slice(0, 10),
      csvUrl: historyUrl(Math.round(day.getTime() / 1000)),
    });
  }

  return (
    <div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bolder",
          textAlign: "start",
          marginTop: "40px",
          marginBottom: "12px",
        }}
      >
        دریافت اطلاعات آب و هوا بر اساس تاریخ:
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 140px)",
          border: "3px solid",
          columnGap: "12px",
        }}
      >
        {past30Days.map((time) => (
          <a
            key={time.displayDate}
            style={{ border: "1px dashed ", cursor: "crosshair" }}
            target="_blank"
            rel="noreferrer"
            href={time.csvUrl}
          >
            {time.displayDate}
          </a>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [sensor, setSensor] = useState([]);

  const hamadanLocation = [34.80302185623945, 48.50722400106659];

  const getSensor = async () => {
    const res = await request({
      url: sensorUrl,
    });
    if (!res) return;
    setSensor(res);
  };

  useEffect(() => {
    getSensor();
  }, []);

  return (
    <div className="App">
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>
            سیستم اطلاعات آب و هوا دانشگاه بوعلی سینا
          </Text>
          <div className="logo" style={{ height: "50px" }}>
            <img
              style={{ height: "50px" }}
              src="https://basu.ac.ir/image/journal/article?img_id=1625679&t=1570434669333"
              alt="logo"
            />
          </div>
        </div>
      </Header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ margin: "40px auto" }}>
          <MapContainer
            center={hamadanLocation}
            zoom={13}
            style={{ width: "1800px", height: "600px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sensor.map((x) => (
              <MarkerSpot key={x.Lat + x.Long} {...x} />
            ))}
          </MapContainer>
        </div>
      </div>
      <SensorHistory />
    </div>
  );
}

export default App;
