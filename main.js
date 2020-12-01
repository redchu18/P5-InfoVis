var width = 500;
var height = 500;

d3.csv("starbucksfoods.csv", function (csv) {

  for (var i = 0; i < csv.length; ++i) {
    csv[i].Fat = Number(csv[i].Fat);
    csv[i].Carb = Number(csv[i].Carb);
    csv[i].Fiber = Number(csv[i].Fiber);
    csv[i].Protein = Number(csv[i].Protein);
    csv[i].Calories = Number(csv[i].Calories);
  }

  var fatExtent = d3.extent(csv, function (row) {
	  return row.Fat;
  });
  var carbExtent = d3.extent(csv, function (row) {
	  return row.Carb;
  });
  var fiberExtent = d3.extent(csv, function (row) {
	  return row.Fiber;
  });
  var proteinExtent = d3.extent(csv, function (row) {
	  return row.Protein;
  });
  var caloriesExtent = d3.extent(csv, function (row) {
    return row.Calories;
  });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Axis setup
  // Will hardcode range values later, if Y axis, range will be [470, 30]
  // if X axis, range will be [50, 470]
  var carbXScale = d3.scaleLinear().domain(carbExtent).range([50, 470]);
  var fatXScale = d3.scaleLinear().domain(fatExtent).range([50, 470]);
  var fiberXScale = d3.scaleLinear().domain(fiberExtent).range([50, 470]);
  var proteinXScale = d3.scaleLinear().domain(proteinExtent).range([50, 470]);
  var caloriesXScale = d3.scaleLinear().domain(caloriesExtent).range([50, 470]);

  var carbYScale = d3.scaleLinear().domain(carbExtent).range([470, 30]);
  var fatYScale = d3.scaleLinear().domain(fatExtent).range([470, 30]);
  var fiberYScale = d3.scaleLinear().domain(fiberExtent).range([470, 30]);
  var proteinYScale = d3.scaleLinear().domain(proteinExtent).range([470, 30]);
  var caloriesYScale = d3.scaleLinear().domain(caloriesExtent).range([470, 30]);

  var xAxis = d3.axisBottom().scale(caloriesXScale);
  var yAxis = d3.axisLeft().scale(caloriesYScale);

  //Create SVGs for charts
  var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("width", 550)
    .attr("height", 550);

  //add scatterplot points
  var circles1 = chart1
    .selectAll("circle")
    .data(csv)
    .enter()
    .append("circle")
    .attr("id", function (d, i) {
      return i;
    })
    .attr("stroke", "black")
    .attr("cx", function (d) {
      return caloriesXScale(d.Calories);
    })
    .attr("cy", function (d) {
      return caloriesYScale(d.Calories);
    })
    .attr("r", 5)
    .on("click", function (d, i) {
      d3.selectAll("circle").attr("fill", "black");
      d3.select(this).attr("fill", "pink");
      document.getElementById("Fat").textContent = d.Fat;
      document.getElementById("Carb").textContent = d.Carb;
      document.getElementById("Fiber").textContent = d.Fiber;
      document.getElementById("Protein").textContent = d.Protein;
      document.getElementById("Calories").textContent = d.Calories;
    });

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  chart1 // or something else that selects the SVG element in your visualizations
    .append("g") // create a group node
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

    chart1.append("text")
    .attr("x", 200)
    .attr("y", 515)
    .text(document.getElementById("xAxis").value)
    .attr("id", "xAxisID")
    .style("font-size", "15px");

    chart1.append("text")
    .attr("x", -300)
    .attr("y", 10)
    .text(document.getElementById("yAxis").value)
    .attr("id", "yAxisID")
    .style("font-size", "15px")
    .attr("transform", "rotate(-90)");

    d3.select(document.getElementById("xAxis"))
    .on("change", function() {
      document.getElementById("xAxisID").textContent = document.getElementById("xAxis").value
    })

    d3.select(document.getElementById("yAxis"))
    .on("change", function() {
      document.getElementById("yAxisID").textContent = document.getElementById("yAxis").value
    })

});
