import axios from "axios";

export const getCountiesName = () => {
    return axios.get(`http://127.0.0.1:8000/cities/api/cities?Year=2000`)
};

export const getCounty = ({ county }) => {
    return axios.get(`http://127.0.0.1:8000/cities/api/cities?RegionName=${county}`)
};

export const getCountyData = ({ county, chartCountyRef }) => {

    // set the dimensions and margins of the graph
    var margin = 100,
        width = 600 - margin,
        height = 500 - margin;


    const svg = d3.select(chartCountyRef.current);

    svg.selectAll("*").remove();


    // append the svg object to the body of the page
    svg.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")


    // return axios.get(`http://127.0.0.1:8000/cities/api/cities?RegionName=${county}`)

    //Separar string county por espacio
    var words = county.split(" ");
    var stateAbbreviation = words[words.length - 1];
    county = county.replace(" " + stateAbbreviation, "");
    var stateName = stateAbbreviation


    //Read the data
    d3.json(`http://127.0.0.1:8000/cities/api/cities?RegionName=${county}&StateName=${stateName}`)
        .then(function (data) {
            console.log(data.y)
            // Add X axis
            var x = d3.scaleLinear()
                .domain([2000, 2023])
                .range([0, width])

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return + d.Average; })])
                .range([height, 0]);

            // X label
            svg.append('text')
                .attr('x', width / 2 + 70)
                .attr('y', height - 15 + 150)
                .attr('text-anchor', 'middle')
                .attr("fill", "white") 
                .style('font-family', 'Helvetica')
                .style('font-size', 12)
                .text('Year');

            // Y label
            svg.append('text')
                .attr('text-anchor', 'middle')
                .attr("fill", "white")
                .attr('transform', 'translate(10,' + (height-100) + ')rotate(-90)')
                .style('font-family', 'Helvetica')
                .style('font-size', 12)
                .text('Price');
            
            var xFormat = d3.format(".0f");
            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(" + 70 + "," + (height+100) + ")")
                .call(d3.axisBottom(x).tickFormat(xFormat))

            // Add the Y Axis
            svg.append("g")
                .attr("transform", "translate(" + 70 + "," + (100) + ")")
                .call(d3.axisLeft(y));

            // Add the line


            var line = d3.line()
                .x(function (d) { return x(d.Year); })
                .y(function (d) { return y(d.Average); })
                .curve(d3.curveMonotoneX)

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("transform", "translate(" + 70 + "," + 200 + ")")
                .attr("d", line)
                .style("fill", "none")
                .style("stroke", "steelblue")
                .style("stroke-width", "2");


            // Add the points


            svg.append('g')
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return x(d.Year); })
                .attr("cy", function (d) { return y(d.Average); })
                .attr("r", 5)
                .attr("transform", "translate(" + 70 + "," + 200 + ")")
                .style("fill", "#69b3a2");



        });
};

