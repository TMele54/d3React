import * as d3 from 'd3';
//const { d3q } = require("d3-queue");
import * as d3q from 'd3-queue';
import FormatFilter from "./FormatFilter";
import {margin,width,height,ellipses} from "./ChartDimensions";
import {valueline, yAxis} from "../example/ChartDimensions";

const UpdateChart = (props) => {

    const duration = 2000
    const delay = 2500
    const effect = ["linear", "quad", "cubic", "sin", "exp", "circle", "elastic", "back", "bounce"]
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
    const line = d3.svg.diagonal().radial();
    const lineData = {source:{x:25, y:25},target:{x:25, y:25}};
    const path = svg.append("path").attr("d", line(lineData)).style("stroke",  "white").style("fill", "none");

    function pathTween(path){
        var length = path.node().getTotalLength();
        var r = d3.interpolate(0, length);
        return function(t){
            var point = path.node().getPointAtLength(r(t));
            d3.select(this).attr("cx", point.x).attr("cy", point.y);
        }
    }

    // Transform into 4 equal sized balls overlapped so it it appears to be one ball
    const OneBall = (Z)=> {
        console.log("Start OneBall")

        d3.select(NODE)
                .selectAll("ellipse")
                .transition()
                .duration(duration)
                .attr("rx", 2.5)
                .attr("ry", 2.5)
                .ease(effect[8]).each("end", DistributeBalls);

        console.log("End OneBall")
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
                    .each("end", JustDance)
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
                        .delay(250)
                        .duration(1000)
                        .ease("linear")
                        .tween("pathTween", function(){return pathTween(path)})// .tween("pathTween", pathTween); //Custom tween to set the cx and cy attributes

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

                   .each("end", OneBall)
        console.log("End ThroughHoop")
    }

    //Transform back into react logo



    /*
	function repeat() {
        d3.select("#center_circle")
            .transition()
            .duration(duration/2)
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
        .filter((d) => { return d.name !== "center_circle"; })
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
    */

    /*
        Decided to use chained tranitions and not queue movements, saving code for another attempt
    */
        // Task Scheduler
        let Q = d3q.queue();
        // Make logo spin and pulse
         Q.defer(OneBall).await((error)=>{if (error) throw error;console.log("Queue Tasks Completed");})

}

export default UpdateChart