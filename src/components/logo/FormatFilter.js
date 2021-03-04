import * as d3 from "d3";

const FormatFilter = (data, options) => {
    let parseDate = d3.time.format("%d-%b-%y").parse;

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    return data

}

export default FormatFilter