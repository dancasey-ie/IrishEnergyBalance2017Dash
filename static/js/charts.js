queue()
    .defer(d3.json, "static/data/EnergyBalance2017.json")
    .await(makeGraphs);



function makeGraphs(error, energyData) {
    var ndx = crossfilter(energyData);
    show_consumptionByConsumer_barchart(ndx);
    dc.renderAll();
}

// Energy Consumption (ktoe) per consumer, bar chart
function show_consumptionByConsumer_barchart(ndx) {
    var consumer_dim = ndx.dimension(dc.pluck('group'))
    var total_perConsumer = consumer_dim.group().reduceSum(dc.pluck('value'));
    dc.barChart("#consumptionByConsumer_barchart")
        .width(600)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(consumer_dim)
        .group(total_perConsumer)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Consumer")
        .yAxis().ticks(4);
}


