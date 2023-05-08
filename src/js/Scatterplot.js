class Scatterplot {
    constructor(options, data) {
        this.parentElement = options.parentElement;
        this.data = data;
        this.margin = { top: 10, right: 10, bottom: 30, left: 40 };
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 700 - this.margin.top - this.margin.bottom;

        // Create SVG container for scatter plot
        this.svg = d3
            .select(this.parentElement)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        // Create scales for x and y axes
        this.xScale = d3
            .scaleLinear()
            .domain([15, d3.max(this.data, (d) => d.Age)])
            .range([0, this.width - 100]);

        this.yScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.data, (d) => d.save_asset)])
            .range([this.height - 60, 10]);

        // Create x and y axes
        this.xAxis = d3.axisBottom(this.xScale);
        this.yAxis = d3.axisLeft(this.yScale);

        // Add x and y axes to SVG container
        this.svg
            .append("g")
            .attr("width", this.width)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .attr("transform", "translate(50," + (this.height - 60) + ")")
            .call(this.xAxis).selectAll("text")
            .style("font-size", "10px");

        this.svg
            .append("g").attr("transform", "translate(+50,0)")
            .call(this.yAxis)
            .selectAll("text")
            .style("font-size", "9px");

        // Add x and y axis labels
        this.svg
            .append("text")
            .attr("transform", "translate(" + this.width / 2 + "," + (this.height + this.margin.bottom - 30) + ")")
            .style("text-anchor", "middle")
            .text("Age");

        this.svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margin.top - 15)
            .attr("x", 0 - this.height / 2)
            // .attr("dy", "100px")
            .style("text-anchor", "middle")
            .text("Save Asset");
    }

    updateVis() {
        // Bind data to circles
        const circles = this.svg.selectAll("circle").data(this.data);

        // Create new circles for any new data points
        circles
            .enter()
            .append("circle")
            .style("fill", "#FACC15")
            .attr("r", 3)
            .attr("cy", this.yScale(0))
            .merge(circles)
            .transition() // Add transition
            .duration(1000) // Set duration of transition to 1 second
            .delay((d, i) => i * 10) // Add 10ms delay between each circle
            .attr("cx", (d) => this.xScale(d.Age) + 50)
            .attr("cy", (d) => this.yScale(d.save_asset));

        // .attr("cx", (d) => this.xScale(d.Age))
        // Remove any circles that no longer have corresponding data points
        circles.exit().remove();
    }

}
