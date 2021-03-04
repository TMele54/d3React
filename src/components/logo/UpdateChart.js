import * as d3 from 'd3';
import FormatFilter from "./FormatFilter";
import {margin,width,height,x,y,xAxis,yAxis,valueline} from "./ChartDimensions";

const UpdateChart = (props) => {
    const duration = 2000
    const delay = 500
    const NODE = "#DOM_ELEMENT"
    const data = FormatFilter(props.chartData, [])

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    d3.select(NODE).transition().delay(delay).select(".line").duration(duration).attr("d", valueline(data));
    d3.select(NODE).transition().delay(delay).select(".x.axis").duration(duration).call(xAxis);
    d3.select(NODE).transition().delay(delay).select(".y.axis").duration(duration).call(yAxis);

    // data-join
    var dot = d3.select(NODE).selectAll("circle").data(data);

    // udpate
    dot.transition().duration(duration).delay(delay)
        .attr("class", "point").attr("r", 3.5)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.close); });

    dot.exit().remove();

}

export default UpdateChart