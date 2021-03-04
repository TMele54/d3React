import * as d3 from 'd3';
import FormatFilter from "./FormatFilter";
import {margin,width,height} from "./ChartDimensions";

const DrawChart = (props) => {
    // The HTML element that we use as a foundation to draw
    const NODE = "#DOM_ELEMENT"

    // Calling the FormatFilter to prep data for visualization
    // const data = FormatFilter(props.chartData)

    const svgContainer = d3.select(NODE)
                                .append("svg")
                                    .attr("width",width)
                                    .attr("height",height)
                                  .append("g")
                                    .attr("id", "react_logo")
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const ellipses = [
  		{"name": "center_circle", "fill": "#61dbfb", "cx":  height/2, "cy":  height/2, "rx": 50, "ry": 50},
  		{"name": "ellipse_0", "fill": "none", "cx":  height/2, "cy":  height/2, "rx": height/2, "ry": height/4}
		];

    const svgEllipses = svgContainer
                    .selectAll("ellipse")
                    .data(ellipses)
                    .enter()
                    .append("ellipse")
                    .attr("stroke", "#61dbfb")
                    .attr("stroke-width", 20)
                    .attr("fill", (d) => {return d.fill})

    svgEllipses
    	.attr("cx", (d,i) => { return d.cx; })
    	.attr("cy", (d,i) => { return d.cy; })
    	.attr("rx", (d,i) => { return d.rx; })
    	.attr("ry", (d,i) => { return d.ry; });

    svgEllipses
        .append("animateTransform")
        .attr("attributeName","transform")
        .attr("attributeType","XML")
        .attr("type","rotate")
        .attr("from","0 "+(height/2 + margin.left).toString()+" "+(height/2 + margin.left).toString())
        .attr("to","360 "+(height/2 + margin.left).toString()+" "+(height/2 + margin.left).toString())
        .attr("dur","10s")
        .attr("repeatCount","indefinite")

    svgEllipses.filter(':first-child');
}

export default DrawChart