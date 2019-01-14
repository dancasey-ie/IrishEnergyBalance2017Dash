

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
var oilColorScale = ['#4eb1ab', '#5fb9b3', '#71c1bb', '#95d0cc', '#83c9c4', '#a6d8d5', '#b8e0dd', '#cae8e6', '#dcefee', '#edf7f7', '#ffffff']
var elecColor = '#0560a7'
var natgasColor = '#007a45'
var renewColor = '#bebd01'
var renewColorScale = ['#cbcb01', '#e4e401', '#fefe01', '#fefe1b', '#fefe34', '#fefe4d', '#fefe67', '#fefe80', '#fefe9a']
var coalColor = '#ffb736'
var coalColorScale = ['#ffc14d', '#ffc966', '#ffd280', '#ffdb99', '#ffe4b3', '#ffedcc']
var peatColor = '#ec571b'
var peatColorScale = ['#ee622b', '#f07342', '#f2855a', '#f49671', '#f5a889', '#f7b9a1', '#f9cbb8', '#fbdcd0']
var nonRWColor = '#c70063'
var fuelColorsList = [oilColor, elecColor, natgasColor, renewColor, coalColor, peatColor, nonRWColor]

var transportColor = '#5b156a'
var transportColorScale = ['#6d1980', '#7f1d95', '#9122aa', '#a326c0', '#b62ad5', '#bd3fd9', '#c455dd', '#cc6ae2', '#d37fe6', '#da95ea', '#e2aaee']
var residentialColor = '#ec571b'
var industryColor = '#ffb736'
var industryColorScale = ['#e69500', '#ffa600', '#ffaf1a', '#ffb833', '#ffb736', '#ffc14d', '#ffc966', '#ffd280', '#ffdb99', '#ffe4b3', '#ffedcc', '#fff6e6']
var servicesColor = '#006b3d'
var servicesColorScale = ['#009957', '#00cc74']
var agriFishColor = '#c70063'
var agriFishColorScale = ['#e60073', '#ff3399', '#ff66b3']

var consumerColorsList = [transportColor, residentialColor, industryColor, servicesColor, agriFishColor]



console.log(transportColorScale[5])
var transportTypes = ['Road Freight', 'Road Light Goods Vehicle', 'Road Private Car',
    'Public Passenger Services', 'Rail', 'Domestic Aviation', 'International Aviation',
    'Fuel Tourism', 'Navigation', 'Unspecified']
var industryTypes = ['Non - Energy Mining', 'Food & beverages', 'Textiles and textile products',
    'Wood and wood products', 'Pulp, paper, publishing and printing', 'Chemicals & man - made fibres',
    'Rubber and plastic products', 'Other non - metallic mineral products',
    'Basic metals and fabricated metal products', 'Machinery and equipment n.e.c.',
    'Electrical and optical equipment', 'Transport equipment manufacture', 'Other manufacturing']
var servicesTypes = ['Commercial Services', 'Public Services']
var agriFishTypes = ['Agricultural', 'Fisheries']


var coalTypes = ["BituminousCoal", "Anthracite+ManufacturedOvoids", "Coke",
    "Lignite\\BrownCoalBriquettes"];
var peatTypes = ["MilledPeat", "SodPeat", "Briquettes"];
var oilTypes = ["Crude", "RefineryGas", "Gasoline", "Kerosene", "JetKerosene",
    "Fueloil", "LPG", "Gasoil/Diesel/DERV", "PetroleumCoke", "Naphta"];
var natgasTypes = ['NaturalGas'];
var ReTypes = ["Hydro", "Wind", "Biomass&RenewableWaste", "LandfillGas", "Biogas",
    "LiquidBiofuel", "Solar", "Geothermal"];
var nonRwWasteTypes = ["Non-RenewableWaste"];
var elecTypes = ["Electricity"];

function makeGraphsFinalEnergyConsumption(error, energyData) {
    var ndx = crossfilter(energyData);

    show_consumptionByFuelType_rowchart(ndx);
    show_consumptionByConsumer_barchart(ndx);

    // show_consumptionByConsumer_piechart(ndx);
    //show_consumptionFuel_piechart(ndx);

    show_consumptionConsumer_sunburstchart_inner(ndx);
    show_consumptionConsumer_sunburstchart_outer(ndx);

    show_consumptionFuel_sunburstchart_inner(ndx);
    show_consumptionFuel_sunburstchart_outer(ndx);

    //show_consumptionByConsumer_rowchart(ndx);
    //show_consumptionByFuelType_barchart(ndx);

    dc.renderAll();
}

