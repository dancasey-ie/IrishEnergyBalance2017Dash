// global variables
var oilColor = '#46a09a';
var elecColor = '#0560a7';
var natgasColor = '#007a45';
var renewColor = '#bebd01';
var coalColor = '#ffb736';
var peatColor = '#ec571b';
var nonRWColor = '#c70063';
var fuelColorsList = [oilColor, elecColor, natgasColor, renewColor, coalColor, peatColor, nonRWColor];
var transportColor = '#5b156a';
var residentialColor = '#ec571b';
var industryColor = '#ffb736';
var servicesColor = '#006b3d';
var agriFishColor = '#c70063';
var consumerColorsList = [transportColor, residentialColor, industryColor, servicesColor, agriFishColor];
var numberFormat = d3.format(",.4r");


// Load in data as json, wait until data is fully loaded before executing  makeGraphs
queue()
    .defer(d3.json, "static/data/EnergyBalance2017.json")
    .await(makeGraphs);

// makeGraphs seperates out the data into seperate crossfilter groups and renders dc charts.
function makeGraphs(error, energyData) {
    var finalConsumptionData = [];
    var primReqData = [];
    var transInputData = [];
    var transOutputData = [];

    // seperate crossfilters by group
    energyData.forEach(function seperate_dataGroups(d) {
        if (d.group === "FinalEnergyConsumption") {
            finalConsumptionData.push(d);
        }
        else if (d.group === "PrimaryEnergyRequirement") {
            primReqData.push(d);
        }
        else if (d.group === "TransformationInput") {
            transInputData.push(d);
        }
        else if (d.group === "TransformationOutput") {
            transOutputData.push(d);
        }
    });

    // assign crossfiters for different data groups
    var finalConsumptionData_ndx = crossfilter(finalConsumptionData);
    var primReqData_ndx = crossfilter(primReqData);
    var transInputData_ndx = crossfilter(transInputData);
    var transOutputData_ndx = crossfilter(transOutputData);

    // get unfilters total of different data groups
    var finalConsumptionDataTot = getTotal(finalConsumptionData);
    var primReqDataTot = getTotal(primReqData);
    var transInputDataTot = getTotal(transInputData);
    var transOutputDataTot = getTotal(transOutputData);

    // Consumption Tool Tips
    var consumptionPieTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('s')
        .offset([0, -50])
        .html(function (d) {
            return "<span style='color: #f0027f'>" +
                d.data.key + "</span> " + '</br>' +
                numberFormat(d.value) + 'toe</br>' +
                numberFormat(d.value * 11.63) + 'MWh</br >' +
                numberFormat((d.value / finalConsumptionDataTot) * 100) + '% of total';
        });

    var consumptionBarTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('se')
        .offset([0, 0])
        .html(function (d) {
            return "<span style='color: #f0027f'>" +
                d.data.key + " - " + d.layer + "</span> " + '</br>' +
                numberFormat(d.y) + 'toe</br>' +
                numberFormat(d.y * 11.63) + 'MWh</br >' +
                numberFormat((d.y / finalConsumptionDataTot) * 100) + '% of total';
        });

    var consumptionRowTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('se')
        .offset([-10, -25])
        .html(function (d) {

            return "<span style='color: #f0027f'>" +
                d.key + "</span> " + '</br>' +
                numberFormat(d.value) + 'toe</br>' +
                numberFormat(d.value * 11.63) + 'MWh</br >' +
                numberFormat((d.value / finalConsumptionDataTot) * 100) + '% of total';
        });

    // Primary requirements Tool Tips
    var reqPieTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('s')
        .offset([0, -50])
        .html(function (d, total) {
            return "<span style='color: #f0027f'>" +
                d.data.key + "</span> " + '</br>' +
                numberFormat(d.value) + 'toe</br>' +
                numberFormat(d.value * 11.63) + 'MWh</br >' +
                numberFormat((d.value / primReqDataTot) * 100) + '% of total';
        });

    var reqBarTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('se')
        .offset([0, 0])
        .html(function (d) {

            return "<span style='color: #f0027f'>" +
                d.data.key + " - " + d.layer + "</span> " + '</br>' +
                numberFormat(d.y) + 'toe</br>' +
                numberFormat(d.y * 11.63) + 'MWh</br >' +
                numberFormat((d.y / primReqDataTot) * 100) + '% of total';
        });

    // Transformation Input Tool Tips
    var transformInPieTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('s')
        .offset([0, -50])
        .html(function (d, total) {
            return "<span style='color: #f0027f'>" +
                d.data.key + "</span> " + '</br>' +
                numberFormat(d.value) + 'toe</br>' +
                numberFormat(d.value * 11.63) + 'MWh</br >' +
                numberFormat((d.value / transInputDataTot) * 100) + '% of total';
        });

    var transformInBarTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('s')
        .offset([0, -50])
        .html(function (d) {
            return "<span style='color: #f0027f'>" +
                d.data.key + " - " + d.layer + "</span> " + '</br>' +
                numberFormat(d.y) + 'toe</br>' +
                numberFormat(d.y * 11.63) + 'MWh</br >' +
                numberFormat((d.y / transInputDataTot) * 100) + '% of total';
        });

    // Transformation Output Tool Tips
    var transformOutPieTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('s')
        .offset([0, -50])
        .html(function (d, total) {
            return "<span style='color: #f0027f'>" +
                d.data.key + "</span> " + '</br>' +
                numberFormat(d.value) + 'toe</br>' +
                numberFormat(d.value * 11.63) + 'MWh</br >' +
                numberFormat((d.value / transOutputDataTot) * 100) + '% of total';
        });

    var transformOutBarTip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('s')
        .offset([0, -50])
        .html(function (d) {
            return "<span style='color: #f0027f'>" +
                d.data.key + " - " + d.layer + "</span> " + '</br>' +
                numberFormat(d.y) + 'toe</br>' +
                numberFormat(d.y * 11.63) + 'MWh</br >' +
                numberFormat((d.y / transOutputDataTot) * 100) + '% of total';
        });

    // call dc.chart functions and render
    show_consumptionByFuelType_rowchart(finalConsumptionData_ndx);
    show_consumptionByConsumer_barchart(finalConsumptionData_ndx);

    show_consumptionConsumer_sunburstchart_inner(finalConsumptionData_ndx);
    show_consumptionConsumer_sunburstchart_outer(finalConsumptionData_ndx);

    show_consumptionFuel_sunburstchart_inner(finalConsumptionData_ndx);
    show_consumptionFuel_sunburstchart_outer(finalConsumptionData_ndx);

    show_primReqBySource_barchart(primReqData_ndx);

    show_primReqFuel_sunburstchart_inner(primReqData_ndx);
    show_primReqFuel_sunburstchart_outer(primReqData_ndx);

    show_transforationInput_barchart(transInputData_ndx);
    show_transforationOutput_barchart(transOutputData_ndx);

    show_transformationInputFuel_piechart(transInputData_ndx);
    show_transformationOutputFuel_piechart(transOutputData_ndx);


    dc.renderAll();



    // Call consumption tool tip functions
    d3.selectAll(".finalEnergyConsumption_container .pie-slice").call(consumptionPieTip);
    d3.selectAll(".finalEnergyConsumption_container .pie-slice").on('mouseover', consumptionPieTip.show)
        .on('mouseout', consumptionPieTip.hide);
    d3.selectAll(".finalEnergyConsumption_container g .bar").call(consumptionBarTip);
    d3.selectAll(".finalEnergyConsumption_container g .bar").on('mouseover', consumptionBarTip.show)
        .on('mouseout', consumptionBarTip.hide);
    d3.selectAll(".finalEnergyConsumption_container g .row").call(consumptionRowTip);
    d3.selectAll(".finalEnergyConsumption_container g .row").on('mouseover', consumptionRowTip.show)
        .on('mouseout', consumptionRowTip.hide);

    // Call primary requirements tool tip functions
    d3.selectAll(".primaryEnergyReq_container .pie-slice").call(reqPieTip);
    d3.selectAll(".primaryEnergyReq_container .pie-slice").on('mouseover', reqPieTip.show)
        .on('mouseout', reqPieTip.hide);
    d3.selectAll(".primaryEnergyReq_container g .bar").call(reqBarTip);
    d3.selectAll(".primaryEnergyReq_container g .bar").on('mouseover', reqBarTip.show)
        .on('mouseout', reqBarTip.hide);

    // Call transformation input tool tip functions
    d3.selectAll("#transformationInputByFuel_piechart .pie-slice").call(transformInPieTip);
    d3.selectAll("#transformationInputByFuel_piechart .pie-slice").on('mouseover', transformInPieTip.show)
        .on('mouseout', transformInPieTip.hide);
    d3.selectAll("#transformationInput_barchart g .bar").call(transformInBarTip);
    d3.selectAll("#transformationInput_barchart g .bar").on('mouseover', transformInBarTip.show)
        .on('mouseout', transformInBarTip.hide);

    // Call transformation output tool tip functions
    d3.selectAll("#transformationOutputByFuel_piechart .pie-slice").call(transformOutPieTip);
    d3.selectAll("#transformationOutputByFuel_piechart .pie-slice").on('mouseover', transformOutPieTip.show)
        .on('mouseout', transformOutPieTip.hide);
    d3.selectAll("#transformationOutput_barchart g .bar").call(transformOutBarTip);
    d3.selectAll("#transformationOutput_barchart g .bar").on('mouseover', transformOutBarTip.show)
        .on('mouseout', transformOutBarTip.hide);
}

