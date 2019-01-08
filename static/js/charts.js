queue()
    .defer(d3.json, "static/data/EnergyBalance2017.json")
    .await(makeGraphs);

function makeGraphs(error, energyData) {
    var ndx = crossfilter(energyData);

    show_consumptionByConsumer_rowchart(ndx);
    show_fuelType_pie(ndx);
    show_consumptionByFuelType_barchart(ndx);
    dc.renderAll();
}


// Energy Consumption (ktoe) per consumer
function show_consumptionByConsumer_rowchart(ndx) {
    var consumer_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.subgroup; });
    var all = consumer_dim.groupAll().reduceSum(function (d) { if (d.group === 'FinalEnergyConsumption') return d.value; });
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
        .xAxis().ticks(5).tickFormat(d3.format("s"));
}

// Energy Consumption (ktoe) per fuel, stack consumer bar chart
function show_consumptionByFuelType_barchart(ndx) {


    var fuelType_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.fuelType; });
    var total_perFuelType= fuelType_dim.group().reduceSum(function (d) { if (d.group === 'FinalEnergyConsumption') return d.value; });
    dc.barChart("#consumptionByFuelType_barchart")
        .width(400)
        .height(200)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(fuelType_dim)
        .group(total_perFuelType)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxis().ticks(4);
}

// Energy Consumption (ktoe) per fuel, stack consumer bar chart
function show_consumptionByFuelType_stackedBarchart(ndx) {


    var fuelType_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.fuelType; });
    var total_perFuelType = fuelType_dim.group().reduceSum(function (d) { if (d.group === 'FinalEnergyConsumption' ) return d.value; });
    dc.barChart("#consumptionByFuelType_barchart")
        .width(600)
        .height(400)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(fuelType_dim)
        .group(total_perFuelType)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxis().ticks(4);
}

function show_fuelType_pie(ndx) {
    // var fuelType_dim = ndx.dimension(dc.pluck('fuelType'))
    var fuelType_dim = ndx.dimension(function (d) { if (d.group === 'FinalEnergyConsumption') return d.fuelType; });
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perFuelType = fuelType_dim.group().reduceSum(dc.pluck('value'));

    // var total_perFuelType = fuelType_dim.group().reduceSum(function (d) { if (d.group === 'FinalEnergyConsumption') return d.value; });
    console.log(total_perFuelType)
    dc.pieChart('#fuelType_pie')
        .dimension(fuelType_dim)
        .group(total_perFuelType)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        });
}

