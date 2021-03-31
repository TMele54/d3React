import * as d3 from 'd3';
//const { d3q } = require("d3-queue");
import * as d3q from 'd3-queue';
import FormatFilter from "./FormatFilter";
import {margin,width,height,ellipses} from "./ChartDimensions";
import {valueline, yAxis} from "../example/ChartDimensions";

const UpdateChart = (props) => {

    const duration = 2000
    const delay = 250
    const effect = ["linear", "quad", "cubic", "sin", "exp", "circle", "elastic", "back", "bounce"]
    const interp = ["linear", "step-before", "step-after", "basis", "basis-open", "basis-closed", "bundle", "cardinal", "cardinal-open", "cardinal-closed", "monotone"]
    const color = d3.scale.ordinal().domain([
                0,1,2,
                3,4,5,
                6,7,8,
                9,10,11
            ]).range([
                "gold", "blue", "green",
                "yellow", "red", "grey",
                "lightgreen", "pink", "brown",
                "slateblue", "grey1", "orange"
            ])

    const NODE = "#DOM_ELEMENT"
    const id = "#center_circle"
    const ids = [
                    {"name": "center_circle"},
                    {"name": "ellipse_0"},
                    {"name": "ellipse_1"},
                    {"name": "ellipse_2"}
                ]

    const svg = d3.select(".svg-component")

    // Transform into 4 equal sized balls overlapped so it it appears to be one ball
    const OneBall = (Z)=> {
        console.log("Start OneBall")

        d3.select(NODE)
                .selectAll("ellipse")
                .transition()
                .duration(duration)
                .attr("rx", 2.5)
                .attr("ry", 2.5)
                .ease(effect[8])

            //.each("end", DistributeBalls);

        console.log("End OneBall")
        return
    };

    // Slide balls into equal spacing
    const DistributeBalls = (Z)=> {
        console.log("Start DistributeBalls")
        ids.forEach((d, index) => {
            d3.select("#" + d.name)
                .transition()
                    .duration(duration / 2)
                    .attr("transform", "")
                    .attr("cx", 68 * (index+1))
                    .attr("cy", height / 2)
                  //  .each("end", JustDance)
        })
        console.log("End DistributeBalls")
    }

    // Make the balls dance
    const JustDance = (Z) => {
        console.log("Start JustDance")

        ids.forEach((d) => {
            d3.select("#"+d.name)
                    .transition()
                        .duration(duration/2)
                        .attr("transform", `translate(0,${+100})`)
                        .ease(effect[6])
                    .transition()
                        .delay(delay/10)
                        .duration(duration/2)
                        .ease("linear")
                        .each("end", JustDanceTwo)

            console.log("End JustDance")
        })

    }

    // Make the balls dance another way
    const JustDanceTwo = (Z) => {
        console.log("Start JustDanceTwo")
                d3.select("#" + ids[0].name)
                    .transition()
                        .duration(duration/3)
                        .attr("transform", `translate(${0},${-100})`)
                        .ease(effect[6])
                    .transition()
                        .duration(duration)
                        .attr("transform", `translate(${0},${+0})`)
                        .ease(effect[8])
                    .each("end", Hoop)
        console.log("End JustDanceTwo")
    }

    // Change ball into ellipse given a radnom color
    const Hoop = (Z) => {
        let C = Math.floor(Math.random() * 11)
        console.log("Start Hoop")
           d3.select("#" + ids[1].name)
                    .transition()
                        .duration(duration)
                        .attr("transform", `translate(${0},${-25})`)
                        .attr("rx", 30)
                        .attr("ry", 75)
                        .attr("stroke", color(C))
                        .ease(effect[6])
                    .each("end", ThroughHoop(C))
        console.log("End Hoop")
    }

    // Throw balls through hoop and update thier color, repeat Hoop and ThroughHoop
    const ThroughHoop = (Z) => {
        console.log("Start ThroughHoop")
         d3.select("#" + ids[0].name)
                    .transition()
                        .duration(duration/2)
                        .attr("transform", `translate(${200},${-85})`)
                        .attr("stroke", color(Z))
                        .attr("fill", color(Z))
                        .ease(effect[7])

          d3.select("#" + ids[2].name)
                   .transition()
                        .duration(duration/2)
                        .attr("transform", `translate(${-150},${0})`)
                   .transition()
                        .duration(duration/2)
                        .attr("transform", `translate(${64},${-25})`)
                        .attr("stroke", color(Z))
                        //.attr("stroke", color(Z))
                        .ease(effect[7])

           d3.select("#" + ids[3].name)
                   .transition()
                        .duration(duration/1.5)
                        .attr("transform", `translate(${-250},${0})`)
                   .transition()
                        .duration(duration/1.5)
                        .attr("transform", `translate(${-4},${35})`)
                        .attr("stroke", color(Z))
                        //.attr("stroke", color(Z))
                        .ease(effect[7])
                //       .each("end", Reset(""))
        console.log("End ThroughHoop")
    }

    // Move balls back to the beginning
    const Reset = (Z) => {
        console.log("Start Reset")
        ids.forEach((d, index) => {
            d3.select("#"+d.name)
                    .transition()
                        .duration(duration/2)
                        .attr("cx", 68 * (index+1))
                        .attr("cy", height / 2)
                        .attr("transform", `translate(0,${0})`)
                        .ease(effect[6])
                .each("end", RoundRound(""))
            console.log("End Reset")
        })

    }

    //Transform back into react logo
    const FinalSteady = (Z) => {

        d3.select("#center_circle")
                .transition()
                .duration(duration / 2)
                .attr("transform", "")
                .attr("cx", height /2)
                .attr("cy", height / 2)

        ellipses.forEach((d, index) => {

            d3.select("#" + d.name)
                .transition()
                .duration(duration / 2)
                .attr("transform", "")
                .attr("cx", d.cx)
                .attr("cy", d.cy)
                .attr("rx", (d,i) => { return d.rx; })
                .attr("ry", (d,i) => { return d.ry; });

        })

        function repeat() {

            d3.select("#center_circle")
                .transition()
                .duration(duration / 2)
                .attr("cx", height/2)
                .attr("cy", height/2)
                .attr("rx", 5)
                .attr("ry", 5).ease(effect[8])
                .transition()
                .duration(duration)
                .attr("rx", 21)
                .attr("ry", 21).ease(effect[8])
                .each("end", repeat)

        }
        repeat()

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

    const RoundRound = (Z) => {
        /*
         function renderOne(innerRadius) {

             let dbl = innerRadius * 2;
             let width = 200
             let viewbox = `0 0 ${dbl} ${dbl}`
             let height = 200
             let colors = d3.scale.category20();

             let svg = d3.select("#DOM_ELEMENT").append("svg")
                 .attr("width", width)
                 .attr('viewBox', viewbox);

             var dataArc = [
                 {startAngle: -1 * Math.PI, endAngle: 1 * Math.PI},
             ];
             var arc = d3.svg.arc().outerRadius(innerRadius+10).innerRadius(innerRadius);
             svg.select("g").remove();
             var path = svg.append("g").selectAll("path.arc").data(dataArc);

             path.enter()
                 .append("path")
                 .attr("transform", `translate(${innerRadius},${innerRadius})`) //625,625
                 .attr("class", "arc")
                 .style("stroke", "rgb(53,154,204))")
                 .style("stroke-width", 5)
                 .style("fill", "white") //"none"
                 .style("opacity", .7)
                 .attr('d', arc)
                 .transition().delay(250).duration(2000).ease("linear")
                 .attrTween("d", function (d) {
                       var start = {startAngle: -1 * Math.PI, endAngle: -1 * Math.PI}
                       var end = d
                       var interpolate = d3.interpolate(start, end);
                       return function (t) {
                           return arc(interpolate(t));
                       };
                   })

             path.enter()
               .append('circle')
                 .attr("transform", `translate(${innerRadius},${innerRadius})`)
                 .attr('r', 20)
                 .attr('fill', 'white')
                 .transition()
                 .delay(250)
                 .duration(2000)
                 .ease("linear")
                 .attrTween("pathTween", function (d) {
                     const startAngle = d.startAngle;
                     const endAngle = d.endAngle;
                     const start = {startAngle, endAngle: startAngle}
                     const end = {startAngle: endAngle, endAngle}
                     const interpolate = d3.interpolate(start, end);
                     const circ = d3.select(this)
                     return function (t) {
                         const cent = arc.centroid(interpolate(t));
                         circ
                           .attr("cx", cent[0]) // Set the cx
                           .attr("cy", cent[1]) // Set the cy
                     };
                 })
             }
         renderOne(750);
         */

        function transition(d) {
             d3.select("#" + d.name).transition().duration(duration).attrTween("transform", translateAlong(path.node()))
                 .each("end", transition);
        }
        function translateAlong(path) {
            var l = path.getTotalLength();
            return function (d, i, a) {
                return function (t) {
                    var p = path.getPointAtLength(t * l);
                    return "translate(" + p.x + "," + p.y + ")";
                };
            };
        }
        var points = [
            [125, 125],
            [125, 225],
            [225, 125],
            [225, 225]
        ];
        var svg = d3.select("._svg-component")
        var path = svg.append("path").data([points]).attr("d", d3.svg.line().tension(0).interpolate(interp[9])).attr("stroke-width", 0)
        //var circle = svg.append("circle").attr("r", 5).attr("stroke", "white").attr("transform", "translate(" + points[0] + ")").attr("fill", "white")

        ellipses.forEach((d, index) => {
            d3.select("#" + d.name).attr("transform", "translate(" + points[index] + ")")
            transition(d)
        })


        svg.selectAll(".point").data(points).enter().append("circle").attr("r", 4).attr("stroke-width", "white").attr("fill", "none").attr("transform", function (d) {return "translate(" + d + ")";});


    }

    // Task Scheduler
    let Q = d3q.queue();

    // Make logo spin and pulse
    Q.defer(OneBall)

        //.defer(DistributeBalls)



        .await((error)=>{if (error) throw error;console.log("Queue Tasks Completed");})

}

export default UpdateChart