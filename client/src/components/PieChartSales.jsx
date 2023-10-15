import React, { useEffect, useRef, useState } from "react";
import {
  getStateNames,
  getStateYears,
  getStateData,
  getStateChartData,
} from "../api/sales.api";

export function PieChartSales() {
  const chartStateRef = useRef();
  const [stateNames, setstateNames] = useState([]);
  const [state, setState] = useState("Massachusetts");
  const [stateYears, setStateYears] = useState([]);
  const [year, setYear] = useState("2014");

  useEffect(() => {
    async function loadStateNames() {
      const states = await getStateNames();
      const keys = Object.keys(states.data);
      const names = keys.map((key) => states.data[key].State);
      // Select names withouth duplicates
      const uniqueNames = [...new Set(names)];
      // Poner de primero el estado de Massachusetts
      uniqueNames.sort();
      uniqueNames.unshift("Massachusetts");
      setstateNames(uniqueNames);
    }
    loadStateNames();

    async function loadStateYears() {
      const stateYears = await getStateYears({ state });
      const keys = Object.keys(stateYears.data);
      const years = keys.map((key) => stateYears.data[key].Year);
      setYear(years[0]);
      setStateYears(years);
    }
    loadStateYears();
  }, [state]);

  useEffect(() => {
    async function loadStateData() {
      const data = await getStateData({ state, year });
      console.log(data);
    }
    loadStateData();

    async function loadSateChartData() {
      const cont = await getStateChartData({ state, year, chartStateRef });
    }
    loadSateChartData();
  }, [year]);

  const handleChange = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
  };

  const handleChange2 = (e) => {
    setYear(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <h1>Pie Chart</h1>
      <select onChange={handleChange}>
        {stateNames.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select onChange={handleChange2}>
        {stateYears.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <svg ref={chartStateRef} width={600} height={600}></svg>
    </div>
  );
}
