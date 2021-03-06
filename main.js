var width = 500;
var height = 500;

d3.csv("starbucksfoods.csv", function(csv) {

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

  //Create SVGs for chart 1
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
    .attr("cx", function (d) {
      return caloriesXScale(d.Calories);
    })
    .attr("cy", function (d) {
      return caloriesYScale(d.Calories);
    })
    .attr("r", 5)
    .on("click", function (d, i) {
      d3.selectAll("circle").attr("r", "5").attr('stroke-opacity', 0);
      d3.select(this).attr("r", "7").attr('stroke', 'black').attr('stroke-opacity', 1);
      document.getElementById("ItemName").textContent = d.Item;
      document.getElementById("Fat").textContent = d.Fat;
      document.getElementById("Carb").textContent = d.Carb;
      document.getElementById("Fiber").textContent = d.Fiber;
      document.getElementById("Protein").textContent = d.Protein;
      document.getElementById("Calories").textContent = d.Calories;
    });

    //color every point according to it's category
    circles1.filter(function(d) {
      return (d.Category === "Yogurt & Custard")
    }).style('fill', 'gray')

    circles1.filter(function(d) {
      return (d.Category === "Lunch")
    }).style('fill', 'blue')

    circles1.filter(function(d) {
      return (d.Category === "Hot Breakfast")
    }).style('fill', 'red')

    circles1.filter(function(d) {
      return (d.Category === "Snacks & Sweets")
    }).style('fill', 'purple')

    circles1.filter(function(d) {
      return (d.Category === "Bakery")
    }).style('fill', 'green')


  //append axes to the charts
  chart1 
    .append("g") 
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis) 
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .attr("id", "xAxisElement")
    .style("text-anchor", "end");

  chart1 
    .append("g") 
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .attr("id", "yAxisElement")
    .style("text-anchor", "end");

  //append axis labels to the chart, these will be updated based on user input
  chart1.append("text")
    .attr("x", 225)
    .attr("y", 515)
    .text(document.getElementById("xAxis").value)
    .attr("id", "xAxisID")
    .style("font-size", "15px");

  chart1.append("text")
    .attr("x", -275)
    .attr("y", 15)
    .text(document.getElementById("yAxis").value)
    .attr("id", "yAxisID")
    .style("font-size", "15px")
    .attr("transform", "rotate(-90)");

  //add on change helper to dropdown menus
  d3.select(document.getElementById("xAxis"))
    .on("change", x => { 
        axisHelper();
        changeCircleX(); 
      }
    );

  d3.select(document.getElementById("yAxis"))
    .on("change", x => { 
        axisHelper();
        changeCircleY(); 
      }
    );

  //this axis helper function updates the chart when a dropdown is updated
  function axisHelper() {

    var xVariable = document.getElementById("xAxis").value;
    var yVariable = document.getElementById("yAxis").value;

    //Change the axis name
    document.getElementById("yAxisID").textContent = yVariable;
    document.getElementById("xAxisID").textContent = xVariable;

    //remove previous axes
    chart1.selectAll("g").remove();

    //Change axis
    switch (xVariable) {
      case "Calories":
        console.log("Calories");
        var xAxis = d3.axisBottom().scale(caloriesXScale);
        break;
      case "Fat":
        console.log("Fat");
        var xAxis = d3.axisBottom().scale(fatXScale);
        break;
      case "Carb":
        console.log("Carb");
        var xAxis = d3.axisBottom().scale(carbXScale);
        break;
      case "Fiber":
        console.log("Fiber");
        var xAxis = d3.axisBottom().scale(fiberXScale);
        break;
      case "Protein":
        console.log("Protein");
        var xAxis = d3.axisBottom().scale(proteinXScale);
        break;
    }

    chart1
    .append("g")
    .attr("transform", "translate(0," + (width - 30) + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .attr("id", "xAxisElement")
    .style("text-anchor", "end");

    //Change axis
    switch (yVariable) {
      case "Calories":
        console.log("Calories");
        var yAxis = d3.axisLeft().scale(caloriesYScale);
        break;
      case "Fat":
        console.log("Fat");
        var yAxis = d3.axisLeft().scale(fatYScale);
        break;
      case "Carb":
        console.log("Carb");
        var yAxis = d3.axisLeft().scale(carbYScale);
        break;
      case "Fiber":
        console.log("Fiber");
        var yAxis = d3.axisLeft().scale(fiberYScale);
        break;
      case "Protein":
        console.log("Protein");
        var yAxis = d3.axisLeft().scale(proteinYScale);
        break;
    }

    chart1 
    .append("g") 
    .attr("transform", "translate(50, 0)")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .attr("id", "yAxisElement")
    .style("text-anchor", "end");
  }

  //helper function, when Y axis is updated, this updates the Y coordinates of the points
  function changeCircleY() {
    var yVariable = document.getElementById("yAxis").value;
    switch (yVariable) {
      case "Calories":
        console.log("Calories");
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cy", function (d) { return caloriesYScale(d.Calories); });
        break;
      case "Fat":
        console.log("Fat");
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cy", function (d) { return fatYScale(d.Fat); });
        break;
      case "Carb":
        console.log("Carb");
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cy", function (d) { return carbYScale(d.Carb); });
        break;
      case "Fiber":
        console.log("Fiber");
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cy", function (d) { return fiberYScale(d.Fiber); });
        break;
      case "Protein":
        console.log("Protein");
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cy", function (d) { return proteinYScale(d.Protein); });
        break;
    }
  }

  //helper function, when X axis is updated, this updates the Y coordinates of the points
  function changeCircleX() {
    var xVariable = document.getElementById("xAxis").value;
    switch (xVariable) {
      case "Calories":
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cx", function (d) { return caloriesXScale(d.Calories); });
        break;
      case "Fat":
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cx", function (d) { return fatXScale(d.Fat); });
        break;
      case "Carb":
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cx", function (d) { return carbXScale(d.Carb); });
        break;
      case "Fiber":
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cx", function (d) { return fiberXScale(d.Fiber); });
        break;
      case "Protein":
        circles1.data(csv)
          .transition()
          .duration(500)
          .attr("cx", function (d) { return proteinXScale(d.Protein); });
        break;
    }
  }

  //code for checkboxes. If a category is not checked, the points in that category will have it's opacity changed accordingly
    d3.select(document.getElementById("Bakery"))
    .on("click", function() {
        if (document.getElementById("Bakery").checked != true) {
          circles1.filter(function(d) {
            return (d.Category === "Bakery")
          }).transition()
            .duration(500)
            .style('fill-opacity', 0);
        } else {
          circles1.filter(function(d) {
            return (d.Category === "Bakery")
          }).transition()
            .duration(500)
            .style('fill-opacity', 1)
        }
    })

    d3.select(document.getElementById("Lunch"))
    .on("click", function() {
        if (document.getElementById("Lunch").checked != true) {
          circles1.filter(function(d) {
            return (d.Category === "Lunch")
          }).transition()
            .duration(500)
            .style('fill-opacity', 0)
        } else {
          circles1.filter(function(d) {
            return (d.Category === "Lunch")
          }).transition()
            .duration(500)
            .style('fill-opacity', 1)
        }
    })

    d3.select(document.getElementById("Hot Breakfast"))
    .on("click", function() {
        if (document.getElementById("Hot Breakfast").checked != true) {
          circles1.filter(function(d) {
            return (d.Category === "Hot Breakfast")
          }).transition()
            .duration(500)
            .style('fill-opacity', 0)
        } else {
          circles1.filter(function(d) {
            return (d.Category === "Hot Breakfast")
          }).transition()
            .duration(500)
            .style('fill-opacity', 1)
        }
    })

    d3.select(document.getElementById("Snacks & Sweets"))
    .on("click", function() {
        if (document.getElementById("Snacks & Sweets").checked != true) {
          circles1.filter(function(d) {
            return (d.Category === "Snacks & Sweets")
          }).transition()
            .duration(500)
            .style('fill-opacity', 0)
        } else {
          circles1.filter(function(d) {
            return (d.Category === "Snacks & Sweets")
          }).transition()
            .duration(500)
            .style('fill-opacity', 1)
        }
    })

    d3.select(document.getElementById("Yogurt & Custard"))
    .on("click", function() {
        if (document.getElementById("Yogurt & Custard").checked != true) {
          circles1.filter(function(d) {
            return (d.Category === "Yogurt & Custard")
          }).transition()
            .duration(500)
            .style('fill-opacity', 0)
        } else {
          circles1.filter(function(d) {
            return (d.Category === "Yogurt & Custard")
          }).transition()
            .duration(500)
            .style('fill-opacity', 1)
        }
    })
});


