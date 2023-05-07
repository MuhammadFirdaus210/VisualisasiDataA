/**
 * Load data from CSV file asynchronously and render chart
 */
d3.csv("/src/data/b_depressed.csv")
    .then((data) => {
        // Generate filters from input elements on index.html
        const getFilters = () => {
            let s = {
                sex: 1,
                depressed: 1,
            };
            $(".btn-group-heatmap .active input").each(function (d, i) {
                $(this).hasClass("sex3")
                    ? (s.sex = $(this).attr("value"))
                    : (s.depressed = $(this).attr("value"));
            });
            console.log("Sex Heatmap : " + s.sex);
            console.log("Depresi HEatmap : " + s.depressed);

            return s;
        };

        // Actually filter the data
        const filterData = (data) => {
            let filters = getFilters();
            return data.filter((d) => d.sex == filters.sex && d.depressed == filters.depressed);

        };

        // TO DO di sini: any tranformations of the data
        data.forEach((d) => {
            d.percent = +d.percent;
        });

        // Create a new heatmap instance and pass the filtered data to the heatmap class
        let heatmap = new Heatmap({ parentElement: "#visHeatmap" }, filterData(data));
        // Show chart
        heatmap.updateVis();

        // Update the data passed to the chart whenever you interact with a button
        $("input").change(() => {
            heatmap.data = filterData(data);
            heatmap.updateVis();
        });

    })
    .catch((error) => console.error(error));