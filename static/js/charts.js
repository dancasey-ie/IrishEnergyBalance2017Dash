

queue()
  .defer(d3.json, "static/data/EnergyBalance2017FinalEnergyConsumption.json")
  .await(makeGraphsFinalEnergyConsumption);

queue()
  .defer(d3.json, "static/data/EnergyBalance2017PrimaryEnergyReq.json")
   .await(makeGraphsPrimaryEnergyReq);

queue()
  .defer(d3.json, "static/data/EnergyBalance2017Transformation.json")
  .await(makeGraphsTransformation);

var oilColor = '#46a09a'
var elecColor = '#0560a7'
var natgasColor = '#007a45'
var renewColor = '#bebd01'
var coalColor = '#ffb736'
var peatColor = '#ec571b'
var nonRWColor = '#c70063'
var colorsList = [oilColor, elecColor, natgasColor, renewColor, coalColor, peatColor, nonRWColor]


function makeGraphsFinalEnergyConsumption(error, energyData) {
    var ndx = crossfilter(energyData);

    show_consumptionByFuelType_rowchart(ndx);
    show_consumptionByConsumer_barchart(ndx);

    show_consumptionByConsumer_piechart(ndx);
    show_consumptionFuel_piechart(ndx);

    show_consumptionFuel_sunburstchart_inner(ndx);
    show_consumptionFuel_sunburstchart_outer(ndx);

    //show_consumptionByConsumer_rowchart(ndx);
    //show_consumptionByFuelType_barchart(ndx);

    dc.renderAll();
}

function makeGraphsPrimaryEnergyReq(error, energyData) {
    var ndx = crossfilter(energyData);

    show_supplyBySource_barchart(ndx);
    show_supplyFuel_piechart(ndx);
    dc.renderAll();
}

function makeGraphsTransformation(error, energyData) {
    var ndx = crossfilter(energyData);
    show_transformationInput_rowchart(ndx);
    show_transformationOutput_rowchart(ndx);
    show_transforationInput_barchart(ndx);
    show_transforationOutput_barchart(ndx);
    dc.renderAll();
}
//                                                                    Final Consumption Charts
// Energy Consumption (ktoe) per fuel
function show_consumptionByFuelType_rowchart(ndx) {
    var fuelType_dim = ndx.dimension(dc.pluck('fuelType'));
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var fuelType_group = fuelType_dim.group().reduceSum(dc.pluck('value'));
    dc.rowChart("#consumptionByFuelType_rowchart")
        .height(400)
        .margins({ top: 0, left: 10, right: 0, bottom: 100 })
        .transitionDuration(750)
        .dimension(fuelType_dim)
        .group(fuelType_group)
        .renderLabel(true)
        .labelOffsetY(-10)
        .labelOffsetX(0)
        .gap(20)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .elasticX(true)
        .ordinalColors(colorsList)
        .xAxis().ticks(4).tickFormat(d3.format("s"));;
}

// Energy Consumption by consumer, stacked fuel type
function show_consumptionByConsumer_barchart(ndx) {

    var consumer_dim = ndx.dimension(dc.pluck('subgroup'));
    var all = consumer_dim.groupAll().reduceSum(dc.pluck('value'));

    var consumers = ["Transport", "Residential", "Industry", "Services", "Agricultural & Fisheries"]

    var coal_group = consumer_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Coal') {
            return +d.value;
        } else {
            return 0;
        }
    });
    var elec_group = consumer_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Electricity') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var natgas_group = consumer_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Nat.Gas') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var nRWaste_group = consumer_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Non-Re.Waste') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var oil_group = consumer_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Oil') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var peat_group = consumer_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Peat') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var renew_group = consumer_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Renewables') {
            return +d.value;
        } else {
            return 0;
        }
    });

    consumptionByConsumer_barchart = dc.barChart("#consumptionByConsumer_barchart")
    consumptionByConsumer_barchart
        .height(380)
        .margins({ top: 10, right: 50, bottom: 80, left: 50 })
        .dimension(consumer_dim)
        .group(oil_group, 'Oil')
        .stack(elec_group, 'Electricity')
        .stack(natgas_group, 'Nat.Gas')
        .stack(renew_group, 'Renewables')
        .stack(coal_group, 'Coal')
        .stack(peat_group, 'Peat')
        .stack(nRWaste_group, 'non-Ren.Waste')

        .centerBar(true)
        .brushOn(false)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .gap(1)
        .elasticY(true)
        .transitionDuration(750)
        .x(d3.scale.ordinal().domain(consumers))
        .xUnits(dc.units.ordinal)
        .gap(10)
        .barPadding(0.4)
        .outerPadding(0.5)
        .renderHorizontalGridLines(true)
        .y(d3.scale.linear().domain([0, 5500000]))
        .ordinalColors(colorsList)
        .yAxis().ticks(4).tickFormat(d3.format("s"));

    consumptionByConsumer_barchart.selectAll(".x.axis text")
        .call(wrap, 200);
}



