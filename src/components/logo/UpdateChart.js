import * as d3 from 'd3';
import FormatFilter from "./FormatFilter";
import {margin,width,height} from "./ChartDimensions";

/*

This is the second drawing component, it is used to update the chart with new or filtered data.

Importing:
    D3, Version 3.
    A FormatFilter Component which is used to take data and prepare it for visualization
    Shared elements in ChartDimensions (needed for updating a visual)

Chart Dimensions shared by DrawChart and UpdateChart are used here to update data points in the chart

*/

const UpdateChart = (props) => {
    // Duration is the time it takes to show the update happening (milliseconds)
    const duration = 2000

    // Delay is time waited before beginning transition (milliseconds)
    const delay = 500

    // The HTML element that we use as a foundation to draw (used here to access what was already drawn)
    const NODE = "#DOM_ELEMENT"
    /*
    // Format and Filter data
    const data = FormatFilter(props.chartData)

    // Update the Domains of the x and y axis
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Select drawn elements (within the svg) by their class, and redrawn them with new values
    d3.select(NODE).transition().delay(delay).select(".line").duration(duration).attr("d", valueline(data));
    d3.select(NODE).transition().delay(delay).select(".x.axis").duration(duration).call(xAxis);
    d3.select(NODE).transition().delay(delay).select(".y.axis").duration(duration).call(yAxis);

    // Add new data points to the g element within the svg node
    d3.select("#datapoints").selectAll("dot").data(data)
        .enter().append("circle").attr("class", "point")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.close); });

    // data-join, select the svg space and all circles (data points) and apply new data
    var dot = d3.select(NODE).selectAll("circle").data(data);

    // Update the data points by applying a timed transition from initial position to a new position
    dot.transition().duration(duration).delay(delay)
        .attr("class", "point").attr("r", 3.5)   .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.close); });

    // Remove elements that are no longer being used
    dot.exit().remove();


        In the past two comments we took initial data and joined it to new creating a superset.
        The data then says has more values then are in the newer dataset, so some circles arent used so we must remove them.
        Probably need a line in the event there are more data point instead of less.
    */

}

export default UpdateChart