function makeGraphsPrimaryEnergyReq(error, energyData) {
    var ndx = crossfilter(energyData);

    show_supplyBySource_barchart(ndx);
    // show_supplyFuel_piechart(ndx);
    show_primReqFuel_sunburstchart_inner(ndx);
    show_primReqFuel_sunburstchart_outer(ndx);
    dc.renderAll();
}

function makeGraphsTransformation(error, energyData) {
    var ndx = crossfilter(energyData);
    //show_transformationInput_rowchart(ndx);
    //show_transformationOutput_rowchart(ndx);
    show_transforationInput_barchart(ndx);
    show_transforationOutput_barchart(ndx);
    dc.renderAll();
}
//----------------------------------------------------------------------------Final Consumption Charts
//--------------------------------------------------------------Consumption by Fuel Row Chart
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
        .ordinalColors(fuelColorsList)
        .xAxis().ticks(4).tickFormat(d3.format("s"));;
}

//--------------------------------------------------------------Consumption by Consumer Bar Chart
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
        .ordinalColors(fuelColorsList)
        .yAxis().ticks(4).tickFormat(d3.format("s"));

    consumptionByConsumer_barchart.selectAll(".x.axis text")
        .call(wrap, 200);
}

//--------------------------------------------------------------Consumption Consumer Breakdown Pie Chart

//--------------------------------------------------------------Consumption Consumer Breakdown Pie Chart (inner)
function show_consumptionConsumer_sunburstchart_inner(ndx) {
    var consumerType_dim = ndx.dimension(dc.pluck('subgroup'));
    var all = consumerType_dim.groupAll().reduceSum(dc.pluck('value'));
    var consumerType_group = consumerType_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#consumptionByConsumer_sunburstchart_inner")
        .transitionDuration(750)
        .dimension(consumerType_dim)
        .group(consumerType_group)
        .radius(50)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors(consumerColorsList)
        .renderLabel(false);

}

//--------------------------------------------------------------Consumption Fuel Breakdown Pie Chart (outer)
function show_consumptionConsumer_sunburstchart_outer(ndx) {
    var consumer_dim = ndx.dimension(dc.pluck('record'));
    var all = consumer_dim.groupAll().reduceSum(dc.pluck('value'));
    var consumer_group = consumer_dim.group().reduceSum(dc.pluck('value'));
    var filteredConsumer_array = consumer_group.top(Infinity);
    var list = [];
    var transportDomain = [];
    var residentialDomain = [];
    var industryDomain = [];
    var servicesDomain = [];
    var agriFishDomain = [];
    var transportIndex = 0;
    var industryIndex = 0;
    var servicesIndex = 0;
    var agriFishIndex = 0;
    var domainColors = [];
    console.log(filteredConsumer_array)
    filteredConsumer_array.forEach(seperate_consumerTypes);
    function seperate_consumerTypes(d) {
        if (transportTypes.indexOf(d.key) > -1) {
            transportDomain.push(d.key);
            domainColors.push(transportColorScale[transportIndex]);

            transportIndex = transportIndex + 1;
        }
        else if (d.key === 'Residential') {
            residentialDomain.push(d.key);
            domainColors.push(residentialColor);
        }
        else if (industryTypes.indexOf(d.key) > -1) {
            industryDomain.push(d.key);
            domainColors.push(industryColorScale[industryIndex]);

            industryIndex = industryIndex + 1;
            console.log(industryIndex)
        }
        else if (servicesTypes.indexOf(d.key) > -1) {
            servicesDomain.push(d.key);
            domainColors.push(servicesColorScale[servicesIndex]);
            servicesIndex = servicesIndex + 1;
        }
        else if (agriFishTypes.indexOf(d.key) > -1) {
            agriFishDomain.push(d.key);
            domainColors.push(agriFishColorScale[agriFishIndex]);
            agriFishIndex = agriFishIndex + 1;
        }
    };

    console.log(domainColors)
    // var domain = oilDomain.concat(elecDomain).concat(natgasDomain).concat(ReDomain).concat(coalDomain).concat(peatDomain).concat(nonRwWasteDomain);
    var consumptionByConsumer_sunburstchart_outer = dc.pieChart("#consumptionByConsumer_sunburstchart_outer");
    consumptionByConsumer_sunburstchart_outer
        .transitionDuration(750)
        .dimension(consumer_dim)
        .group(consumer_group)
        .radius(100)
        .innerRadius(60)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors(domainColors)
        .legend(dc.legend())
        .renderLabel(false);

    // https://stackoverflow.com/questions/29371256/dc-js-piechart-legend-hide-if-result-is-0/29415900#29415900
    dc.override(consumptionByConsumer_sunburstchart_outer, 'legendables', function () {
        var legendables = this._legendables();
        return legendables.filter(function (l) {
            return l.data > 0;
        });
    });
}






//--------------------------------------------------------------Consumption Fuel Breakdown Pie Chart