function show_consumptionByConsumer_piechart(ndx) {
    var consumerSub_dim = ndx.dimension(dc.pluck('record'));
    var all = consumerSub_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perConsumerSub = consumerSub_dim.group().reduceSum(dc.pluck('value'));
    dc.pieChart("#consumptionByConsumerSub_piechart")
        .height(100)
        .width(100)
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



function show_consumptionFuel_piechart(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck('fuel'));
    var all = fuel_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perFuel = fuel_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#consumptionByFuel_piechart")
        .height(100)
        .width(100)
        .transitionDuration(750)
        .radius(50)
        .innerRadius(30)
        .dimension(fuel_dim)
        .group(total_perFuel)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors(colorsList)
        .renderLabel(false);
}

function show_consumptionFuel_sunburstchart_inner(ndx) {
    var fuelType_dim = ndx.dimension(dc.pluck('fuelType'));
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var fuelType_group = fuelType_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#consumptionByFuel_sunburstchart_inner")
        .transitionDuration(750)
        .dimension(fuelType_dim)
        .group(fuelType_group)
        .radius(50)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors(colorsList)
        .renderLabel(true);

}

function show_consumptionFuel_sunburstchart_outer(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck('fuel'));
    var all = fuel_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perFuel = fuel_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#consumptionByFuel_sunburstchart_outer")
        .transitionDuration(750)
        .dimension(fuel_dim)
        .group(total_perFuel)
        .radius(100)
        .innerRadius(60)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors(colorsList)
        .renderLabel(true);
}

//                                                                    Primary Requirement Charts
// Energy Supply (ktoe) per source, bar chart
function show_supplyBySource_barchart(ndx) {

    var source_dim = ndx.dimension(dc.pluck('record'));
    var all = source_dim.groupAll().reduceSum(dc.pluck('value'));

    var coal_group = source_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Coal') {
            return +d.value;
        } else {
            return 0;
        }
    });
    var elec_group = source_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Electricity') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var natgas_group = source_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Nat.Gas') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var nRWaste_group = source_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Non-Re.Waste') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var oil_group = source_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Oil') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var peat_group = source_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Peat') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var renew_group = source_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Renewables') {
            return +d.value;
        } else {
            return 0;
        }
    });

    consumptionByFuelType_barchart = dc.barChart("#supplyBySource_barchart")
    consumptionByFuelType_barchart
        .width(300)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 100, left: 40 })
        .dimension(source_dim)
        .group(oil_group, 'Oil')
        .stack(elec_group, 'Electricity')
        .stack(natgas_group, 'Nat.Gas')
        .stack(renew_group, 'Renewables')
        .stack(coal_group, 'Coal')
        .stack(peat_group, 'Peat')
        .stack(nRWaste_group, 'non-Ren.Waste')

        .centerBar(true)
        .brushOn(false)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .gap(1)
        .elasticY(true)
        .transitionDuration(750)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .gap(10)
        .barPadding(0.4)
        .outerPadding(0.5)
        .renderHorizontalGridLines(true)
        .y(d3.scale.linear().domain([0, 5500000]))
        .ordinalColors(colorsList)
        .yAxis().ticks(4).tickFormat(d3.format("s"));
}


function show_supplyFuel_piechart(ndx) {
    var fuelTypes = ["Oil", "Electricity", "Nat.Gas", "Renewables", "Coal", "Peat", "Non-Re.Waste"]
    var fuelType_dim = ndx.dimension(dc.pluck('fuelType'));
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var fuelType_group = fuelType_dim.group().reduceSum(dc.pluck('value'));
    dc.pieChart("#supplyByFuel_piechart")
        .height(100)
        .width(100)
        .transitionDuration(750)
        .radius(50)
        .innerRadius(30)
        .dimension(fuelType_dim)
        .group(fuelType_group)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .renderLabel(false);
}