//----------------------------------------------------------------------------Final Consumption Charts
//--------------------------------------------------------------Consumption by Fuel Row Chart
function show_consumptionByFuelType_rowchart(ndx) {
    var fuelType_dim = ndx.dimension(dc.pluck('fuelType'));
    var fuelType_group = fuelType_dim.group().reduceSum(dc.pluck('value'));

    dc.rowChart("#consumptionByFuelType_rowchart")
        .height(350)
        .margins({ top: 0, left: 10, right: 20, bottom: 100 })
        .transitionDuration(750)
        .dimension(fuelType_dim)
        .group(fuelType_group)
        .renderLabel(true)
        .labelOffsetY(-10)
        .labelOffsetX(0)
        .gap(20)
        .title(function (d) { return ""; })
        .elasticX(true)
        .ordinalColors(fuelColorsList)
        .xAxis().ticks(4).tickFormat(d3.format("s"));
}

//--------------------------------------------------------------Consumption by Consumer Bar Chart
function show_consumptionByConsumer_barchart(ndx) {

    var consumer_dim = ndx.dimension(dc.pluck('subgroup'));
    var consumers = ["Transport", "Residential", "Industry", "Services", "Agri. & Fisheries"]
    var coal_group = consumer_dim.group().reduceSum(function (d) { return getValue(d, 'Coal')});
    var elec_group = consumer_dim.group().reduceSum(function (d) { return getValue(d, 'Electricity') });
    var natgas_group = consumer_dim.group().reduceSum(function (d) { return getValue(d, 'Nat.Gas') });
    var nRWaste_group = consumer_dim.group().reduceSum(function (d) { return getValue(d, 'Non-Re.Waste') });
    var oil_group = consumer_dim.group().reduceSum(function (d) { return getValue(d, 'Oil') });
    var peat_group = consumer_dim.group().reduceSum(function (d) { return getValue(d, 'Peat') });
    var renew_group = consumer_dim.group().reduceSum(function (d) { return getValue(d, 'Renewables') });

    consumptionByConsumer_barchart = dc.barChart("#consumptionByConsumer_barchart")
    consumptionByConsumer_barchart
        .height(330)
        .margins({ top: 10, right: -20, bottom: 80, left: 20 })
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
        .title(function (d) { return ""; })
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
}

