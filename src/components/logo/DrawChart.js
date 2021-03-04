import * as d3 from 'd3';
import FormatFilter from "./FormatFilter";
import {margin,width,height,x,y,xAxis,yAxis,valueline} from "./ChartDimensions";

/*

This is the main drawing component.

Importing:
    D3, Version 3.
    A FormatFilter Component which is used to take data and prepare it for visualization
    Shared elements in ChartDimensions (needed for updating a visual)

This is simply where we draw shapes composed by data.

*/

const DrawChart = (props) => {
    // The HTML element that we use as a foundation to draw
    const NODE = "#DOM_ELEMENT"

    // Calling the FormatFilter to prep data for visualization
    const data = FormatFilter(props.chartData)

    // Draw and SVG space onto the HTML node and give it sizes from ChartDimensions
    let svg = d3.select(NODE)
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("id", "datapoints")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define the Domain of the x and y axis
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Draw the smooth line between data points using the valueline callback
    svg.append("path").attr("class", "line").attr("d", valueline(data));

    // Draw circles as data points
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle").attr("class", "point")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.close); });

    // Draw x axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Draw y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

}

export default DrawChart