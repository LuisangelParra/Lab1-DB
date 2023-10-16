import React, { useEffect, useRef, useState } from "react";
import { getCountiesName, getCountyData2 } from "../api/cities.api";

export function MultieBarChart() {
  const multieBarChartRef = useRef();
  const [countyNames, setCountyNames] = useState([]);
  const [countyNames2, setCountyNames2] = useState([]);
  const [county, setCounty] = useState("Los Angeles County CA");
  const [county2, setCounty2] = useState("Cook County IL");

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
      const cont = await getCountyData2({ county, county2, multieBarChartRef });
    }
    loadCountyData();
  }, [county]);

  useEffect(() => {
    async function loadCountiesNames() {
      const counties = await getCountiesName();
      const keys = Object.keys(counties.data);
      const names2 = keys.map(
        (key) =>
          counties.data[key].RegionName + " " + counties.data[key].StateName
      );

      // Encuentra el índice de "Cook County IL"
      const indexOfCookCounty = names2.indexOf("Cook County IL");

      // Si se encontró "Cook County IL", mueve ese elemento al principio de la lista
      if (indexOfCookCounty !== -1) {
        names2.splice(indexOfCookCounty, 1); // Elimina "Cook County IL" de su posición original
        names2.unshift("Cook County IL"); // Agrega "Cook County IL" al principio de la lista
      }

      setCountyNames2(names2);
    }
    loadCountiesNames();

    async function loadCountyData() {
      const cont = await getCountyData2({ county, county2, multieBarChartRef });
    }
    loadCountyData();
  }, [county2]);

  const handleChange = (e) => {
    setCounty(e.target.value);
    console.log(e.target.value);
  };

  const handleChange2 = (e) => {
    setCounty2(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>County vs County price</h1>
      </div>
      <div>
        <svg ref={multieBarChartRef} width={600} height={600}></svg>
      </div>
      <div>
        <span className="custom-dropdown big">
          <select onChange={handleChange}>
            {countyNames.map((county, index) => (
              <option key={index} value={county}>
                {county}
              </option>
            ))}
          </select>
        </span>
        <span className="custom-dropdown big">
          <select onChange={handleChange2}>
            {countyNames2.map((county2, index) => (
              <option key={index} value={county2}>
                {county2}
              </option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
}
