import * as d3 from 'd3';
import FormatFilter from "./FormatFilter";
import {margin,width,height,ellipses} from "./ChartDimensions";

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
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    const svgEllipses = svgContainer
                    .selectAll("ellipse")
                    .data(ellipses)
                    .enter()
                    .append("ellipse")
                    .attr("stroke", (d) => {return d.stroke})
                    .attr("stroke-width", 30)
                    .attr("fill", (d) => {return d.fill})
                    .attr("transform", (d) => {return "rotate("+d.theta+" "+d.cx+" "+d.cy+")"})

    	.attr("cx", (d,i) => { return d.cx; })
    	.attr("cy", (d,i) => { return d.cy; })
    	.attr("rx", (d,i) => { return d.rx; })
    	.attr("ry", (d,i) => { return d.ry; });


    svgEllipses.filter(':first-child');
}

export default DrawChart