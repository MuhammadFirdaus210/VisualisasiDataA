class Piechart {
    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 600,
            containerHeight: _config.containerHeight || 400,
            margin: _config.margin || { top: 10, right: 10, bottom: 10, left: 10 },
        };
        this.data = _data;
        this.initVis();
    }

    initVis() {
        let vis = this;

        // Calculate inner chart size
        vis.width =
            vis.config.containerWidth;
        vis.height =
            vis.config.containerHeight;

        // Set up color scale
        vis.color = d3.scaleOrdinal().range(d3.schemeCategory10);

        // Luas Svg 
        vis.svg = d3
            .select(vis.config.parentElement)
            .append("svg")
            .attr("width", vis.config.containerWidth)
            .attr("height", vis.config.containerHeight);

        // Append group element that will contain our actual chart
        vis.chart = vis.svg
            .append("g")
            .attr(
                "transform",
                `translate(${vis.config.containerWidth / 2}, ${vis.config.containerHeight / 2
                })`
            );

        vis.updateVis();
    }

    updateVis() {
        let vis = this;

        // Calculate total number of members
        const totalMembers = d3.sum(vis.data, (d) => d.Age);

        // Generate pie layout
        const pie = d3
            .pie()
            .value((d) => d.Age)
            .sort(null);

        // Generate arc paths
        const arc = d3
            .arc()
            .innerRadius(0)
            .outerRadius(Math.min(vis.width, vis.height) / 2 - 1);

        // Bind data to path elements
        const paths = vis.chart.selectAll("path").data(pie(vis.data));

        // Enter new path elements
        paths
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d) => vis.color(d.data.Married));

        // Update existing path elements
        paths
            .attr("d", arc)
            .attr("fill", (d) => vis.color(d.data.Married));

        // Exit old path elements
        paths.exit().remove();
    }
}
