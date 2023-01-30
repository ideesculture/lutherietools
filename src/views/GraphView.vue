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
      count: 0,
      currentrecord: {},
    };
  },
  methods: {
    injectIndexInsideData(data, index2) {
      let result = data.map((x, index) => {
        return { index: index, indexSerie: index2, value: Math.abs(x) };
      });
      return result;
    },
  },
  async mounted() {
		console.log("url", this.$parent.$parent.url);
		let url = this.$parent.$parent.url;
		url = url.replace("/api/", "/api/json.php/");
		//console.log($route.params.id);
    this.currentrecord = this.$parent.$parent.$data.currentrecord;

    var timeStep = 1;
    // Data
    let matrices = await d3.json(
			url
    );
    let dataset = matrices["F"];
    let datasetColor = matrices["B"];
    let timeStepJson = matrices["T"];
		let ksi = matrices["Ksi"];

    timeStep = timeStepJson[0][1];
    console.log("timeStep", timeStep);

    var tooltip = d3
      .select("#chart")
      .append("div")
      .style("position", "absolute")
			.style("opacity", "1")
      .style("z-index", "10")
      .attr("class", "tooltip")
      .text("")
			.attr("data-html", "true");

    const dataextract = this.injectIndexInsideData(dataset[1]);

    //console.log(dataextract);
    const maxColor = d3.max(datasetColor, function (row) {
      return d3.max(row, function (column) {
        return column;
      });
    });
		const minColor = d3.min(datasetColor, function (row) {
      return d3.min(row, function (column) {
				if(column == -200) return 0;
        return column;
      });
    });
		console.log("maxColor", maxColor);
		console.log("minColor", minColor);

    const xAccessor = (d) => d.index * timeStep;
    const yAccessor = function (d) {
      if (d.value > 3000) {
        return -1000;
      } else {
        return Math.round(d.value / 20) * 20;
      }
    };
    const colorAccessor = function (d, indexSerie) {
			if(datasetColor[indexSerie][d.index] == -200) return 0;
			let opacityValue = datasetColor[indexSerie][d.index];
      //return Math.abs(maxColor)/Math.abs(opacityValue);
			return Math.abs(minColor - opacityValue)/Math.abs(minColor - maxColor);
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
        .data(this.injectIndexInsideData(value, index))
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
						let ksiValue = ksi[d.target.__data__.indexSerie][d.target.__data__.index];
						ksiValue = Math.round(ksiValue * 100) / 100;
            tooltip.html(
              Math.round(d.target.__data__.value * 100) / 100 + " Hz<br />Ksi : "+ksiValue
            );
						//tooltip.co
            return tooltip.style("visibility", "visible");
          }
        })
        .on("mousemove", function () {
          return tooltip
            .style("top", event.pageY - 90 + "px")
            .style("left", event.pageX - 260 + "px");
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


  // ! Creating the legend
  var linearGradient = svg
    .append("linearGradient")
    .attr("id", "linear-gradient");
  //Horizontal gradient
  linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  //Append multiple color stops by using D3's data/enter step
  linearGradient
    .selectAll("stop")
    .data([
      { offset: "0%", color: "#3575B4" },
      { offset: "50%", color: "#FFFFAA" },
      { offset: "100%", color: "#D73027" },
    ])
    .enter()
    .append("stop")
    .attr("offset", function (d) {
      return d.offset;
    })
    .attr("stop-color", function (d) {
      return d.color;
    });
  minLegend = d3.min(opacityBar);
  maxLegend = d3.max(opacityBar);
  sumMinMaxLegend =
    d3.max(opacityBar) +
    d3.min(opacityBar);
  var legendWidth = 600 * 0.3,
    legendHeight = 8;
  //Color Legend container
  var legendsvg = svg
    .append("g")
    .attr("id", "legend")
    .attr(
      "transform",
      "translate(" + (dimensions.margins.left + legendWidth / 2) + "," + (dimensions.margins.top - 50) + ")"
    );
  //Draw the Rectangle
  legendsvg
    .append("rect")
    .attr("class", "legendRect")
    .attr("x", -legendWidth / 2 + 0.5)
    .attr("y", 10)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .style("fill", "url(#linear-gradient)")
    .style("stroke", "black")
    .style("stroke-width", "1px");
  //Append title
  legendsvg
    .append("text")
    .attr("class", "legendTitle")
    .attr("x", 0)
    .attr("y", 2)
    .text("Average Global Surface Temperature");
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