//--------------------------------------------------------------Consumption Consumer Breakdown Pie Chart

//--------------------------------------------------------------Consumption Consumer Breakdown Pie Chart (inner)
function show_consumptionConsumer_sunburstchart_inner(ndx) {
    var consumerType_dim = ndx.dimension(dc.pluck('subgroup'));
    var consumerType_group = consumerType_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#consumptionByConsumer_sunburstchart_inner")
        .transitionDuration(750)
        .dimension(consumerType_dim)
        .group(consumerType_group)
        .radius(50)
        .title(function (d) { return ""; })
        .ordinalColors(consumerColorsList)
        .renderLabel(false);
}

//--------------------------------------------------------------Consumption Consumer Breakdown Pie Chart (outer)
function show_consumptionConsumer_sunburstchart_outer(ndx) {
    var consumer_dim = ndx.dimension(dc.pluck('record'));
    var consumer_group = consumer_dim.group().reduceSum(dc.pluck('value'));
    var domainColors = getConsumerDomainColors(consumer_group.top(Infinity));

    var consumptionByConsumer_sunburstchart_outer = dc.pieChart("#consumptionByConsumer_sunburstchart_outer");
    consumptionByConsumer_sunburstchart_outer
        .transitionDuration(750)
        .dimension(consumer_dim)
        .group(consumer_group)
        .radius(100)
        .innerRadius(60)
        .title(function (d) { return ""; })
        .ordinalColors(domainColors)
        .legend(dc.legend())
        .renderLabel(false);

    // hide key from legend if value <= 0
    // taken from https://stackoverflow.com/questions/29371256/dc-js-piechart-legend-hide-if-result-is-0/29415900#29415900
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
    var fuelType_group = fuelType_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#consumptionByFuel_sunburstchart_inner")
        .transitionDuration(750)
        .dimension(fuelType_dim)
        .group(fuelType_group)
        .radius(50)
        .title(function (d) { return ""; })
        .ordinalColors(fuelColorsList)
        .renderLabel(false);
}

