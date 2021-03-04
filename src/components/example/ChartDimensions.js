import React from 'react';
import * as d3 from 'd3';


/*

This is the dimensions component.

Importing:
    D3, Version 3.
    React

This is where we set the dimensions like Height and Width.
Also provides a place for callbacks that are used in multiple components.

*/


const margin = {top: 30, right: 20, bottom: 30, left: 50}
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;

let x = d3.time.scale().range([0, width]);
let y = d3.scale.linear().range([height, 0]);

let xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
let yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

let valueline = d3.svg.line().x(function(d) { return x(d.date); }).y(function(d) { return y(d.close); });

export {margin,width,height,x,y,xAxis,yAxis,valueline}