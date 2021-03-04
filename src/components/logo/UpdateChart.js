import * as d3 from 'd3';
import FormatFilter from "./FormatFilter";
import {margin,width,height,ellipses} from "./ChartDimensions";

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
    const duration = 5

    // Delay is time waited before beginning transition (milliseconds)
    const delay = 0

    // The HTML element that we use as a foundation to draw (used here to access what was already drawn)
    const NODE = "#DOM_ELEMENT"

    d3.selectAll("ellipse")
        .append("animateTransform")
        .attr("attributeName","transform")
        .attr("attributeType","XML")
        .attr("type","rotate")
        .attr("from", (d) => {
            return d.theta+ " " + (height / 2).toString() + " " + (height / 2).toString()
        })
        .attr("to", (d) => {
            return 360+d.theta+ " " + (height / 2).toString() + " " + (height / 2).toString()
        })
        .attr("dur", (d) => {return d.rate.toString()+"s"})
        .attr("repeatCount","indefinite")

}

export default UpdateChart