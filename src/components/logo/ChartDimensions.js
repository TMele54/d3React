import React from 'react';
import * as d3 from 'd3';

// Sizes of the chart
const margin = {top: 50, right: 50, bottom: 50, left: 50}
const width = 1200 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// Export these items to DrawChart and UpdateChart Components
export {margin,width,height}