//--------------------------------------------------------------Consumption Fuel Breakdown Pie Chart (outer)
function show_consumptionFuel_sunburstchart_outer(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck('fuel'));
    var fuel_group = fuel_dim.group().reduceSum(dc.pluck('value'));
    var domainColors = getFuelDomainColors(fuel_group.top(Infinity));

    var consumptionByFuel_sunburstchart_outer = dc.pieChart("#consumptionByFuel_sunburstchart_outer");
    consumptionByFuel_sunburstchart_outer
        .transitionDuration(750)
        .dimension(fuel_dim)
        .group(fuel_group)
        .radius(100)
        .innerRadius(60)
        .title(function (d) { return ""; })
        .ordinalColors(domainColors)
        .legend(dc.legend())
        .renderLabel(false);

     // hide key from legend if value <= 0
    // taken from https://stackoverflow.com/questions/29371256/dc-js-piechart-legend-hide-if-result-is-0/29415900#29415900
    dc.override(consumptionByFuel_sunburstchart_outer, 'legendables', function () {
        var legendables = this._legendables();
        return legendables.filter(function (l) {
            return l.data > 0;
        });
    });
}

//----------------------------------------------------------------------------Primary Requirement Charts
//--------------------------------------------------------------Primary Req. by Source Bar Chart
function show_primReqBySource_barchart(ndx) {

    var source_dim = ndx.dimension(dc.pluck('record'));
    var coal_group = source_dim.group().reduceSum(function (d) { return getValue(d, 'Coal') });
    var elec_group = source_dim.group().reduceSum(function (d) { return getValue(d, 'Electricity') });
    var natgas_group = source_dim.group().reduceSum(function (d) { return getValue(d, 'Nat.Gas') });
    var nRWaste_group = source_dim.group().reduceSum(function (d) { return getValue(d, 'Non-Re.Waste') });
    var oil_group = source_dim.group().reduceSum(function (d) { return getValue(d, 'Oil') });
    var peat_group = source_dim.group().reduceSum(function (d) { return getValue(d, 'Peat') });
    var renew_group = source_dim.group().reduceSum(function (d) { return getValue(d, 'Renewables') });

    primReqBySource_barchart = dc.barChart("#primReqBySource_barchart")
    primReqBySource_barchart
        .height(330)
        .margins({ top: 10, right: -20, bottom: 80, left: 25 })
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
        .title(function (d) { return ""; })
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
    var fuelType_group = fuelType_dim.group().reduceSum(dc.pluck('value'));

    dc.pieChart("#primReqByFuel_sunburstchart_inner")
        .transitionDuration(750)
        .dimension(fuelType_dim)
        .group(fuelType_group)
        .radius(50)
        .title(function (d) { return ""; })
        .ordinalColors([oilColor, natgasColor, renewColor, coalColor, peatColor, nonRWColor])
        .renderLabel(false);
}

