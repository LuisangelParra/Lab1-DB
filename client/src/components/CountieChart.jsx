import React, { useEffect, useRef, useState } from 'react';
import {getCountiesName, getCountyData} from '../api/cities.api'
import * as d3 from 'd3';

export function CountieChart() {
  const chartCountyRef = useRef();
  const [countyNames, setCountyNames] = useState([]);
  const [county, setCounty] = useState("Los Angeles County");

  useEffect(() => {
    async function loadCountiesNames() {
      const counties =  await getCountiesName();
      const keys = Object.keys(counties.data);
      const names = keys.map(key => counties.data[key].RegionName);
      setCountyNames(names);
    }
    loadCountiesNames();

    async function loadCountyData() {
      const cont =  await getCountyData({county});
    }
    loadCountyData();

  }, [county]);


  const handleChange = (e) => {
    setCounty(e.target.value)
    chartCountyRef
    console.log(e.target.value)
}

  return(
    <div>
      <h1>County Chart</h1>
      <select onChange={handleChange}>
        {countyNames.map((county, index) => (
          <option key={index} value={county}>
            {county}
          </option>
        ))}
      </select>
    </div>
  );

};
