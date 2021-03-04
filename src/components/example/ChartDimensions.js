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

// Sizes of the chart
const margin = {top: 30, right: 20, bottom: 30, left: 50}
const width = 800 - margin.left - margin.right;
const height = 550 - margin.top - margin.bottom;

// Scales for the axis
let x = d3.time.scale().range([0, width]);
let y = d3.scale.linear().range([height, 0]);

// Actual Axis
let xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
let yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

// Callback to draw a line between points
let valueline = d3.svg.line().x(function(d) { return x(d.date); }).y(function(d) { return y(d.close); });

// Export these items to DrawChart and UpdateChart Components
export {margin,width,height,x,y,xAxis,yAxis,valueline}