//--------------------------------------------------------------Primary Req. Fuel Breakdown Pie Chart (outer)
function show_primReqFuel_sunburstchart_outer(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck('fuel'));
    var fuel_group = fuel_dim.group().reduceSum(dc.pluck('value'));
    var domainColors = getFuelDomainColors(fuel_group.top(Infinity));
    var primReqByFuel_sunburstchart_outer = dc.pieChart("#primReqByFuel_sunburstchart_outer");

    primReqByFuel_sunburstchart_outer
        .transitionDuration(750)
        .dimension(fuel_dim)
        .group(fuel_group)
        .radius(100)
        .innerRadius(60)
        .title(function (d) { return ""; })
        .ordinalColors(domainColors)
        .legend(dc.legend())
        .renderLabel(false);

     // hide key from legend if value <= 0
    // taken from https://stackoverflow.com/questions/29371256/dc-js-piechart-legend-hide-if-result-is-0/29415900#29415900
    dc.override(primReqByFuel_sunburstchart_outer, 'legendables', function () {
        var legendables = this._legendables();
        return legendables.filter(function (l) {
            return l.data > 0;
        });
    });
}

//----------------------------------------------------------------------------Transformation Charts
//--------------------------------------------------------------Transformation Input by Use Bar Chart
function show_transforationInput_barchart(ndx) {
    var tranIn_dim = ndx.dimension(dc.pluck('record'));
    var coal_group = tranIn_dim.group().reduceSum(function (d) { return getValue(d, 'Coal') });
    var elec_group = tranIn_dim.group().reduceSum(function (d) { return getValue(d, 'Electricity') });
    var natgas_group = tranIn_dim.group().reduceSum(function (d) { return getValue(d, 'Nat.Gas') });
    var nRWaste_group = tranIn_dim.group().reduceSum(function (d) { return getValue(d, 'Non-Re.Waste') });
    var oil_group = tranIn_dim.group().reduceSum(function (d) { return getValue(d, 'Oil') });
    var peat_group = tranIn_dim.group().reduceSum(function (d) { return getValue(d, 'Peat') });
    var renew_group = tranIn_dim.group().reduceSum(function (d) { return getValue(d, 'Renewables') });
    // domain sets order of bars on chart
    var domain = ["Pumped Storage", "Briquetting Plants", "Combined Heat and Power Plants", "Oil Refineries & other energy sector", "Public Thermal Power Plants"]

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
        .title(function (d) { return ""; })
        .transitionDuration(750)
        .x(d3.scale.ordinal().domain(domain))
        .xUnits(dc.units.ordinal)
        .gap(10)
        .barPadding(0.4)
        .outerPadding(0.5)
        .ordinalColors(fuelColorsList)
        .y(d3.scale.linear().domain([0, 35000]))
        .elasticY(true)
        .yAxis().ticks(4).tickFormat(d3.format("s"));
}

