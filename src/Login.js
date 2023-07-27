import "./App.css";
import { useEffect, useState } from "react";
import "react-leaflet";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { request } from "./utils/request";
import { historyUrl, sensorUrl } from "./utils/urls";
import { Button, Input, Slider, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import {adminLogin} from './utils/urls'
import { useNavigate } from "react-router-dom";

const { Text } = Typography;


function Login() {
    let Navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const login = () => {
        request({
            url: adminLogin,
            body: JSON.stringify({username, password}),
            method: "POST",
            headers: {
                'content-type': "application/json"
            }
        }).then((res) => {
          if (!res || res.Status != 200) {
            alert('نام کاربری یا رمز عبور اشتباه است')
            return
          }

          Navigate('/admin-setting')
        })
    }

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
      <div style={{
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    }}>
      <Text style={{fontWeight: 'bold', fontSize: "40px"}}>ورود به سیستم</Text>
      <Text style={{margin: "40px"}}>این قسمت تنها جهت استفاده مدیر سیستم میباشد</Text>
      <Input placeholder="نام کاربری" onChange={((ev) => {setUsername(ev.target.value)})} style={{marginBottom: "10px"}} ></Input>
      <Input placeholder="رمز عبور" onChange={((ev) => {setPassword(ev.target.value)})} type='password' style={{marginBottom: "10px"}}/>
      <Button style={{margin: '10px'}} onClick={login}>ورود</Button>
    </div>
      
    </div>

  );
}

export default Login;
