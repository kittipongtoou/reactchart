import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { DynamicBarChart } from 'react-dynamic-charts';
import 'react-dynamic-charts/dist/index.css';
import axios from 'axios';

function transformBarData(data) {
  let data_covid = [];
  data.forEach((value) => {
    var cases = value.timeline.cases;
    const result = Object.keys(cases).map((key) => cases[key]);
    if(value.province != null){
      data_covid.push({'country':value.country + '('+ value.province +')','values':result.slice(-1)[0]})
    }else{
      data_covid.push({'country':value.country,'values':result.slice(-1)[0]})
    }
 })
 console.log(data_covid)
 return {
  data_covid
  }
}



function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getdata(); 
  }, []);

  const getdata = async () => {
    const result = await axios(
      'https://disease.sh/v3/covid-19/historical?lastdays=all',
    );
    setData(transformBarData(result.data));
  };
  return (
    <div className="App">
      <DynamicBarChart
        data={data}
      /> 
    </div>
  );
}

export default App;