//                                                                    Transformation Charts
// Energy transformation inputs
function show_transformationInput_rowchart(ndx) {

    var tranIn_dim = ndx.dimension(function (d) {
        if (d.group === 'TransformationInput')
            return d.record;
    });

    var all = tranIn_dim.groupAll().reduceSum(dc.pluck('value'));
    var tranIn_total = tranIn_dim.group().reduceSum(function (d) {
        if (d.group === 'TransformationInput') {
            return +d.value * -1;
        } else {
            return 0;
        }
    });

    dc.rowChart("#transformationInput_rowchart")
        .height(200)
        .width(200)
        .margins({ top: 20, left: 0, right: 0, bottom: 20 })
        .transitionDuration(750)
        .dimension(tranIn_dim)
        .group(tranIn_total)
        .renderLabel(true)
        .gap(20)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';})
        .elasticX(false)
        .xAxis().ticks(4).tickFormat(d3.format("s"));
}

// Energy transformation Outputs
function show_transformationOutput_rowchart(ndx) {

    var tranOut_dim = ndx.dimension(function (d) {
        if (d.group === 'TransformationOutput')
            return d.record;
    });
    var all = tranOut_dim.groupAll().reduceSum(dc.pluck('value'));
    var tranOut_total = tranOut_dim.group().reduceSum(function (d) {
        if (d.group === 'TransformationOutput') {
            return +d.value;
    } else {
            return 0;
        }
    });

    var names = ["Public Thermal Power Plants", "Oil Refineries & other energy sector", "Combined Heat and Power Plants", "Briquetting Plants", "Pumped Storage"]


    dc.rowChart("#transformationOutput_rowchart")
        .height(200)
        .width(200)
        .margins({ top: 0, left: 0, right: 0, bottom: 0 })
        .transitionDuration(750)
        .dimension(tranOut_dim)
        .group(tranOut_total)
        .renderLabel(true)
        .gap(20)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .elasticX(true)
        .x(d3.scale.ordinal().domain(names))
        .xAxis().ticks(4).tickFormat(d3.format("s"));

}

// transformationInput_barchart, stacked fuel type
function show_transforationInput_barchart(ndx) {

    var tranIn_dim = ndx.dimension(function (d) {
        if (d.group === 'TransformationInput')
            return d.record;
    });
    var all = tranIn_dim.groupAll().reduceSum(dc.pluck('value'));

    var coal_group = tranIn_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Coal') {
            return +d.value;
        } else {
            return 0;
        }
    });
    var elec_group = tranIn_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Electricity') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var natgas_group = tranIn_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Nat.Gas') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var nRWaste_group = tranIn_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Non-Re.Waste') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var oil_group = tranIn_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Oil') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var peat_group = tranIn_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Peat') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var renew_group = tranIn_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Renewables') {
            return +d.value;
        } else {
            return 0;
        }
    });
    var dimensions = ["Briquetting Plants", "Pumped Storage", "Combined Heat and Power Plants", "Oil Refineries & other energy sector", "Public Thermal Power Plants"]



    transformationInput_barchart = dc.barChart("#transformationInput_barchart")
    transformationInput_barchart
        .width(300)
        .height(200)
        .margins({ top: 0, right: 0, bottom: 0, left: 20 })
        .dimension(tranIn_dim)
        .group(oil_group, 'Oil')
        .stack(elec_group, 'Electricity')
        .stack(natgas_group, 'Nat.Gas')
        .stack(renew_group, 'Renewables')
        .stack(coal_group, 'Coal')
        .stack(peat_group, 'Peat')
        .stack(nRWaste_group, 'non-Ren.Waste')

        .centerBar(true)
        .brushOn(false)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .elasticY(true)
        .transitionDuration(750)
        .x(d3.scale.ordinal().domain(dimensions))
        .xUnits(dc.units.ordinal)
        .gap(10)
        .barPadding(0.4)
        .outerPadding(0.5)
        .ordinalColors(colorsList)
        .y(d3.scale.linear().domain([0, 5500000]))

        .yAxis().ticks(4).tickFormat(d3.format("s"));
}

