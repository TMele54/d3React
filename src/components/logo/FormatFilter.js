import * as d3 from "d3";

/*

This is the Formatting and Filtering Function.

Importing:
    D3, Version 3.

This is used to transform data.

*/

const FormatFilter = (data) => {
    // Applies format to dates
    let parseDate = d3.time.format("%d-%b-%y").parse;

    // Loop over objects in the data array and change date formats, and make numbers into digits no strings
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Returns data to Component
    return data

}

export default FormatFilter