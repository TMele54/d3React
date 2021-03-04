import React from "react";
import DrawChart from "./DrawChart"
import UpdateChart from "./UpdateChart";

/*

This is the main drawing component.

Importing:
    React
    DrawChart
    UpdateChart

Here we pull in data, draw charts and redraw charts.
This is where D3 meets the React world big picture wise.

*/

class Animation extends React.Component {

    constructor(props) {
        super(props);
        this.ReDraw = this.ReDraw.bind(this)
    }

    async componentDidMount() {
        // First draw is based on json data, subsequent redraws are generated at random
        await fetch('data/data.json').then(response => response.json()).then(data => {
            DrawChart({chartData: data})
        });
    }

    ReDraw = () => {
        // The following makes random data and then redraws
        const getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
        const daylist = getDaysArray(new Date("2020-01-01"),new Date("2020-"+(Math.floor(Math.random() * 12) + 2).toString()+"-01"));
        function formatDate(date) {
            if (date !== undefined && date !== "") {
              let myDate = new Date(date);
              let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",][myDate.getMonth()];
              let day = myDate.getDate();
              let yr = myDate.getFullYear().toString().substr(-2);

              return day + "-" + month + "-" + yr;
            }
            return "";
        }
        const randomBetween = (a, b) => {
           return ((Math.random() * (b - a)) + a).toFixed(2);
        };

        let my_data = Array()
        daylist.forEach(function(d){
            let item = {}
            item.date = formatDate(d)
            item.close = parseFloat(randomBetween(1,100))
            my_data.push(item)
        })

        UpdateChart({chartData: my_data})
    }

    render() {
        return(

            <React.Fragment>
                <div id="DOM_ELEMENT" />
                <button onClick={this.ReDraw} style={{height: "50px", width: "100px"}}>Redraw!</button>
            </React.Fragment>

            )
    }

}

export default Animation;