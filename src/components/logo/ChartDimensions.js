import React from 'react';
import * as d3 from 'd3';

// Sizes of the chart
const margin = {top: 10, right: 10, bottom: 10, left: 10}
const width = 370 - margin.left - margin.right;
const height = 370 - margin.top - margin.bottom;
const ellipses = [
    {"theta": 0,   "rate": 0, "name": "center_circle", "fill": "#61b3fb", "stroke": "#61b3fb", "cx":  height/2, "cy":  height/2, "rx": 21, "ry": 21},
    {"theta": 0,   "rate": 5, "name": "ellipse_0",     "fill": "none",    "stroke": "#61b3fb", "cx":  height/2, "cy":  height/2, "rx": 50, "ry": 150},
    {"theta": 120, "rate": 5, "name": "ellipse_1",     "fill": "none",    "stroke": "#61b3fb", "cx":  height/2, "cy":  height/2, "rx": 50, "ry": 150},
    {"theta": 240, "rate": 5, "name": "ellipse_2",     "fill": "none",    "stroke": "#61b3fb", "cx":  height/2, "cy":  height/2, "rx": 50, "ry": 150}
];

// Export these items to DrawChart and UpdateChart Components
export {margin,width,height,ellipses}