// Load the CSV file
d3.csv("socialMediaAvg.csv").then(function(data) {
    data.forEach(d => {
        d.AvgLikes = +d.AvgLikes; // Convert string to number
    });

    // Set up SVG canvas
    const margin = { top: 50, right: 30, bottom: 100, left: 80 },
          width = 800 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x0 = d3.scaleBand()
                 .domain([...new Set(data.map(d => d.Platform))])
                 .range([0, width])
                 .padding(0.2);

    const x1 = d3.scaleBand()
                 .domain([...new Set(data.map(d => d.PostType))])
                 .range([0, x0.bandwidth()])
                 .padding(0.05);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.AvgLikes)])
                .nice()
                .range([height, 0]);

    const color = d3.scaleOrdinal()
                    .domain([...new Set(data.map(d => d.PostType))])
                    .range(["#1f77b4", "#ff7f0e", "#2ca02c"]); // Blue, Orange, Green

    // Add Axes
    svg.append("g")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x0));

    svg.append("g")
       .call(d3.axisLeft(y));

    // Group data by platform
    const groupedData = d3.groups(data, d => d.Platform);

    // Draw bars
    svg.selectAll(".platform-group")
       .data(groupedData)
       .enter()
       .append("g")
       .attr("transform", d => `translate(${x0(d[0])},0)`)
       .selectAll("rect")
       .data(d => d[1])
       .enter()
       .append("rect")
       .attr("x", d => x1(d.PostType))
       .attr("y", d => y(d.AvgLikes))
       .attr("width", x1.bandwidth())
       .attr("height", d => height - y(d.AvgLikes))
       .attr("fill", d => color(d.PostType));

    // Legend setup
    const legend = svg.append("g")
                      .attr("transform", `translate(0, -30)`); // Move legend above the chart
    
    const legendKeys = [...new Set(data.map(d => d.PostType))];
    
    const legendItemWidth = 100; // Adjust the spacing of each legend item
    const legendStartX = width / 2 - (legendKeys.length * legendItemWidth) / 2; // Center legend
    
    // Draw legend items
    const legendGroup = legend.selectAll(".legend-item")
                              .data(legendKeys)
                              .enter()
                              .append("g")
                              .attr("class", "legend-item")
                              .attr("transform", (d, i) => `translate(${legendStartX + i * legendItemWidth}, 0)`);
    
    // Add colored rectangles
    legendGroup.append("rect")
               .attr("width", 15)
               .attr("height", 15)
               .attr("fill", d => color(d));
    
    // Add text labels
    legendGroup.append("text")
               .attr("x", 20)
               .attr("y", 12)
               .text(d => d)
               .style("font-size", "12px")
               .attr("alignment-baseline", "middle");
