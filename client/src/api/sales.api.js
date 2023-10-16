import axios from "axios";

export const getStateNames = () => {
    return axios.get(`http://127.0.0.1:8000/sales/api/sales/`)
};
export const getStateYears = ({ state }) => {
    return axios.get(`http://127.0.0.1:8000/sales/api/sales?State=${state}`)
};

export const getStateData = ({ state, year }) => {
    return axios.get(`http://127.0.0.1:8000/sales/api/sales?State=${state}&Year=${year}`)
};

export const getStateChartData = ({ state, year, chartStateRef }) => {
    // Specify the chart’s dimensions.
    const width = 928;
    const height = Math.min(width, 500);

    d3.json(`http://127.0.0.1:8000/sales/api/sales?State=${state}&Year=${year}`)
        .then(function (data) {
            const cityCounts = {};
            data.forEach(d => {
                if (cityCounts[d.City]) {
                    cityCounts[d.City]++;
                } else {
                    cityCounts[d.City] = 1;
                }
            });
            
            const cityData = Object.keys(cityCounts).map(city => ({
                city: city,
                cantidad: cityCounts[city],
            }));

            // Specify the chart’s dimensions.
            const width = 928;
            const height = Math.min(width, 500);

            // Create the color scale.
            const color = d3.scaleOrdinal()
                .domain(cityData.map(d => d.city))
                .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), cityData.length).reverse())

            // Create the pie layout and arc generator.
            const pie = d3.pie()
                .sort((a, b) => a.cantidad - b.cantidad) 
                .value(d => d.cantidad);

            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(Math.min(width, height) / 2 - 1);

            const labelRadius = arc.outerRadius()() * 0.8;

            // A separate arc generator for labels.
            const arcLabel = d3.arc()
                .innerRadius(labelRadius)
                .outerRadius(labelRadius);

            const arcs = pie(cityData);

            const svg = d3.select(chartStateRef.current);
            svg.selectAll("*").remove();

            // Create the SVG container.
            svg.append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-width / 2, -height / 2, width, height])
                .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

            const g = svg.append("g")
                .attr("transform", `translate(${width / 3}, ${height / 2})`);

            // Add a sector path for each value.
            // Add a sector path for each value.
            g.append("g")
                .attr("stroke", "white")
                .selectAll()
                .data(arcs)
                .join("path")
                .attr("fill", d => color(d.data.city))
                .attr("d", arc)
                .append("title")
                .text(d => `${d.data.city}: ${d.data.cantidad}`);

            // Create a new arc generator to place a label close to the edge.
            // The label shows the value if there is enough room.
            g.append("g")
                .attr("text-anchor", "middle")
                .selectAll()
                .data(arcs)
                .join("text")
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .call(text => text.append("tspan")
                    .attr("y", "-0.4em")
                    .attr("font-weight", "bold")
                    .text(d => d.data.city))
                .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                    .attr("x", 0)
                    .attr("y", "0.7em")
                    .attr("fill-opacity", 0.7)
                    .text(d => d.data.cantidad));

        });
};