// transformationOutput_barchart, stacked fuel type
function show_transforationOutput_barchart(ndx) {

    var tranOut_dim = ndx.dimension(function (d) {
        if (d.group === 'TransformationOutput')
            return d.record;
    });
    var all = tranOut_dim.groupAll().reduceSum(dc.pluck('value'));

    var coal_group = tranOut_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Coal') {
            return +d.value;
        } else {
            return 0;
        }
    });
    var elec_group = tranOut_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Electricity') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var natgas_group = tranOut_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Nat.Gas') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var nRWaste_group = tranOut_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Non-Re.Waste') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var oil_group = tranOut_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Oil') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var peat_group = tranOut_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Peat') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var renew_group = tranOut_dim.group().reduceSum(function (d) {
        if (d.fuelType === 'Renewables') {
            return +d.value;
        } else {
            return 0;
        }
    });
    var dimensions = ["Public Thermal Power Plants", "Oil Refineries & other energy sector", "Combined Heat and Power Plants", "Pumped Storage", "Briquetting Plants"]


    transformationOutput_barchart = dc.barChart("#transformationOutput_barchart")
    transformationOutput_barchart
        .width(310)
        .height(200)
        .margins({ top: 0, right: -10, bottom: 0, left: 35 })
        .dimension(tranOut_dim)
        .group(oil_group, 'Oil')
        .stack(elec_group, 'Electricity')
        .stack(natgas_group, 'Nat.Gas')
        .stack(renew_group, 'Renewables')
        .stack(coal_group, 'Coal')
        .stack(peat_group, 'Peat')
        .stack(nRWaste_group, 'non-Ren.Waste')


        .centerBar(true)
        .brushOn(false)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .elasticY(true)
        .transitionDuration(750)
        .x(d3.scale.ordinal().domain(dimensions))
        .xUnits(dc.units.ordinal)
        .gap(10)
        .barPadding(0.4)
        .outerPadding(0.5)
        .ordinalColors(colorsList)
        .y(d3.scale.linear().domain([0, 5500000]))

        .yAxis().ticks(4).tickFormat(d3.format("s"));
}




























//                                                                                  TO BE REMOVED
// Energy Consumption (ktoe) per consumer
function show_consumptionByConsumer_rowchart(ndx) {
    var consumer_dim = ndx.dimension(dc.pluck('subgroup'));
    var all = consumer_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perConsumer = consumer_dim.group().reduceSum(dc.pluck('value'));
    dc.rowChart("#consumptionByConsumer_rowchart")
        .height(400)
        .margins({ top: 0, left: 10, right: 0, bottom: 100 })
        .transitionDuration(750)
        .dimension(consumer_dim)
        .group(total_perConsumer)
        .renderLabel(true)
        .labelOffsetY(-10)
        .labelOffsetX(0)
        .gap(20)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .elasticX(true)
        .ordinalColors(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'])
        .xAxis().ticks(4).tickFormat(d3.format("s"));;
}

// Energy Consumption (ktoe) per fuel, stack consumer bar chart
function show_consumptionByFuelType_barchart(ndx) {

    var fuelType_dim = ndx.dimension(dc.pluck('fuelType'));
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perFuelType = fuelType_dim.group().reduceSum(dc.pluck('value'));

    var transport_group = fuelType_dim.group().reduceSum(function (d) {
        if (d.subgroup === 'Transport') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var residential_group = fuelType_dim.group().reduceSum(function (d) {
        if (d.subgroup === 'Residential') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var industry_group = fuelType_dim.group().reduceSum(function (d) {
        if (d.subgroup === 'Industry') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var services_group = fuelType_dim.group().reduceSum(function (d) {
        if (d.subgroup === 'Services') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var agriculture_group = fuelType_dim.group().reduceSum(function (d) {
        if (d.subgroup === 'Agriculture') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var fisheries_group = fuelType_dim.group().reduceSum(function (d) {
        if (d.subgroup === 'Fisheries') {
            return +d.value;
        } else {
            return 0;
        }
    });

    var names = ["Oil", "Electricity", "Nat.Gas", "Renewables", "Coal", "Peat", "Non-Re.Waste"]
    consumptionByFuelType_barchart = dc.barChart("#consumptionByFuelType_barchart")
    consumptionByFuelType_barchart
        .height(400)

        .margins({ top: 10, right: 0, bottom: 100, left: 50 })
        .dimension(fuelType_dim)
        .group(transport_group, 'Transport')
        .stack(residential_group, 'Residential')
        .stack(industry_group, 'Industry')
        .stack(services_group, 'Services')
        .stack(agriculture_group, 'Agriculture')
        .stack(fisheries_group, 'fisheries')

        .centerBar(true)
        .brushOn(false)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .gap(1)
        .elasticY(true)
        .transitionDuration(750)
        .x(d3.scale.ordinal().domain(names))
        .xUnits(dc.units.ordinal)
        .barPadding(0.1)
        .outerPadding(0.5)
        .ordinalColors(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33'])
        .y(d3.scale.linear().domain([0, 5500000]))
        .yAxis().ticks(4).tickFormat(d3.format("s"));
}



// for wrapping x axis text when too long, not working but will investigate later
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

