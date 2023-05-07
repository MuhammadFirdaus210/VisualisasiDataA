class Heatmap {
    constructor(options, data) {
        this.parentElement = options.parentElement;
        this.data = data;
        this.margin = { top: 10, right: 10, bottom: 30, left: 40 };
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 700 - this.margin.top - this.margin.bottom;

        // Create SVG container for heatmap
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
            .attr("transform", "translate(50," + (this.height - 50) + ")")
            .call(this.xAxis)
            .selectAll("text")
            .style("font-size", "10px");

        this.svg
            .append("g")
            .attr("transform", "translate(+50,10)")
            .call(this.yAxis)
            .selectAll("text")
            .style("font-size", "9px");

        // Add x and y axis labels
        this.svg
            .append("text")
            .attr(
                "transform",
                "translate(" + this.width / 2 + "," + (this.height + this.margin.bottom - 30) + ")"
            )
            .style("text-anchor", "middle")
            .text("Age");

        this.svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margin.top - 15)
            .attr("x", 0 - this.height / 2)
            .style("text-anchor", "middle")
            .text("Save Asset");

        // Create color scale
        this.colorScale = ['#FEF2F2', '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', "#000000"];

        // Update heatmap
        this.updateVis();
    }

    updateVis() {
        // Bind data to heatmap cells
        const heatmapCells = this.svg.selectAll("rect").data(this.data);

        const colorValues = this.data.map((d) => {
            const temp = d.Age;
            const temp2 = d.save_asset;
            if (!temp2 && !temp) {
                return this.colorScale[10];
            } else if (temp >= 17 && temp < 25 && temp2) {
                return this.colorScale[0];
            } else if (temp >= 25 && temp < 33 && temp2) {
                return this.colorScale[1];
            } else if (temp >= 33 && temp < 41 && temp2) {
                return this.colorScale[2];
            } else if (temp >= 41 && temp < 49 && temp2) {
                return this.colorScale[3];
            } else if (temp >= 49 && temp < 57 && temp2) {
                return this.colorScale[4];
            } else if (temp >= 57 && temp < 65 && temp2) {
                return this.colorScale[5];
            } else if (temp >= 65 && temp < 73 && temp2) {
                return this.colorScale[6];
            } else if (temp >= 73 && temp < 81 && temp2) {
                return this.colorScale[7];
            } else if (temp >= 81 && temp < 89 && temp2) {
                return this.colorScale[8];
            } else if (temp >= 89 && temp < 92 && temp2) {
                return this.colorScale[9];
            }
        });

        // Create new heatmap cells for any new data points
        heatmapCells
            .data(this.data, function (d) {
                return d;

            })
            .join("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("x", (d) => {
                if (d.Age !== undefined) {
                    return this.xScale(d.Age) + 50;
                }
                return this.xScale(10) + 50; // set default x value if Age is undefined
            })
            .attr("y", (d) => {
                if (d.save_asset !== undefined) {
                    return this.yScale(d.save_asset);
                }
                return this.yScale(10); // set default y value if save_asset is undefined
            })
            .merge(heatmapCells)
            .transition() // add transition for smooth update
            .duration(300) // set duration of transition to 1 second
            .delay((d, i) => i * 5)
            .attr("fill", (d, i) => {
                if (d.Age !== undefined || d.save_asset !== undefined) {
                    return colorValues[i];
                }
                return "white"; // set default fill color if x or y value is missing
            });
        // .enter()


        // Remove any heatmap cells that no longer have corresponding data points
        heatmapCells.exit().remove();
    }
}