//--------------------------------------------------------------Consumption Fuel Breakdown Pie Chart (inner)
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
        .ordinalColors(fuelColorsList)
        .renderLabel(false);

}

//--------------------------------------------------------------Consumption Fuel Breakdown Pie Chart (outer)
function show_consumptionFuel_sunburstchart_outer(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck('fuel'));
    var all = fuel_dim.groupAll().reduceSum(dc.pluck('value'));
    var fuel_group = fuel_dim.group().reduceSum(dc.pluck('value'));
    var filteredFuel_array = fuel_group.top(Infinity);
    var list = [];
    var coalDomain = [];
    var peatDomain = [];
    var oilDomain = [];
    var natgasDomain = [];
    var ReDomain = [];
    var nonRwWasteDomain = [];
    var elecDomain = [];
    var domainColors = []
    var oilFuelIndex = 0;
    var renewFuelIndex = 0;
    var coalFuelIndex = 0;
    var peatFuelIndex = 0;

    filteredFuel_array.forEach(seperate_fuelTypes);
    function seperate_fuelTypes(d) {
        if (oilTypes.indexOf(d.key) > -1) {
            oilDomain.push(d.key);
            domainColors.push(oilColorScale[oilFuelIndex]);

            oilFuelIndex = oilFuelIndex + 1;
        }
        else if (elecTypes.indexOf(d.key) > -1) {
            elecDomain.push(d.key);
            domainColors.push(elecColor);
        }
        else if (natgasTypes.indexOf(d.key) > -1) {
            natgasDomain.push(d.key);
            domainColors.push(natgasColor);
        }
        else if (ReTypes.indexOf(d.key) > -1) {
            ReDomain.push(d.key);
            domainColors.push(renewColorScale[renewFuelIndex]);
            renewFuelIndex = renewFuelIndex + 1;
        }
        else if (coalTypes.indexOf(d.key) > -1) {
            coalDomain.push(d.key);
            domainColors.push(coalColorScale[coalFuelIndex]);
            coalFuelIndex = coalFuelIndex + 1;
        }
        else if (peatTypes.indexOf(d.key) > -1) {
            peatDomain.push(d.key);
            domainColors.push(peatColorScale[peatFuelIndex]);
            peatFuelIndex = peatFuelIndex + 1;
        }
        else if (nonRwWasteTypes.indexOf(d.key) > -1) {
            nonRwWasteDomain.push(d.key);
            domainColors.push(nonRWColor);
        }
    };

    var domain = oilDomain.concat(elecDomain).concat(natgasDomain).concat(ReDomain).concat(coalDomain).concat(peatDomain).concat(nonRwWasteDomain);
    var consumptionByFuel_sunburstchart_outer = dc.pieChart("#consumptionByFuel_sunburstchart_outer");
    consumptionByFuel_sunburstchart_outer
        .transitionDuration(750)
        .dimension(fuel_dim)
        .group(fuel_group)
        .radius(100)
        .innerRadius(60)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors(domainColors)
        .legend(dc.legend())
        .renderLabel(false);

    // https://stackoverflow.com/questions/29371256/dc-js-piechart-legend-hide-if-result-is-0/29415900#29415900
    dc.override(consumptionByFuel_sunburstchart_outer, 'legendables', function () {
        var legendables = this._legendables();
        return legendables.filter(function (l) {
            return l.data > 0;
        });
    });
}

//----------------------------------------------------------------------------Primary Requirement Charts
//--------------------------------------------------------------Primary Req. by Source Bar Chart
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
        .ordinalColors(fuelColorsList)
        .yAxis().ticks(4).tickFormat(d3.format("s"));
}


//--------------------------------------------------------------Primary Req. Fuel Breakdown Pie Chart

//--------------------------------------------------------------Primary Req. Fuel Breakdown Pie Chart (inner)
function show_primReqFuel_sunburstchart_inner(ndx) {
    var fuelType_dim = ndx.dimension(dc.pluck('fuelType'));
    var all = fuelType_dim.groupAll().reduceSum(dc.pluck('value'));
    var fuelType_group = fuelType_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#primReqByFuel_sunburstchart_inner")
        .transitionDuration(750)
        .dimension(fuelType_dim)
        .group(fuelType_group)
        .radius(50)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors([oilColor, natgasColor, renewColor, coalColor, peatColor, nonRWColor])
        .renderLabel(false);

}

