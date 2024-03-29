d3.csv("/src/data/b_depressed.csv")
    .then((data) => {
        // Generate filters from input elements on
        // Generate filters from input elements on index.html
        const getFilters = () => {
            let s = {
                sex: 1,
                depressed: 1,
            };
            $(".btn-group-scatter .active input").each(function (d, i) {
                $(this).hasClass("sex2")
                    ? (s.sex = $(this).attr("value"))
                    : (s.depressed = $(this).attr("value"));
                console.log("Sex Scatter : " + s.sex);
                console.log("Depresi Scatter : " + s.depressed);
            });

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
            d.logistic = +d.logistic;
        });

        // Create a new scatter plot instance and pass the filtered data to the scatter plot class
        let scatterplot = new Scatterplot({ parentElement: "#vis2" }, filterData(data));
        // Show chart
        scatterplot.updateVis();

        // Update the data passed to the chart whenever you interact with a button
        $("input").change(() => {
            scatterplot.data = filterData(data);
            scatterplot.updateVis();
        });
    }
    )
    .catch((error) => console.error(error));