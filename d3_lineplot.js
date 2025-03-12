// Set up dimensions
const margin = { top: 50, right: 30, bottom: 80, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Append SVG to the body
const svg = d3.select("body")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);

// Load the CSV file
d3.csv("socialMediaTime.csv").then(data => {
    // Convert strings to numbers
    data.forEach(d => {
        d.AvgLikes = +d.AvgLikes;
    });

    // Define scales
    const xScale = d3.scaleBand()
                     .domain(data.map(d => d.Date))
                     .range([0, width])
                     .padding(0.1);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => d.AvgLikes)])
                     .range([height, 0]);

    // Define the line generator
    const line = d3.line()
                   .x(d => xScale(d.Date) + xScale.bandwidth() / 2)  // Center line on ticks
                   .y(d => yScale(d.AvgLikes))
                   .curve(d3.curveNatural);  // Smooth curve

    // Append path for the line
    svg.append("path")
       .datum(data)
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 2)
       .attr("d", line);

    // Add x-axis
    svg.append("g")
       .attr("transform", `translate(0, ${height})`)
       .call(d3.axisBottom(xScale))
       .selectAll("text")
       .style("text-anchor", "end")
       .attr("transform", "rotate(-25)");  // Rotate labels

    // Add y-axis
    svg.append("g")
       .call(d3.axisLeft(yScale));

    // Add labels
    svg.append("text")
       .attr("x", width / 2)
       .attr("y", height + margin.bottom - 30)
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .text("Date");

    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -height / 2)
       .attr("y", -margin.left + 20)
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .text("Average Likes");
});