//--------------------------------------------------------------Primary Req. Fuel Breakdown Pie Chart (outer)
function show_primReqFuel_sunburstchart_outer(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck('fuel'));
    var all = fuel_dim.groupAll().reduceSum(dc.pluck('value'));
    var fuel_group = fuel_dim.group().reduceSum(dc.pluck('value'));
    var filteredFuel_array = fuel_group.top(Infinity);
    var list = [];
    var coalDomain = [];
    var peatDomain = [];
    var oilDomain = [];
    var natgasDomain = [];
    var ReDomain = [];
    var nonRwWasteDomain = [];
    var elecDomain = [];
    var domainColors = []
    var oilFuelIndex = 0;
    var renewFuelIndex = 0;
    var coalFuelIndex = 0;
    var peatFuelIndex = 0;

    filteredFuel_array.forEach(seperate_fuelTypes);
    function seperate_fuelTypes(d) {
        if (oilTypes.indexOf(d.key) > -1) {
            oilDomain.push(d.key);
            domainColors.push(oilColorScale[oilFuelIndex]);

            oilFuelIndex = oilFuelIndex + 1;
        }
        else if (elecTypes.indexOf(d.key) > -1) {
            elecDomain.push(d.key);
            domainColors.push(elecColor);
        }
        else if (natgasTypes.indexOf(d.key) > -1) {
            natgasDomain.push(d.key);
            domainColors.push(natgasColor);
        }
        else if (ReTypes.indexOf(d.key) > -1) {
            ReDomain.push(d.key);
            domainColors.push(renewColorScale[renewFuelIndex]);
            renewFuelIndex = renewFuelIndex + 1;
        }
        else if (coalTypes.indexOf(d.key) > -1) {
            coalDomain.push(d.key);
            domainColors.push(coalColorScale[coalFuelIndex]);
            coalFuelIndex = coalFuelIndex + 1;
        }
        else if (peatTypes.indexOf(d.key) > -1) {
            peatDomain.push(d.key);
            domainColors.push(peatColorScale[peatFuelIndex]);
            peatFuelIndex = peatFuelIndex + 1;
        }
        else if (nonRwWasteTypes.indexOf(d.key) > -1) {
            nonRwWasteDomain.push(d.key);
            domainColors.push(nonRWColor);
        }
    };

    var domain = oilDomain.concat(elecDomain).concat(natgasDomain).concat(ReDomain).concat(coalDomain).concat(peatDomain).concat(nonRwWasteDomain);
    var primReqByFuel_sunburstchart_outer = dc.pieChart("#primReqByFuel_sunburstchart_outer");
    primReqByFuel_sunburstchart_outer
        .transitionDuration(750)
        .dimension(fuel_dim)
        .group(fuel_group)
        .radius(100)
        .innerRadius(60)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .ordinalColors(domainColors)
        .legend(dc.legend())
        .renderLabel(false);

    // https://stackoverflow.com/questions/29371256/dc-js-piechart-legend-hide-if-result-is-0/29415900#29415900
    dc.override(primReqByFuel_sunburstchart_outer, 'legendables', function () {
        var legendables = this._legendables();
        return legendables.filter(function (l) {
            return l.data > 0;
        });
    });
}

//----------------------------------------------------------------------------Transformation Charts


//--------------------------------------------------------------Transformation Output by Use Bar Chart
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
        .ordinalColors(fuelColorsList)
        .y(d3.scale.linear().domain([0, 5500000]))

        .yAxis().ticks(4).tickFormat(d3.format("s"));
}

//--------------------------------------------------------------Transformation Output by Use Bar Chart
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
        .ordinalColors(fuelColorsList)
        .y(d3.scale.linear().domain([0, 5500000]))

        .yAxis().ticks(4).tickFormat(d3.format("s"));
}




























//                                                                                  TO BE REMOVED


//--------------------------------------------------------------Transformation Input by Use Row Chart
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
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .elasticX(false)
        .xAxis().ticks(4).tickFormat(d3.format("s"));
}

//--------------------------------------------------------------Transformation Output by Use Row Chart
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

//--------------------------------------------------------------Consumer Breakdown Pie Chart
function show_consumptionByConsumer_piechart(ndx) {
    var consumerSub_dim = ndx.dimension(dc.pluck('record'));
    var all = consumerSub_dim.groupAll().reduceSum(dc.pluck('value'));
    var total_perConsumerSub = consumerSub_dim.group().reduceSum(dc.pluck('value'));
    dc.pieChart("#consumptionByConsumerSub_piechart")
        .height(500)
        .width(200)
        .transitionDuration(750)
        .radius(50)
        .innerRadius(30)
        .dimension(consumerSub_dim)
        .group(total_perConsumerSub)
        .title(function (d) {
            return d.key + ':\n' + Math.round(d.value / all.value() * 100) + '%\n' + Math.round(d.value) + 'toe';
        })
        .legend(dc.legend())
        .renderLabel(false);
}
//--------------------------------------------------------------Primary Req. by Fuel Pie Chart
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