//--------------------------------------------------------------Transformation Output by Use Bar Chart
function show_transforationOutput_barchart(ndx) {

    var tranOut_dim = ndx.dimension(dc.pluck('record'));
    var coal_group = tranOut_dim.group().reduceSum(function (d) { return getValue(d, 'Coal') });
    var elec_group = tranOut_dim.group().reduceSum(function (d) { return getValue(d, 'Electricity') });
    var natgas_group = tranOut_dim.group().reduceSum(function (d) { return getValue(d, 'Nat.Gas') });
    var nRWaste_group = tranOut_dim.group().reduceSum(function (d) { return getValue(d, 'Non-Re.Waste') });
    var oil_group = tranOut_dim.group().reduceSum(function (d) { return getValue(d, 'Oil') });
    var peat_group = tranOut_dim.group().reduceSum(function (d) { return getValue(d, 'Peat') });
    var renew_group = tranOut_dim.group().reduceSum(function (d) { return getValue(d, 'Renewables') });
    // domain sets order of bars on chart
    var domain = ["Public Thermal Power Plants", "Oil Refineries & other energy sector", "Combined Heat and Power Plants", "Briquetting Plants", "Pumped Storage"]

    transformationOutput_barchart = dc.barChart("#transformationOutput_barchart")
    transformationOutput_barchart
        .width(300)
        .height(200)
        .margins({ top: 0, right: 0, bottom: 0, left: 20 })
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
        .title(function (d) { return ""; })
        .elasticY(true)
        .transitionDuration(750)
        .x(d3.scale.ordinal().domain(domain))
        .xUnits(dc.units.ordinal)
        .gap(10)
        .barPadding(0.4)
        .outerPadding(0.5)
        .ordinalColors(fuelColorsList)
        .y(d3.scale.linear().domain([0, 35000]))
        .yAxis().ticks(4).tickFormat(d3.format("s"));
}


//--------------------------------------------------------------Transformation Input Pie Chart
function show_transformationInputFuel_piechart(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck("fuel"));
    var fuel_group = fuel_dim.group().reduceSum(dc.pluck('value'));
    var domainColors = getFuelDomainColors(fuel_group.top(Infinity));
    dc.pieChart("#transformationInputByFuel_piechart")
        .height(100)
        .width(100)
        .transitionDuration(750)
        .radius(50)
        .innerRadius(30)
        .dimension(fuel_dim)
        .group(fuel_group)
        .title(function (d) { return ""; })
        .ordinalColors(domainColors)
        .renderLabel(false);
}

//--------------------------------------------------------------Transformation Output Pie Chart
function show_transformationOutputFuel_piechart(ndx) {
    var fuel_dim = ndx.dimension(dc.pluck("fuel"));
    var fuel_group = fuel_dim.group().reduceSum(dc.pluck('value'));
    var domainColors = getFuelDomainColors(fuel_group.top(Infinity));
    dc.pieChart("#transformationOutputByFuel_piechart")
        .height(100)
        .width(100)
        .transitionDuration(750)
        .radius(50)
        .innerRadius(30)
        .dimension(fuel_dim)
        .group(fuel_group)
        .title(function (d) { return ""; })
        .ordinalColors(domainColors)
        .renderLabel(false);
}



// get total of array with values to be totaled stored in key = value
function getTotal(array) {
    var valuesList = [];
    array.forEach(function (a) { if (a.value != "") valuesList.push(a.value) })
    return valuesList.reduce((a, b) => a + b, 0);
};


// get fuelType_group by fuelTypeName
function getValue(d, fuelTypeName) {
    if (d.fuelType === fuelTypeName) {
        return +d.value;
    } else {
        return 0;
    }
}

