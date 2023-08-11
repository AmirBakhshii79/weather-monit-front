import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useNavigate, Route, Routes } from 'react-router-dom';
import { Button, Checkbox, Input, List, Slider, Switch, Typography } from "antd";
import { Header } from 'antd/es/layout/layout';
import Item from 'antd/es/list/Item';
import { SettingsUrl } from './utils/urls';
import { request } from './utils/request';
const { Text } = Typography;

function AdminSetting() {
    const [settings, setSettings] = useState([])
    const [checked, setChecked] = useState(false)

    useEffect(() => {
      request({
        url: SettingsUrl,
        method: "GET"
      }).then((res) => {
        console.log(res)
        setSettings(res)
        setChecked(res.show_danger_data)
      })
    }, []);
  
    function saveSettings() {
      settings.show_danger_data = checked
        request({
          url: SettingsUrl,
          method: "POST",
          body: JSON.stringify(settings),
          headers: {
            "content-type": "application/json"
          }
        }).then((res) => {
          alert("اطلاعات با موفقیت ذخیره گردید")
        })
    }

    const Navigate = useNavigate()

    return (
    <div className='app'>
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
        سیستم اطلاعات آب و هوا دانشاشگاه بوعلی سینا
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
    textAlign: 'center',
    border: '1px solid #cccccc',
    margin: '10px',
    padding: '50px'
    }}>
    
  <Text style={{fontSize: '20px', fontWeight: 'bold'}}>تنظیم اطلاعات سایت</Text>
    
    <div dir='rtl' style={{
        alignItems:"center", 
        display:"flex", 
        justifyContent: "center",
        textAlign: 'center'}}>
  <Text>نمایش علامت هشدار غلظت ذرات:</Text>
  <Switch onChange={setChecked} checked={checked} style={{margin: '20px', width: '10px'}}></Switch>
    </div>

    <div>
        <List
      size="small"
      header={<div dir='rtl'>نشان دادن اطلاعات مختصات</div>}
      bordered
      dataSource={settings.locations}
      renderItem={(item) => 
      <List.Item>
      {item.x.toString() + ", " + item.y.toString() + " "} 
      <Checkbox defaultChecked={item.enabled}
      onChange={(e) => {
        let d = settings.locations.findIndex(x => x.x == item.x && x.y == item.y)
        settings.locations[d].enabled = e.target.checked
        setSettings(settings)
      }}
      />
      </List.Item>
      }
      style={{margin:"20px"}}
    />
    </div>
  
    <div>
        <List
      size="small"
      header={<div dir='rtl'>نشان دادن اطلاعات مقادیر</div>}
      bordered
      dataSource={settings.features}
      renderItem={(item) => 
      <List.Item>
      {item.feature} 
      <Checkbox defaultChecked={item.enabled}
            style={{ marginLeft: '10px' }}
      onChange={(e) => {
        let d = settings.features.findIndex(x => x.feature == item.feature)
        settings.features[d].enabled = e.target.checked
        setSettings(settings)
      }}
      />
          <Input placeholder='محدوده خطر' onChange={(e) => {
            let d = settings.features.findIndex(x => x.feature == item.feature)
            settings.features[d].threshold = parseFloat(e.target.value)
            setSettings(settings)
          }} defaultValue={item.threshold.toString()}>
          </Input>
      </List.Item>
      }
      style={{margin:"20px"}}
    />
    </div>
  
    <Button onClick={saveSettings} style={{backgroundColor: '#00caca', margin: '10px'}}>ذخیره اطلاعات</Button>
    <Button onClick={() => Navigate('/')}>بازگشت به صفحه اصلی</Button>

  </div>
    </div>
    )
}

export default AdminSetting;