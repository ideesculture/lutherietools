<template>
  <div class="graphContainer">
    <div id="chart"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      count: 0
    };
  },
  methods: {
    injectIndexInsideData(data) {
      let result = data.map((x, index) => {
        return { index: index, value: Math.abs(x) };
      });
      return result;
    },
  },
  async mounted() {
    var timeStep = 1;
    // Data
    let dataset = await d3.json(
      "https://lutherietools.ideesculture.fr/api/python/exports/F.json"
    );
    let datasetColor = await d3.json(
      "https://lutherietools.ideesculture.fr/api/python/exports/B.json"
    );
    let timeStepJson = await d3.json(
      "https://lutherietools.ideesculture.fr/api/python/exports/T.json"
    );
    timeStep = timeStepJson[0][1];
    console.log("timeStep", timeStep);

    var tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .attr("class", "tooltip")
      .text("a simple tooltip");

    const dataextract = this.injectIndexInsideData(dataset[1]);

    //console.log(dataextract);
    const maxColor = d3.max(datasetColor, function (row) {
      return d3.max(row, function (column) {
        return column;
      });
    });

    const xAccessor = (d) => d.index * timeStep;
    const yAccessor = function (d) {
      if (d.value > 3000) {
        return -1000;
      } else {
        return Math.round(d.value / 20) * 20;
      }
    };
    const colorAccessor = function (d, indexSerie) {
      return (1 / maxColor) * datasetColor[indexSerie][d.index];
    };

    let dimensions = {
      width: 800,
      height: 800,
      margins: {
        top: 50,
        bottom: 50,
        left: 80,
        right: 50,
      },
    };
    dimensions.ctrWidth =
      dimensions.width - dimensions.margins.left - dimensions.margins.right;
    dimensions.ctrHeight =
      dimensions.height - dimensions.margins.top - dimensions.margins.bottom;

    // Draw image
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const container = svg
      .append("g")
      .attr(
        "transform",
        `translate(${dimensions.margins.left}, ${dimensions.margins.top})`
      );

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(dataextract, xAccessor))
      .rangeRound([0, dimensions.ctrWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 3000])
      .rangeRound([dimensions.ctrHeight, 0]);
    //const colorScale = d3.scaleLinear().domain().rangeRound([0, 1	])

    dataset.forEach((value, index) => {
      let containerZ = svg
        .append("g")
        .attr(
          "transform",
          `translate(${dimensions.margins.left}, ${dimensions.margins.top})`
        );

      containerZ
        .selectAll("circle")
        .data(this.injectIndexInsideData(value))
        .join("circle")
        .attr("cx", (d) => xScale(xAccessor(d)))
        .attr("cy", (d) => yScale(yAccessor(d)))
        .attr("r", 5)
        .attr("fill", "blue")
        .attr("data-temp", xAccessor)
        .style("opacity", (d) => colorAccessor(d, index))
        .on("mouseover", function (d) {
          console.log("target", d);
          if (d.target.style.opacity > 0.06) {
            tooltip.text(
              Math.round(d.target.__data__.value * 100) / 100 + " Hz"
            );
            return tooltip.style("visibility", "visible");
          }
        })
        .on("mousemove", function () {
          return tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          return tooltip.style("visibility", "hidden");
        });

      console.log(index);
    });

    //const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0f"));
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".0f"));

    const xAxisGroup = container
      .append("g")
      .call(xAxis)
      .style("transform", `translateY(${dimensions.ctrHeight}px)`);

    xAxisGroup
      .append("text")
      .attr("x", dimensions.ctrWidth / 2)
      .attr("y", dimensions.margins.bottom - 10)
      .attr("fill", "black")
      .text("Temps (secondes)");

    const yAxisGroup = container.append("g").call(yAxis);

    yAxisGroup
      .append("text")
      .attr("x", -40)
      .attr("y", dimensions.ctrHeight / 2)
      .attr("fill", "black")
      .text("Hz");
  },
};
</script>

<style>
#chart {
  width: 800px;
  height: 800px;
  background-color: white;
  margin: 25px auto;
  position: relative;
}
.tooltip {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid gray;
  padding: 4px;
  border-radius: 4px;
}
</style>