// get domain colors list for consumer pie chart outers based on sub type
function getConsumerDomainColors(d) {
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
    var transportColorScale = ['#6d1980', '#7f1d95', '#9122aa', '#a326c0', '#b62ad5',
        '#bd3fd9', '#c455dd', '#cc6ae2', '#d37fe6', '#da95ea', '#e2aaee'];
    var industryColorScale = ['#e69500', '#ffa600', '#ffaf1a', '#ffb833', '#ffb736',
        '#ffc14d', '#ffc966', '#ffd280', '#ffdb99', '#ffe4b3', '#ffedcc', '#fff6e6'];
    var servicesColorScale = ['#009957', '#00cc74'];
    var agriFishColorScale = ['#e60073', '#ff3399', '#ff66b3'];
    var transportTypes = ['Road Freight', 'Road Light Goods Vehicle', 'Road Private Car',
        'Public Passenger Services', 'Rail', 'Domestic Aviation', 'International Aviation',
        'Fuel Tourism', 'Navigation', 'Unspecified'];
    var industryTypes = ['Non - Energy Mining', 'Food & beverages', 'Textiles and textile products',
        'Wood and wood products', 'Pulp, paper, publishing and printing', 'Chemicals & man - made fibres',
        'Rubber and plastic products', 'Other non - metallic mineral products',
        'Basic metals and fabricated metal products', 'Machinery and equipment n.e.c.',
        'Electrical and optical equipment', 'Transport equipment manufacture', 'Other manufacturing'];
    var servicesTypes = ['Commercial Services', 'Public Services'];
    var agriFishTypes = ['Agricultural', 'Fisheries'];

    d.forEach(seperateConsumerTypes);
    return domainColors

    function seperateConsumerTypes(d) {
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
}

// get domain colors lis for fuel pie chart outers based on sub type
function getFuelDomainColors(d) {
    var coalDomain = [];
    var peatDomain = [];
    var oilDomain = [];
    var natgasDomain = [];
    var ReDomain = [];
    var nonRwWasteDomain = [];
    var elecDomain = [];
    var oilFuelIndex = 0;
    var renewFuelIndex = 0;
    var coalFuelIndex = 0;
    var peatFuelIndex = 0;
    var domainColors = [];
    var oilColorScale = ['#4eb1ab', '#5fb9b3', '#71c1bb', '#95d0cc',
        '#83c9c4', '#a6d8d5', '#b8e0dd', '#cae8e6', '#dcefee', '#edf7f7', '#ffffff'];
    var renewColorScale = ['#cbcb01', '#e4e401', '#fefe01', '#fefe1b',
        '#fefe34', '#fefe4d', '#fefe67', '#fefe80', '#fefe9a'];
    var coalColorScale = ['#ffc14d', '#ffc966', '#ffd280', '#ffdb99',
        '#ffe4b3', '#ffedcc'];
    var peatColorScale = ['#ee622b', '#f07342', '#f2855a', '#f49671',
        '#f5a889', '#f7b9a1', '#f9cbb8', '#fbdcd0'];
    var coalTypes = ["BituminousCoal", "Anthracite+ManufacturedOvoids", "Coke",
        "Lignite\\BrownCoalBriquettes"];
    var peatTypes = ["MilledPeat", "SodPeat", "Briquettes"];
    var oilTypes = ["Crude", "RefineryGas", "Gasoline", "Kerosene", "JetKerosene",
        "Fueloil", "LPG", "Gasoil/Diesel/DERV", "PetroleumCoke", "Naphta"];
    var natgasTypes = ['Nat.Gas'];
    var ReTypes = ["Hydro", "Wind", "Biomass&RenewableWaste", "LandfillGas", "Biogas",
        "LiquidBiofuel", "Solar", "Geothermal"];
    var nonRwWasteTypes = ["Non-RenewableWaste"];
    var elecTypes = ["Electricity"];

    d.forEach(seperateFuelTypes);
    return domainColors

    function seperateFuelTypes(d) {
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

}