export const getCountiesYearMap = ({ year, mapCountiesRef }) => {
    var margin = { top: 10, right: 10, bottom: 10, left: 10 };

    var chart_width = 1000 - margin.left - margin.right;
    var chart_height = 700 - margin.top - margin.bottom;

    var color = d3.scaleThreshold().range(d3.schemeGnBu[9]);

    function scale(scaleFactor, width, height) {
        return d3.geoTransform({
            point: function (x, y) {
                this.stream.point(
                    (x - width / 2) * scaleFactor + width / 2,
                    (y - height / 2) * scaleFactor + height / 2
                );
            },
        });
    }

    var path = d3.geoPath().projection(scale(1, chart_width, chart_height));

    var countries = [];

    var svg = d3.select(mapCountiesRef.current);
    svg.select("#chart").select("svg");

    svg.selectAll("*").remove();

    svg.select("#chart")
        .append("svg")
        .attr("width", chart_width)
        .attr("height", chart_height);

    d3.json(`http://127.0.0.1:8000/cities/api/cities?Year=${year}`).then(function (
        data
    ) {
        var filteredMin = d3.min(data, function (d) {
            if (parseFloat(d.Average) !== 0) {
                return d.Average;
            } else {
                return null;
            }
        });

        // Filtrar los valores nulos
        var min = d3.min(data, function (d) {
            if (d !== null) {
                var value = parseFloat(d.Average);
                return value;
            }
        });

        var max = d3.max(data, function (d) {
            var value = parseFloat(d.Average);
            return value;
        });
        //last value of d3.range (below) is the step value and bin size.
        //anything less than min will be the first colour in d3.range, and anything above or equal to max will be the last color in d3.range
        color.domain(d3.range(min, max, (max - min) / 8));
        countries.push(data);

        d3.json(
            "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"
        ).then(function (data) {
            var geojsonStates = topojson.mesh(
                data,
                data.objects.states,
                function (a, b) {
                    return a !== b;
                }
            );

            var geojsonCounties = topojson.feature(
                data,
                data.objects.counties
            ).features;
            for (var i = 0; i < countries[0].length; i++) {
                var state = countries[0][i].StateName;
                var Average = countries[0][i].Average;
                var countyFips = countries[0][i].FipsCode;
                var county = countries[0][i].RegionName;

                for (var j = 0; j < geojsonCounties.length; j++) {
                    var countyId = geojsonCounties[j].id;
                    if (countyFips == countyId) {
                        geojsonCounties[j].properties.value = {
                            Average: Average,
                            state: state,
                            county: county,
                        };
                    }
                }
            }
            // Selecciona los elementos que deseas resaltar
            svg
                .selectAll("path")
                .data(geojsonCounties)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", function (d) {
                    var value = d.properties.value;
                    if (value) {
                        return color(value.Average);
                    } else {
                        return "#ccc";
                    }
                })
                .on("mouseover", function (d) {
                    var coordinates = [];
                    coordinates = d3.mouse(this);
                    
                    d3.select("#tooltip")
                        .style("background-color", "rgb(255, 247, 188)")
                        .style("opacity", "0.8")
                        .style("left", coordinates[0] + 200 + "px")
                        .style("top", coordinates[1] - 30 + "px")
                        .style("display", "block")
                        .html(function () {
                            var customContent = d.properties.value.state + " " + d.properties.value.county;
                            if (d.properties.value.Average == 0) {
                                customContent += " No Data";
                            } else {
                                customContent += " $" + d.properties.value.Average;
                            }
                            return customContent;
                        });

                    // Cambiar el borde al colocar el cursor
                    d3.select(this).attr("stroke", "black");
                })
                .on("mouseout", function () {
                    d3.select("#tooltip").style("display", "none");

                    // Restablecer el borde al retirar el cursor
                    d3.select(this).attr("stroke", "none");
                });

            svg
                .append("path")
                .datum(
                    topojson.mesh(data, data.objects.states, function (a, b) {
                        return a !== b;
                    })
                )
                .attr("d", path)
                .attr("margin", 2)
                .attr("stroke", "grey")
                .attr("stroke-linejoin", "round")
                .attr("fill", "none");

            var legend = svg
                .selectAll("rect")
                .data(d3.schemeGnBu[8])
                .enter()
                .append("rect")
                .attr("y", 10)
                .attr("x", function (d, i) {
                    return 650 + i * 37.5;
                })
                .attr("width", 37.5)
                .attr("height", 10)
                .style("fill", function (d) {
                    return d;
                });

            var data = countries[0]; // Suponiendo que tienes un arreglo de datos llamado countries.

            // Especifica un valor de umbral (por ejemplo, 1e-10) para considerar valores diferentes de cero.
            var threshold = 1e-10;

            // Filtra los elementos con Average que son mayores que el umbral.
            var filteredData = data.filter(function (d) {
                var value = parseFloat(d.Average);
                return Math.abs(value) > threshold;
            });

            // Calcula el valor mínimo en los datos filtrados.
            var min = d3.min(filteredData, function (d) {
                return d.Average;
            });

            var max = d3.max(countries[0], function (d) {
                var value = parseFloat(d.Average);
                return value;
            });

            var axisValues = d3.range(
                Math.round(min),
                Math.round(max),
                (Math.round(max) - Math.round(min)) / 8
            );

            var legendScale = d3
                .scaleLinear()
                .domain([Math.round(min), Math.round(max)])
                .range([650, 950]);

            var legendAxis = d3
                .axisBottom()
                .scale(legendScale)
                .ticks(8)
                .tickValues(axisValues)
                .tickFormat(function (element) {
                    const element2 = Math.round(element);
                    return "$" + element2;
                })
                .tickSize(15);

            svg
                .append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0, 10)")
                .call(legendAxis);
        });
    });
};
