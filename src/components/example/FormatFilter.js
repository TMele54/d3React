import * as d3 from "d3";


/*

This is the Formatting and Filtering Function.

Importing:
    D3, Version 3.

This is used to transform data.

*/


const FormatFilter = (data) => {
    let parseDate = d3.time.format("%d-%b-%y").parse;

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    return data

}
export default FormatFilter