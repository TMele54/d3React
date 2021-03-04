import * as d3 from 'd3';
import FormatFilter from "./FormatFilter";
import {margin,width,height,x,y,xAxis,yAxis,valueline} from "./ChartDimensions";

const DrawChart = (props) => {
    const NODE = "#DOM_ELEMENT"
    const data = FormatFilter(props.chartData)

    let svg = d3.select(NODE)
                    .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    svg.append("path").attr("class", "line").attr("d", valueline(data));

    svg.selectAll("dot")
        .data(data)
      .enter().append("circle").attr("class", "point")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.close); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

}

export default DrawChart