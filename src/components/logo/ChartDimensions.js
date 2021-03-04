import React from 'react';
import * as d3 from 'd3';

// Sizes of the chart
const margin = {top: 50, right: 50, bottom: 50, left: 50}
const width = 1200 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;
const ellipses = [
    {"theta": 0, "rate": 0, "name": "center_circle", "fill": "#61b3fb", "stroke": "#1221ac", "cx":  height/2, "cy":  height/2, "rx": 100, "ry": 100},
    {"theta": 0, "rate": 5, "name": "ellipse_0", "fill": "none", "stroke": "#f161fb", "cx":  height/2, "cy":  height/2, "rx": height/2, "ry": height/4},
    {"theta": 120, "rate": 5, "name": "ellipse_1", "fill": "none", "stroke": "#ab45b1", "cx":  height/2, "cy":  height/2, "rx": height/2, "ry": height/4},
    {"theta": 240, "rate": 5, "name": "ellipse_2", "fill": "none", "stroke": "#702f75", "cx":  height/2, "cy":  height/2, "rx": height/2, "ry": height/4},
];

// Export these items to DrawChart and UpdateChart Components
export {margin,width,height,ellipses}