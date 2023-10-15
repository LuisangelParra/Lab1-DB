import React, { useEffect, useRef, useState } from "react";
import { getCountiesName, getCountyData } from "../api/cities.api";

export function CountieChart() {
  const chartCountyRef = useRef();
  const [countyNames, setCountyNames] = useState([]);
  const [county, setCounty] = useState("Los Angeles County CA");

  useEffect(() => {
    async function loadCountiesNames() {
      const counties = await getCountiesName();
      const keys = Object.keys(counties.data);
      const names = keys.map(
        (key) =>
          counties.data[key].RegionName + " " + counties.data[key].StateName
      );
      setCountyNames(names);
    }
    loadCountiesNames();

    async function loadCountyData() {
      const cont = await getCountyData({ county, chartCountyRef });
    }
    loadCountyData();
  }, [county]);

  const handleChange = (e) => {
    setCounty(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <h1>County Chart</h1>
      <svg ref={chartCountyRef} width={400} height={400} ></svg>
      <select onChange={handleChange}>
        {countyNames.map((county, index) => (
          <option key={index} value={county}>
            {county}
          </option>
        ))}
      </select>
    </div>
  );
}
