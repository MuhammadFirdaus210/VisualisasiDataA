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
      $(".btn-group .active input").each(function (d, i) {
        $(this).hasClass("sex")
          ? (s.sex = $(this).attr("value"))
          : (s.depressed = $(this).attr("value"));
      });

      return s;
    };

    // Actually filter the data
    const filterData = (data) => {
      let filters = getFilters();
      console.log(data.filter((d) => d.sex == filters.sex && d.depressed == filters.depressed))
      return data.filter((d) => d.sex == filters.sex && d.depressed == filters.depressed);

    };

    // TO DO di sini: any tranformations of the data
    data.forEach((d) => {
      d.percent = +d.percent;
    });

    // Create a new bar chart instance and pass the filtered data to the bar chart class
    let barchart = new Barchart({ parentElement: "#vis" }, filterData(data));
    // Show chart
    barchart.updateVis();

    // Update the data passed to the chart whenever you interact with a button
    $("input").change(() => {
      barchart.data = filterData(data);
      barchart.updateVis();
    });

    // // Create a new pie chart instance and pass the filtered data to the pie chart class
    // let piechart = new Piechart({ parentElement: "#visPiechart" }, filterData(data));
    // // Show chart
    // piechart.updateVis();
  })
  .catch((error) => console.error(error));
