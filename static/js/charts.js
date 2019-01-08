

queue()
    .defer(d3.json, "static/data/EnergyBalance2017.json")
    .await(makeGraphs);

function makeGraphs(error, energyData) {
    var ndx = crossfilter(energyData);

    show_consumptionByConsumer_rowchart(ndx);
    show_consumptionByConsumer_piechart(ndx);
    show_fuelType_pie(ndx);
    show_consumptionByFuelType_barchart(ndx);
    dc.renderAll();
}


// Energy Consumption (ktoe) per consumer
function show_consumptionByConsumer_rowchart(ndx) {
    var consumer_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.subgroup; });
    var all = consumer_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perConsumer = consumer_dim.group().reduceSum(function (d) { if (d.group === 'FinalEnergyConsumption') return d.value; });
    dc.rowChart("#consumptionByConsumer_rowchart")
        .height(300)
        .width(300)
        .margins({ top: 20, left: 10, right: 10, bottom: 20 })
        .transitionDuration(750)
        .dimension(consumer_dim)
        .group(total_perConsumer)
        .renderLabel(true)
        .labelOffsetY(22)
        .gap(9)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .elasticX(true)
        .xAxis().tickFormat(d3.format("s"));;
}

function show_consumptionByConsumer_piechart(ndx) {
    var consumerSub_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.record; });
    var all = consumerSub_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perConsumerSub = consumerSub_dim.group().reduceSum(dc.pluck('value'));
    dc.pieChart("#consumptionByConsumerSub_piechart")
        .height(200)
        .transitionDuration(750)
        .radius(50)
        .innerRadius(30)
        .dimension(consumerSub_dim)
        .group(total_perConsumerSub)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .renderLabel(false);
}

// Energy Consumption (ktoe) per fuel, stack consumer bar chart
function show_consumptionByFuelType_barchart(ndx) {

    var g;
    var fuelType_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.fuelType; });
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perFuelType = fuelType_dim.group().reduceSum(function (d) { if (d.group === 'FinalEnergyConsumption') return d.value; });
    consumptionByFuelType_barchart = dc.barChart("#consumptionByFuelType_barchart")
    consumptionByFuelType_barchart
        .width(400)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 100, left: 50 })
        .dimension(fuelType_dim)
        .group(total_perFuelType)
        .centerBar(true)
        .brushOn(false)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .gap(1)
        .elasticY(true)
        .colors(['steelblue'])
        .transitionDuration(750)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .renderHorizontalGridLines(true)
        .y(d3.scale.linear().domain([0, 5500000]))
        .yAxis().tickFormat(d3.format("s"));


}



function show_fuelType_pie(ndx) {
    // var fuelType_dim = ndx.dimension(dc.pluck('fuelType'))
    var fuelType_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.fuelType; });
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perFuelType = fuelType_dim.group().reduceSum(dc.pluck('value'));

    // var total_perFuelType = fuelType_dim.group().reduceSum(function (d) { if (d.group === 'FinalEnergyConsumption') return d.value; });
    dc.pieChart('#fuelType_pie')
        .dimension(fuelType_dim)
        .group(total_perFuelType)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        });
}


