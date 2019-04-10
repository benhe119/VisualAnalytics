// ======= Global variable declaration =======
var
    // ScalePack of packets for link dimension
    scalePackets,
    colorScalePackets,
    // NumberSentPackets key: [source]  value : total n° of packets
    NumberSentPackets = new Map(),
    // NumberDeliveredPackets key: [target]  value : total n° of packets
    NumberDeliveredPackets = new Map(),
    // transferedPackets key: [source+target]  value : total n° of packets
    transferPackets = new Map(),
    //SVG width and height
    width = 950,
    height = 805;
var data;
var step = 0;
var attackDay1 = new Map();
var attackDay2 = new Map();
var attackDay3 = new Map();
var attackDay4 = new Map();
var extents;
// ======= Fine Global variable declaration=======
// extraction of the dataset from the file
d3.json("miserables.json", function (error, datas) {
    if (error) throw error;
    data = datas;
    // building the map packet
    buildMapPacket(data.links);
    // building the scale packet
    scalePacket();
    drawData();
});

function drawData() {

    // ========================= SLIDERS ===================================
    var marginSlider = {top: 0, right: 30, bottom: 0, left: 30},
        widthSlider = 302 - marginSlider.left - marginSlider.right,
        heightSlider = 65 - marginSlider.bottom - marginSlider.top;
    var formatDate = d3.timeFormat('%H:%M');

    // ================= SLIDER 1 GIORNO 4/7/2017 =========================
    var timeScale1 = d3.scaleTime()
        .domain([new Date(moment("07/04/2017 00:00", 'MMDDYYYY HH:mm')), new Date(moment("07/04/2017 23:59", 'MMDDYYYY HH:mm'))])
        .range([0, widthSlider])
        .nice(d3.timeDay)
        .clamp(true);
    var svgSlider1 = d3.select("#controller1").append("svg")
        .attr("width", widthSlider + marginSlider.left + marginSlider.right)
        .attr("height", heightSlider + marginSlider.top + marginSlider.bottom)
        .attr("id", "svgcontroller1")
        .append("g")
        // classic transform to position g
        .attr("transform", "translate(" + marginSlider.left + "," + marginSlider.top + ")");
    svgSlider1.append("rect")
        .style("pointer-events", "all")
        .style("fill", "none")
        .attr("width", widthSlider)
        .attr("height", heightSlider)
        .style("cursor", "crosshair");
    svgSlider1.append("g")
        .attr("class", "x axis")
        // put in middle of screen
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        // inroduce axis
        .call(d3.axisBottom()
            .scale(timeScale1)
            .tickFormat(function (d) {
                return formatDate(d);
            })
            .ticks(12)
            .tickSize(8)
            .tickPadding(13))
        .select(".domain")
        .select(function () {
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "halo");
    var brush1 = d3.brushX()
        .extent([[0, 0], [widthSlider, heightSlider]])
        .on("start brush end", update);
    svgSlider1.append("g")
        .attr("class", "brush1")
        .style("opacity", "0")
        .call(brush1);
    var handle1 = svgSlider1.append("g")
        .attr("class", "handle");
    handle1.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text1 = handle1.append('text')
        .text(formatDate(timeScale1.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    var handle2 = svgSlider1.append("g")
        .attr("class", "handle");
    handle2.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text2 = handle2.append('text')
        .text(formatDate(timeScale1.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    handle1.attr('transform', 'translate(0,0)');
    handle2.attr('transform', 'translate(' + widthSlider + ",0)");
    // ================= FINE SLIDER GIORNO 4/7/2017 =========================
    // ====================== SLIDER GIORNO 5/7/2017 =========================
    var timeScale2 = d3.scaleTime()
        .domain([new Date(moment("07/05/2017 00:00", 'MMDDYYYY HH:mm')), new Date(moment("07/05/2017 23:59", 'MMDDYYYY HH:mm'))])
        .range([0, widthSlider])
        .nice(d3.timeDay)
        .clamp(true);
    var svgSlider2 = d3.select("#controller2").append("svg")
        .attr("width", widthSlider + marginSlider.left + marginSlider.right)
        .attr("height", heightSlider + marginSlider.top + marginSlider.bottom)
        .attr("id", "svgcontroller2")
        .append("g")
        // classic transform to position g
        .attr("transform", "translate(" + marginSlider.left + "," + marginSlider.top + ")");
    svgSlider2.append("rect")
        .style("pointer-events", "all")
        .style("fill", "none")
        .attr("width", widthSlider)
        .attr("height", heightSlider)
        .style("cursor", "crosshair");
    svgSlider2.append("g")
        .attr("class", "x axis")
        // put in middle of screen
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        // inroduce axis
        .call(d3.axisBottom()
            .scale(timeScale2)
            .tickFormat(function (d) {
                return formatDate(d);
            })
            .ticks(12)
            .tickSize(8)
            .tickPadding(13))
        .select(".domain")
        .select(function () {
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "halo");
    var brush2 = d3.brushX()
        .extent([[0, 0], [widthSlider, heightSlider]])
        .on("start brush end", update);
    svgSlider2.append("g")
        .attr("class", "brush2")
        .style("opacity", "0")
        .call(brush2);
    var handle3 = svgSlider2.append("g")
        .attr("class", "handle");
    handle3.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text3 = handle3.append('text')
        .text(formatDate(timeScale2.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    var handle4 = svgSlider2.append("g")
        .attr("class", "handle");
    handle4.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text4 = handle4.append('text')
        .text(formatDate(timeScale2.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    handle3.attr('transform', 'translate(0,0)');
    handle4.attr('transform', 'translate(' + widthSlider + ",0)");
    // ================= FINE SLIDER GIORNO 5/7/2017 =========================
    // ====================== SLIDER GIORNO 6/7/2017 =========================
    var timeScale3 = d3.scaleTime()
        .domain([new Date(moment("07/06/2017 00:00", 'MMDDYYYY HH:mm')), new Date(moment("07/06/2017 23:59", 'MMDDYYYY HH:mm'))])
        .range([0, widthSlider])
        .nice(d3.timeDay)
        .clamp(true);
    var svgSlider3 = d3.select("#controller3").append("svg")
        .attr("width", widthSlider + marginSlider.left + marginSlider.right)
        .attr("height", heightSlider + marginSlider.top + marginSlider.bottom)
        .attr("id", "svgcontroller3")
        .append("g")
        // classic transform to position g
        .attr("transform", "translate(" + marginSlider.left + "," + marginSlider.top + ")");
    svgSlider3.append("rect")
        .style("pointer-events", "all")
        .style("fill", "none")
        .attr("width", widthSlider)
        .attr("height", heightSlider)
        .style("cursor", "crosshair");
    svgSlider3.append("g")
        .attr("class", "x axis")
        // put in middle of screen
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        // inroduce axis
        .call(d3.axisBottom()
            .scale(timeScale3)
            .tickFormat(function (d) {
                return formatDate(d);
            })
            .ticks(12)
            .tickSize(8)
            .tickPadding(13))
        .select(".domain")
        .select(function () {
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "halo");
    var brush3 = d3.brushX()
        .extent([[0, 0], [widthSlider, heightSlider]])
        .on("start brush end", update);
    svgSlider3.append("g")
        .attr("class", "brush3")
        .style("opacity", "0")
        .call(brush3);
    var handle5 = svgSlider3.append("g")
        .attr("class", "handle");
    handle5.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text5 = handle5.append('text')
        .text(formatDate(timeScale3.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    var handle6 = svgSlider3.append("g")
        .attr("class", "handle");
    handle6.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text6 = handle6.append('text')
        .text(formatDate(timeScale3.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    handle5.attr('transform', 'translate(0,0)');
    handle6.attr('transform', 'translate(' + widthSlider + ",0)");
    // ================= FINE SLIDER GIORNO 6/7/2017 =========================
    // ====================== SLIDER GIORNO 7/7/2017 =========================
    var timeScale4 = d3.scaleTime()
        .domain([new Date(moment("07/07/2017 00:00", 'MMDDYYYY HH:mm')), new Date(moment("07/07/2017 23:59", 'MMDDYYYY HH:mm'))])
        .range([0, widthSlider])
        .nice(d3.timeDay)
        .clamp(true);
    var svgSlider4 = d3.select("#controller4").append("svg")
        .attr("width", widthSlider + marginSlider.left + marginSlider.right)
        .attr("height", heightSlider + marginSlider.top + marginSlider.bottom)
        .attr("id", "svgcontroller4")
        .append("g")
        // classic transform to position g
        .attr("transform", "translate(" + marginSlider.left + "," + marginSlider.top + ")");
    svgSlider4.append("rect")
        .style("pointer-events", "all")
        .style("fill", "none")
        .attr("width", widthSlider)
        .attr("height", heightSlider)
        .style("cursor", "crosshair");
    svgSlider4.append("g")
        .attr("class", "x axis")
        // put in middle of screen
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        // inroduce axis
        .call(d3.axisBottom()
            .scale(timeScale4)
            .tickFormat(function (d) {
                return formatDate(d);
            })
            .ticks(12)
            .tickSize(8)
            .tickPadding(13))
        .select(".domain")
        .select(function () {
            return this.parentNode.appendChild(this.cloneNode(true));
        })
        .attr("class", "halo");
    var brush4 = d3.brushX()
        .extent([[0, 0], [widthSlider, heightSlider]])
        .on("start brush end", update);
    svgSlider4.append("g")
        .attr("class", "brush4")
        .style("opacity", "0")
        .call(brush4);
    var handle7 = svgSlider4.append("g")
        .attr("class", "handle");
    handle7.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text7 = handle7.append('text')
        .text(formatDate(timeScale4.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    var handle8 = svgSlider4.append("g")
        .attr("class", "handle");
    handle8.append("path")
        .attr("transform", "translate(0," + heightSlider / 2 + ")")
        .attr("d", "M 0 -20 V 20");
    var text8 = handle8.append('text')
        .text(formatDate(timeScale4.domain()[0]))
        .attr("transform", "translate(" + (-18) + " ," + (heightSlider / 2 - 22) + ")");
    handle7.attr('transform', 'translate(0,0)');
    handle8.attr('transform', 'translate(' + widthSlider + ",0)");
    // ================= FINE SLIDER GIORNO 7/7/2017 =======================
    // =========================FINE SLIDERS ===================================
    // =============================INIT INFO N ATTACK ============================
    day1 = data.links.filter(function (d) {
        return d.Timestamp.slice(0, -6) === "4/7/2017"
    });
    day2 = data.links.filter(function (d) {
        return d.Timestamp.slice(0, -6) === "5/7/2017"
    });
    day3 = data.links.filter(function (d) {
        return d.Timestamp.slice(0, -6) === "6/7/2017"
    });
    day4 = data.links.filter(function (d) {
        return d.Timestamp.slice(0, -6) === "7/7/2017"
    });

    d3.select("#day1").html(day1.length + " / <b>" + day1.length + "</b>");
    d3.select("#day2").html(day2.length + " / <b>" + day2.length + "</b>");
    d3.select("#day3").html(day3.length + " / <b>" + day3.length + "</b>");
    d3.select("#day4").html(day4.length + " / <b>" + day4.length + "</b>");
    //====================================== BAR CHART =============================
    var widthBar = 200;
    var heightBar = 20;
    var svgWidthBar = 300;
    var svgHeightBar = 100;
    var tooltipBar;
    //==================================FINE BAR CHART =============================
    // ========================== DRAWING GRAPH ================================
    var edges = [],
        nodeSelected = new Set();
    var widthGRAPH = 730,
        heightGRAPH = 500;
    // create the svg on
    var svgGRAPH = d3.select("#graph").append("svg")
        .attr("width", widthGRAPH)
        .attr("height", heightGRAPH);
    var tooltipLink,  // FINESTRA SU LINK
        tooltipNode,  // FINESTRA SU NODI
        node,
        link,
        textElements;
    var simulation = d3.forceSimulation(data.nodes)
        .force('forceX', d3.forceX(function (d) {
            if (d.id === "205.174.165.73sx")
                return 500;
            if (d.id === "205.174.165.73dx")
                return 500;
            if (d.group === '1')
                return 250;
            if (d.group === '2')
                return 750;
        }).strength(1))
        .force("forceY", d3.forceY((d => (d.id === '205.174.165.73sx' || d.id === '205.174.165.73dx') ? 1 : 0)).strength(0.0011))
        .force('collision', d3.forceCollide().radius((d => (d.id === '205.174.165.73sx' || d.id === '205.174.165.73dx') ? 0 : 21)))
        .force("charge", d3.forceManyBody().strength((d => (d.id === '205.174.165.73sx' || d.id === '205.174.165.73dx') ? 5 : 0)).distanceMin(1).distanceMax(800))
        .force('center', d3.forceCenter(widthGRAPH / 2, heightGRAPH / 2))
        .force("link", d3.forceLink().distance(800).strength(0).id(function (d) {
            return d.id;
        }))
        .alphaTarget(0).on("tick", ticked);

    simulation.nodes(data.nodes).on("tick", ticked);
    // ==================FINE DICHIARAZIONI GRAPH =============================
    // ===================== DICHIARAZIONI LEGEND =============================
    var heightLegend = 500,
        widthLegend = 80,
        marginLegend = {top: 20, right: 60, bottom: 20, left: 2},
        canvas,
        ctx,
        legendscale,
        image,
        legendaxis,
        svgLegend,
        c,
        brushLegend;
    // ==============  FINE DICHIARAZIONI LEGEND ==============================
    // ================= DICHIARAZIONI CPA ====================================
    var marginCPA = {top: 30, right: 0, bottom: 10, left: 0},
        widthCPA = 1090 - marginCPA.left - marginCPA.right,
        heightCPA = 500 - marginCPA.top - marginCPA.bottom;
    var x = d3.scaleBand().rangeRound([-10, widthCPA + 80]).padding(.1),
        y = {},
        dragging = {},
        line = d3.line(),
        Range = [];
    var svgCPA;
    for (var i = 0; i <= heightCPA * 20; i = i + 20) {
        Range.push(i);
    }

    // ================= FINE DICHIARAZIONI CPA ==================================

    function initGraph() {

        //declaration of the tooltipLink (extra info on over)
        tooltipLink = d3.select('body').append('div')
            .style('display', "none")
            .attr('class', 'd3-tip');

        tooltipNode = d3.select('body').append('div')
            .style('display', "none")
            .attr('class', 'd3-tip');

        //declaration of the link of the network
        link = svgGRAPH.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .enter().append("line")
            .on('mousemove', function (d) {
                tooltipLink.transition().duration(150)
                    .style('display', "block");
                tooltipLink.html(contentLinkTip(d))
                    .style('left', (d3.event.pageX + 50) + 'px')
                    .style('top', (d3.event.pageY) + 'px');
                handleMouseMoveEdge(d);
                handleFocusStrokeOnEdge(d);
            })
            .on('mouseout', function () {
                tooltipLink.transition().duration(150)
                    .style('display', "none");
                handleMouseOutEdge();
                handleOutFocusStroke();
            })
            .attr("stroke-width", function (d) {
                return scalePackets(transferPackets.get(d.source + d.target));
            })
            .attr("display", function (d) {
                if (edges.findIndex(x => (x.source == d.source && x.target == d.target)) <= -1) {
                    edges.push(d);
                    return "block";
                } else {
                    return "none";
                }
            });

        // declaration of the node of the network
        node = svgGRAPH.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(data.nodes)
            .enter().append("circle")
            .attr("r", (d => (d.id === '205.174.165.73sx') ? 30 : 14))
            .style("fill", function (d) {
                if (d.group === "1")
                    if (colorScalePackets(NumberSentPackets.get(d.id)) != null)
                        return colorScalePackets(NumberSentPackets.get(d.id));
                    else
                        return colorScalePackets(0);
                if (d.group === "2")
                    if (colorScalePackets(NumberDeliveredPackets.get(d.id)) != null)
                        return colorScalePackets(NumberDeliveredPackets.get(d.id));
                    else
                        return colorScalePackets(0);
            }).on("click", function () {
                d3.select(this).transition().duration(200).style("stroke", "red");
                nodeSelected.add(d3.select(this)._groups[0][0].__data__.id);
                handleSelectedNode(nodeSelected);
                FocusDotScatterPlot(nodeSelected);
            })
            .on('dblclick', function () {
                d3.select(this).transition().duration(200).style("stroke", "none");
                nodeSelected.delete(d3.select(this)._groups[0][0].__data__.id);
                handleSelectedNode(nodeSelected);
                FocusDotScatterPlot(nodeSelected);
            })
            .on('mouseover', function (d) {
                handleMouseOverNode(d3.select(this));
                tooltipNode.transition().duration(150)
                    .style('display', "block");
                tooltipNode.html(contentNodeTip(d))
                    .style('left', (d3.event.pageX + 50) + 'px')
                    .style('top', (d3.event.pageY) + 'px');
            })
            .on('mouseout', function () {
                tooltipNode.transition().duration(150)
                    .style('display', "none");
                handleMouseOutNode();
                handleOutFocusStroke();
            });

        //declaration of the text (ip) of the node
        textElements = svgGRAPH.append("g")
            .attr("class", "texts")
            .selectAll("text")
            .data(data.nodes)
            .enter().append("text")
            .text(function (node) {
                if (node.id === "205.174.165.73sx")
                    return "";
                return node.id.slice(0, -2)
            })
            .attr("font-size", 15)
            .attr("text-anchor", function (d) {
                if (d.id === "205.174.165.73dx")
                    return "middle";
                else {
                    if (d.group == "1") return "end"; else return "start";
                }
            })
            // riflette gli indirizzi IP a destra e sinistra
            .attr("dx", function (d) {
                if (d.group == "1") return -25; else return 25;
            })
            .attr("dy", function (d) {
                if (d.id === "205.174.165.73dx") return -38; else return 5;
            });

        // starting the simulation
        simulation
            .nodes(data.nodes);

        simulation.force("link")
            .links(data.links);
    }

    initGraph();

    // ======================== SCATTERPLOT ===============================
    var marginScatterPlot = {top: 20, right: 20, bottom: 20, left: 70},
        widthScatterPlot = 1185 - marginScatterPlot.left - marginScatterPlot.right,
        heightScatterPlot = 450 - marginScatterPlot.top - marginScatterPlot.bottom,
        PortsSource = new Map(),
        PortsDestination = new Map(),
        xScatterPlot,
        yScatterPlot,
        xAxisScatterPlot,
        yAxisScatterPlot,
        svgScatterPlot,
        legendScatterPlot,
        IPAddress = new Set();
    // ============================= Fine DICHIARAZIONE SCATTERPLOT =========
    d3.selectAll(".custom-control-input").on("change", update);
    update();

    function update() {
        var checkedValue = [];
        d3.selectAll('.custom-control-input').each(function () {
            cb = d3.select(this);
            if (cb.property("checked")) {
                checkedValue.push(cb.property("value"));
            }
        });
        if (checkedValue.length === 0) {
            newData = data.links;
        }

        selection1 = d3.brushSelection(d3.select(".brush1").node());
        if (selection1 == null)
            selection1 = [0, widthSlider - 0.2];
        selection2 = d3.brushSelection(d3.select(".brush2").node());
        if (selection2 == null)
            selection2 = [0, widthSlider - 0.2];
        selection3 = d3.brushSelection(d3.select(".brush3").node());
        if (selection3 == null)
            selection3 = [0, widthSlider - 0.2];
        selection4 = d3.brushSelection(d3.select(".brush4").node());
        if (selection4 == null)
            selection4 = [0, widthSlider - 0.2];

        // EVENT LISTENER SLIDER 1 DATA 4/7/2017
        if (checkedValue.includes("4/7/2017")) {
            handle1.attr('transform', 'translate(' + selection1[0] + ",0)");
            text1.text(formatDate(timeScale1.invert(selection1[0])));
            handle2.attr('transform', 'translate(' + selection1[1] + ",0)");
            text2.text(formatDate(timeScale1.invert(selection1[1])));
        }
        // EVENT LISTENER SLIDER 2 DATA 5/7/2017
        if (checkedValue.includes("5/7/2017")) {
            handle3.attr('transform', 'translate(' + selection2[0] + ",0)");
            text3.text(formatDate(timeScale1.invert(selection2[0])));
            handle4.attr('transform', 'translate(' + selection2[1] + ",0)");
            text4.text(formatDate(timeScale1.invert(selection2[1])));
        }
        // EVENT LISTENER SLIDER 3 DATA 5/7/2017
        if (checkedValue.includes("6/7/2017")) {
            handle5.attr('transform', 'translate(' + selection3[0] + ",0)");
            text5.text(formatDate(timeScale1.invert(selection3[0])));
            handle6.attr('transform', 'translate(' + selection3[1] + ",0)");
            text6.text(formatDate(timeScale1.invert(selection3[1])));
        }
        // EVENT LISTENER SLIDER 4 DATA 7/7/2017
        if (checkedValue.includes("7/7/2017")) {
            handle7.attr('transform', 'translate(' + selection4[0] + ",0)");
            text7.text(formatDate(timeScale4.invert(selection4[0])));
            handle8.attr('transform', 'translate(' + selection4[1] + ",0)");
            text8.text(formatDate(timeScale4.invert(selection4[1])));
        }

        // filtraggio dei dati in base ai giorno e all'ora
        newData = data.links.filter(function (d) {
            return checkedValue.includes(d.Timestamp.slice(0, -6)) && ((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm'))) >= timeScale1.invert(selection1[0]) && ((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm')))) <= timeScale1.invert(selection1[1]))
                || checkedValue.includes(d.Timestamp.slice(0, -6)) && (((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm'))) >= (timeScale2.invert(selection2[0]))) && ((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm'))) <= (timeScale2.invert(selection2[1]))))
                || checkedValue.includes(d.Timestamp.slice(0, -6)) && (((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm'))) >= (timeScale3.invert(selection3[0]))) && ((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm'))) <= (timeScale3.invert(selection3[1]))))
                || checkedValue.includes(d.Timestamp.slice(0, -6)) && (((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm'))) >= (timeScale4.invert(selection4[0]))) && ((new Date(moment(d.Timestamp, 'DDMMYYYY HH:mm').format('MM/DD/YYYY HH:mm'))) <= (timeScale4.invert(selection4[1]))));
        });


        // se non è lo step iniziale eseguo queste funzioni
        if (step === 1) {
            buildMapPacket(newData);
            scalePacket(NumberDeliveredPackets);
            updateGraph(newData);
        }

        step = 1;
        updateNumberOfAttack(newData);
        updateLegend();
        updateCPA(newData);
        updateScatterPlot(newData);
        attackPackets(newData);
        updateChartDay1();
        updateChartDay2();
        updateChartDay3();
        updateChartDay4();

        handleSelectedNode(nodeSelected);
        FocusDotScatterPlot(nodeSelected);

        function updateGraph(newData) {
            var edges = [];

            d3.selectAll(".d3-tip").remove();

            //declaration of the tooltipLink (extra info on over)
            tooltipLink = d3.select('body').append('div')
                .style('display', "none")
                .attr('class', 'd3-tip');

            tooltipNode = d3.select('body').append('div')
                .style('display', "none")
                .attr('class', 'd3-tip');

            node = node.data(data.nodes, function (d) {
                return d.id;
            });

            node = node.data(data.nodes, function (d) {
                return d.id;
            });
            node.exit().remove();
            node = node.enter().append("circle").merge(node)
                .attr("r", (d => (d.id === '205.174.165.73sx') ? 30 : 14))
                .style("fill", function (d) {
                    if (d.group === "1")
                        if (colorScalePackets(NumberSentPackets.get(d.id)) != null)
                            return colorScalePackets(NumberSentPackets.get(d.id));
                        else
                            return colorScalePackets(0);
                    if (d.group === "2")
                        if (colorScalePackets(NumberDeliveredPackets.get(d.id)) != null)
                            return colorScalePackets(NumberDeliveredPackets.get(d.id));
                        else
                            return colorScalePackets(0);
                }).on("click", function () {
                    d3.select(this).transition().duration(200).style("stroke", "red");
                    nodeSelected.add(d3.select(this)._groups[0][0].__data__.id);
                    handleSelectedNode(nodeSelected);
                    FocusDotScatterPlot(nodeSelected);
                })
                .on('dblclick', function () {
                    d3.select(this).transition().duration(200).style("stroke", "none");
                    nodeSelected.delete(d3.select(this)._groups[0][0].__data__.id);
                    handleSelectedNode(nodeSelected);
                    FocusDotScatterPlot(nodeSelected);
                })
                .on('mouseover', function (d) {
                    handleMouseOverNode(d3.select(this));
                    tooltipNode.transition().duration(150)
                        .style('display', "block");
                    tooltipNode.html(contentNodeTip(d))
                        .style('left', (d3.event.pageX + 50) + 'px')
                        .style('top', (d3.event.pageY) + 'px');
                })
                .on('mouseout', function () {
                    tooltipNode.transition().duration(150)
                        .style('display', "none");
                    handleMouseOutNode();
                    handleOutFocusStroke();
                    if (!brushEmpty())
                        brush_parallel_chart();
                });

            textElements = textElements.data(data.nodes, function (d) {
                return d.id
            });
            textElements.exit().remove();
            textElements = textElements.enter().append("text").merge(textElements);

            link = link.data(newData, function (d) {
                return d.source.id + "-" + d.target.id;
            });
            link.exit().remove();
            link = link.enter().append("line").merge(link)
                .on('mousemove', function (d) {
                    tooltipLink.transition().duration(150)
                        .style('opacity', 1);
                    tooltipLink.html(contentLinkTip(d))
                        .style('left', (d3.event.pageX + 50) + 'px')
                        .style('top', (d3.event.pageY) + 'px');
                    handleMouseMoveEdge(d);
                })
                .on('mouseout', function () {
                    tooltipLink.transition().duration(150)
                        .style('opacity', 0);
                    handleMouseOutEdge();
                    handleOutFocusStroke();
                    if (!brushEmpty())
                        brush_parallel_chart()
                })
                .attr("stroke-width", function (d) {
                    return scalePackets(transferPackets.get(d.source.id + d.target.id));
                })
                .attr("display", function (d) {
                    if (edges.findIndex(x => (x.source === d.source && x.target === d.target)) <= -1) {
                        edges.push(d);
                        return "block";
                    } else {
                        return "none";
                    }
                });

            // starting the simulation
            simulation.nodes(data.nodes);
            simulation.force("link").links(newData);
            simulation.alpha(0).restart();
        }

        function updateLegend() {
            d3.selectAll(".legendScale").remove();
            d3.selectAll(".canvas").remove();

            canvas = d3.select("#legend")
                .style("height", heightLegend + "px")
                .style("width", widthLegend + "px")
                .style("position", "relative")
                .append("canvas")
                .attr("height", heightLegend - marginLegend.top - marginLegend.bottom)
                .attr("width", 1)
                .attr("class", "canvas")
                .style("height", (heightLegend - marginLegend.top - marginLegend.bottom) + "px")
                .style("width", (widthLegend - marginLegend.left - marginLegend.right) + "px")
                .style("border", "1px solid #000")
                .style("position", "absolute")
                .style("top", "20px")
                .style("left", "30px")
                .node();

            ctx = canvas.getContext("2d");
            legendscale = d3.scaleLinear()
                .range([1, heightLegend - marginLegend.top - marginLegend.bottom])
                .domain(colorScalePackets.domain());

            image = ctx.createImageData(1, heightLegend);
            d3.range(heightLegend).forEach(function (i) {
                c = d3.rgb(colorScalePackets(legendscale.invert(i)));
                image.data[4 * i] = c.r;
                image.data[4 * i + 1] = c.g;
                image.data[4 * i + 2] = c.b;
                image.data[4 * i + 3] = 255;
            });
            ctx.putImageData(image, 0, 0);

            legendaxis = d3.axisRight()
                .scale(legendscale)
                .tickSize(5)
                .ticks(15);

            svgLegend = d3.select("#legend")
                .append("svg")
                .attr("class", "legendScale")
                .attr("height", (heightLegend) + "px")
                .attr("width", (widthLegend) + "px")
                .style("position", "absolute")
                .style("left", "30px")
                .style("top", "0px");


            brushLegend = d3.brushY()
                .extent([[0, 0], [widthLegend - marginLegend.left - marginLegend.right, heightLegend - marginLegend.top - 20]])
                .on("start brush end", filterView);

            svgLegend.append("g")
                .attr("class", "brushLegend")
                .attr("transform", "translate(" + (0) + "," + (marginLegend.top) + ")")
                .call(brushLegend);

            svgLegend
                .append("g")
                .attr("transform", "translate(" + (widthLegend - marginLegend.left - marginLegend.right + 3) + "," + (marginLegend.top) + ")")
                .attr("class", "y axis")
                .call(legendaxis);
        }

        function updateNumberOfAttack(data) {
            UPday1 = data.filter(function (d) {
                return d.Timestamp.slice(0, -6) === "4/7/2017"
            });
            UPday2 = data.filter(function (d) {
                return d.Timestamp.slice(0, -6) === "5/7/2017"
            });
            UPday3 = data.filter(function (d) {
                return d.Timestamp.slice(0, -6) === "6/7/2017"
            });
            UPday4 = data.filter(function (d) {
                return d.Timestamp.slice(0, -6) === "7/7/2017"
            });

            // UPDATE number of attack per day
            d3.select("#day1").html(UPday1.length + " / <b>" + day1.length + "</b>");
            d3.select("#day2").html(UPday2.length + " / <b>" + day2.length + "</b>");
            d3.select("#day3").html(UPday3.length + " / <b>" + day3.length + "</b>");
            d3.select("#day4").html(UPday4.length + " / <b>" + day4.length + "</b>");
        }

        function updateCPA() {
            //===== remove the previous data=========
            d3.selectAll(".cpa").remove();
            // =============== update the cpa ==================

            svgCPA = d3.select("#PCA").append("svg")
                .attr("class", "cpa")
                .attr("width", widthCPA)
                .attr("height", heightCPA + marginCPA.top + marginCPA.bottom)
                .append("g")
                .attr("transform", "translate(" + 70 + "," + 28 + ")");

            // prendere i dati da un json senza duplicati
            var SourcePort = [];
            var TargetPort = [];
            var SourceIP = [];
            var TargetIP = [];
            var TotalFwdPackets = [];
            var TotalLenghtOfFwdPackets = [];
            var Label = [];
            for (var i = 0; i < newData.length; i++) {
                SourceIP.push(newData[i].source.id.slice(0, -2));
                TargetIP.push(newData[i].target.id.slice(0, -2));
                SourcePort.push(newData[i].SourcePort);
                SourcePort.push(newData[i].SourcePort);
                TargetPort.push(newData[i].DestinationPort);
                TotalFwdPackets.push(newData[i].TotalFwdPackets);
                TotalLenghtOfFwdPackets.push(newData[i].TotalLenghtOfFwdPackets);
                Label.push(newData[i].Label);
            }
            SourceIP.sort(function (a, b) {
                return a - b;
            });
            SourcePort.sort(function (a, b) {
                return a - b;
            });
            TargetIP.sort(function (a, b) {
                return a - b;
            });
            TargetPort.sort(function (a, b) {
                return a - b;
            });
            TotalFwdPackets.sort(function (a, b) {
                return a - b;
            });
            TotalLenghtOfFwdPackets.sort(function (a, b) {
                return a - b;
            });
            Label.sort(function (a, b) {
                return a - b;
            });

            x.domain(dimensions = d3.keys(newData[0]).filter(function (d) {
                if ((d == "id") || (d == "index") || (d == "Timestamp") || (d == "Protocol") || (d == "FlowDuration") || (d == "TotalBackwardPackets") || (d == "TotalLenghtOfBwdPackets")) {
                    return false;
                }
                return y[d] = d3.scalePoint().domain(value(d)).range([0, heightCPA]);
            }));

            extents = dimensions.map(function () {
                return [0, 0];
            });

            function value(d) {
                switch (d) {
                    case "source":
                        return SourceIP;
                    case "SourcePort":
                        return SourcePort;
                    case "target":
                        return TargetIP;
                    case "DestinationPort":
                        return TargetPort;
                    case "TotalFwdPackets":
                        return TotalFwdPackets;
                    case "TotalLenghtOfFwdPackets":
                        return TotalLenghtOfFwdPackets;
                    case "Label":
                        return Label;
                }
            }

            // Add grey background lines for context.
            background = svgCPA.append("g")
                .attr("class", "background")
                .selectAll("path")
                .data(newData)
                .enter().append("path")
                .attr("class", "backpath")
                .attr("d", path);

            // Add blue unselected lines
            notSelected = svgCPA.append("g")
                .attr("class", "notEvidence")
                .selectAll("path")
                .data(newData)
                .enter().append("path")
                .attr("class", "notSelected")
                .attr("d", path)
                .on('mouseover', function () {
                    handleFocusStroke(d3.select(this)._groups[0][0].__data__);
                })
                .on('mouseout', function () {
                    d3.select(this).transition().duration(100).style("stroke-width", "1px");
                    handleOutFocusStroke();
                    handleMouseOutEdge();
                    if (!brushEmpty())
                        brush_parallel_chart()
                });
            //add red selected lines for focus
            selected = svgCPA.append("g")
                .attr("class", "evidence")
                .selectAll("path")
                .data(newData)
                .enter().append("path")
                .attr("class", "selected")
                .attr("d", path)
                .on('mouseover', function () {
                    handleFocusStroke(d3.select(this)._groups[0][0].__data__);
                })
                .on('mouseout', function () {
                    handleOutFocusStroke();
                    handleMouseOutEdge();
                    if (!brushEmpty())
                        brush_parallel_chart()
                });

            // Add a group element for each dimension.
            var g = svgCPA.selectAll(".dimension")
                .data(dimensions)
                .enter().append("g")
                .attr("class", "dimension")
                .attr("transform", function (d) {
                    return "translate(" + x(d) + ")";
                })
                .call(d3.drag()
                    .subject(function (d) {
                        return {x: x(d)};
                    })
                    .on("start", function (d) {
                        dragging[d] = x(d);
                        background.attr("visibility", "hidden");
                    })
                    .on("drag", function (d) {
                        dragging[d] = Math.min(widthCPA, Math.max(0, d3.event.x));
                        selected.attr("d", path);
                        notSelected.attr("d", path);
                        dimensions.sort(function (a, b) {
                            return position(a) - position(b);
                        });
                        x.domain(dimensions);
                        g.attr("transform", function (d) {
                            return "translate(" + position(d) + ")";
                        })
                    })
                    .on("end", function (d) {
                        delete dragging[d];
                        transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                        transition(selected).attr("d", path);
                        transition(notSelected).attr("d", path);
                        background
                            .attr("d", path)
                            .transition()
                            .delay(500)
                            .duration(0)
                            .attr("visibility", null);
                    }));
            // Add an axis and title.
            g.append("g")
                .attr("class", "axis")
                .each(function (d) {
                    d3.select(this).call(d3.axisLeft(y[d])
                        .ticks(12)
                        .tickSize(9)
                        .tickPadding(7));
                })
                //text does not show up because previous line breaks somehow
                .append("text")
                .style("text-anchor", "middle")
                .attr("y", -12)
                .style("font-size", "13px")
                .text(function (d) {
                    return d;
                });

            // Add and store a brush for each axis.
            g.append("g")
                .attr("class", "brush")
                .each(function (d) {
                    d3.select(this).call(y[d].brush = d3.brushY().extent([[-8, 0], [8, height]]).on("brush start", brushstart).on("brush", brush_parallel_chart));
                })
                .selectAll("rect")
                .attr("x", -8)
                .attr("width", 16);

            function position(d) {
                var v = dragging[d];
                return v == null ? x(d) : v;
            }

            function transition(g) {
                return g.transition().duration(500);
            }

// Returns the path for a given prova point.
            function path(d) {
                return line(dimensions.map(function (p) {
                    if (p == "source" || p == "target")
                        return [position(p), y[p](d[p]["id"].slice(0, -2))];
                    return [position(p), y[p](d[p])];
                }));
            }

            function brushstart() {
                d3.event.sourceEvent.stopPropagation();
            }
        }

        function updateChartDay1() {
            d3.selectAll(".barday1").remove();
            var chartDay1;
            bindedDay1 = Array.from(attackDay1);
            xScaleDay1 = d3.scaleLinear().domain([0, d3.max((Array.from(attackDay1.values())))]).range([0, widthBar]);
            yScaleDay1 = d3.scaleBand()
                .range([svgHeightBar, 0])
                .domain(bindedDay1.map(function (d) {
                    return d[0];
                }))
                .padding(0.2);
            // SVG
            barDay1 = d3.select('#barchartDay1').append('svg')
                .attr("width", svgWidthBar).attr('height', svgHeightBar)
                .attr("class", "barday1");

            barLegenday1 = d3.axisTop()
                .scale(xScaleDay1)
                .tickPadding(8)
                .tickSize(5)
                .ticks(3);

            barDay1.append("g")
                .attr("class", "x axis")
                .call(barLegenday1)
                .attr('transform', 'translate(80,30)');

            // CHART AREA
            valsDay1 = barDay1.append('g').attr('transform', 'translate(60,0)')
                .attr('width', widthBar).attr("height", heightBar);

            tooltipBar = d3.select('body').append('div')
                .style('display', "none")
                .attr('class', 'd3-tip');

            // DATA BIND
            chartDay1 = valsDay1.selectAll('rect').data(bindedDay1);
            // ENTER
            chartDay1.enter().append('rect')
                .attr("width", function (d) {
                    return xScaleDay1(d[1]);
                })
                .attr("height", 10)
                .attr('x', 20).attr('y', function (d) {
                return yScaleDay1(d[0]) + 25;
            })
                .attr("fill", "#007BBF")
                .attr("width", function (d) {
                    return xScaleDay1(d[1])
                })
                .on('mousemove', function (d) {
                    tooltipBar.style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style('display', "block")
                        .html((d[0]) + ": " + (d[1]));
                })
                .on('mouseout', function () {
                    tooltipBar.style('display', "none");
                });

            // DATA BIND
            keyDay1 = valsDay1.selectAll('text.key').data(bindedDay1);
            // ENTER
            keyDay1.enter().append("text").attr("class", "key")
                .attr("x", 0)
                .attr("y", function (d) {
                    return yScaleDay1(d[0]) + 20;
                })
                .attr('dy', 16)
                .attr("text-anchor", "end")
                .text(function (d) {
                    return d[0];
                });

            // UPDATE
            keyDay1.text(function (d) {
                return d[0]
            });

        }

        function updateChartDay2() {
            d3.selectAll(".barday2").remove();
            var chartDay2;
            bindedDay2 = Array.from(attackDay2);
            xScaleDay2 = d3.scaleLinear().domain([0, d3.max((Array.from(attackDay2.values())))]).range([0, widthBar]);
            var yScaleDay2 = d3.scaleBand()
                .range([svgHeightBar, 0])
                .domain(bindedDay2.map(function (d) {
                    return d[0];
                }))
                .padding(0.2);
            // SVG
            var barDay2 = d3.select('#barchartDay2').append('svg')
                .attr("width", svgWidthBar).attr('height', svgHeightBar)
                .attr("class", "barday2");

            var barLegenday2 = d3.axisTop()
                .scale(xScaleDay2)
                .tickPadding(8)
                .tickSize(5)
                .ticks(3);

            barDay2.append("g")
                .attr("class", "x axis")
                .call(barLegenday2)
                .attr('transform', 'translate(80,30)');


            // CHART AREA
            var valsDay2 = barDay2.append('g').attr('transform', 'translate(60,0)')
                .attr('width', widthBar).attr("height", heightBar);

            tooltipBar = d3.select('body').append('div')
                .style('display', "none")
                .attr('class', 'd3-tip');

            // DATA BIND
            chartDay2 = valsDay2.selectAll('rect').data(bindedDay2);
            // ENTER
            chartDay2.enter().append('rect')
                .attr("width", function (d) {
                    return xScaleDay2(d[1]);
                })
                .attr("height", 10)
                .attr('x', 20).attr('y', function (d) {
                return yScaleDay2(d[0]) + 20;
            })
                .attr("fill", "#007BBF")
                .attr("width", function (d) {
                    return xScaleDay2(d[1])
                }).on('mousemove', function (d) {
                tooltipBar.style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style('display', "block")
                    .html((d[0]) + ": " + (d[1]));
            })
                .on('mouseout', function () {
                    tooltipBar.style('display', "none");
                });

            // DATA BIND
            var keyDay2 = valsDay2.selectAll('text.key').data(bindedDay2);
            // ENTER
            keyDay2.enter().append("text").attr("class", "key")
                .attr("x", 0)
                .attr("y", function (d) {
                    return yScaleDay2(d[0]) + 20;
                })
                .attr('dy', 16)
                .attr("text-anchor", "end")
                .text(function (d) {
                    return d[0];
                });

            // UPDATE
            keyDay1.text(function (d) {
                return d[0]
            });

        }

        function updateChartDay3() {
            d3.selectAll(".barday3").remove();
            var chartDay3;
            bindedDay3 = Array.from(attackDay3);
            xScaleDay3 = d3.scaleLinear().domain([0, d3.max((Array.from(attackDay3.values())))]).range([0, widthBar]);
            var yScaleDay3 = d3.scaleBand()
                .range([svgHeightBar, 0])
                .domain(bindedDay3.map(function (d) {
                    return d[0];
                }))
                .padding(0.2);
            // SVG
            var barDay3 = d3.select('#barchartDay3').append('svg')
                .attr("width", svgWidthBar).attr('height', svgHeightBar)
                .attr("class", "barday2");//.style('border','1px solid')

            barLegenday3 = d3.axisTop()
                .scale(xScaleDay3)
                .tickPadding(8)
                .tickSize(5)
                .ticks(3);

            barDay3.append("g")
                .attr("class", "x axis")
                .call(barLegenday3)
                .attr('transform', 'translate(80,30)');

            // CHART AREA
            valsDay3 = barDay3.append('g').attr('transform', 'translate(60,0)')
                .attr('width', widthBar).attr("height", heightBar);

            tooltipBar = d3.select('body').append('div')
                .style('display', "none")
                .attr('class', 'd3-tip');
            // DATA BIND
            chartDay3 = valsDay3.selectAll('rect').data(bindedDay3);
            // ENTER
            chartDay3.enter().append('rect')
                .attr("width", function (d) {
                    return xScaleDay3(d[1]);
                })
                .attr("height", 20)
                .attr('x', 10).attr('y', function (d) {
                return yScaleDay3(d[0]) + 20;
            })
                .attr("fill", "#007BBF")
                .attr("width", function (d) {
                    return xScaleDay3(d[1])
                })
                .on('mousemove', function (d) {
                    tooltipBar.style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style('display', "block")
                        .html((d[0]) + ": " + (d[1]));
                })
                .on('mouseout', function () {
                    tooltipBar.style('display', "none");
                });

            // DATA BIND
            var keyDay3 = valsDay3.selectAll('text.key').data(bindedDay3);
            // ENTER
            keyDay3.enter().append("text").attr("class", "key")
                .attr("x", 0)
                .attr("y", function (d) {
                    return yScaleDay3(d[0]) + 20;
                })
                .attr('dy', 16)
                .attr("text-anchor", "end")
                .text(function (d) {
                    return d[0];
                });

            // UPDATE
            keyDay3.text(function (d) {
                return d[0]
            });

        }

        function updateChartDay4() {
            d3.selectAll(".barday4").remove();
            bindedDay4 = Array.from(attackDay4);
            xScaleDay4 = d3.scaleLinear().domain([0, d3.max((Array.from(attackDay4.values())))]).range([0, widthBar]);
            var yScaleDay4 = d3.scaleBand()
                .range([svgHeightBar, 0])
                .domain(bindedDay4.map(function (d) {
                    return d[0];
                }))
                .padding(0.2);
            // SVG
            var barDay4 = d3.select('#barchartDay4').append('svg')
                .attr("width", svgWidthBar).attr('height', svgHeightBar)
                .attr("class", "barday4");

            var barLegenday4 = d3.axisTop()
                .scale(xScaleDay4)
                .tickPadding(8)
                .tickSize(5)
                .ticks(3);

            barDay4.append("g")
                .attr("class", "x axis")
                .call(barLegenday4)
                .attr('transform', 'translate(80,30)');

            // CHART AREA
            var valsDay4 = barDay4.append('g').attr('transform', 'translate(60,0)')
                .attr('width', widthBar).attr("height", heightBar);

            tooltipBar = d3.select('body').append('div')
                .style('display', "none")
                .attr('class', 'd3-tip');

            // DATA BIND
            var chartDay4 = valsDay4.selectAll('rect').data(bindedDay4);
            // ENTER
            chartDay4.enter().append('rect')
                .attr("width", function (d) {
                    return xScaleDay4(d[1]);
                })
                .attr("height", 10)
                .attr('x', 20).attr('y', function (d) {
                return yScaleDay4(d[0]) + 20;
            })
                .attr("fill", "#007BBF")
                .attr("width", function (d) {
                    return xScaleDay4(d[1])
                })

                .on('mousemove', function (d) {
                    tooltipBar.style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style('display', "block")
                        .html((d[0]) + ": " + (d[1]));
                })
                .on('mouseout', function () {
                    tooltipBar.style('display', "none");
                });

            // DATA BIND
            var keyDay4 = valsDay4.selectAll('text.key').data(bindedDay4);
            // ENTER
            keyDay4.enter().append("text").attr("class", "key")
                .attr("x", 0)
                .attr("y", function (d) {
                    return yScaleDay4(d[0]) + 20;
                })
                .attr('dy', 16)
                .attr("text-anchor", "end")
                .text(function (d) {
                    return d[0];
                });

            // UPDATE
            keyDay4.text(function (d) {
                return d[0]
            });

        }

        function updateScatterPlot(data) {
            d3.selectAll(".scatterPlot").remove();

            PortsSource.clear();
            PortsDestination.clear();
            IPAddress.clear();
            for (var i = 0; i < data.length; i++) {
                if (!PortsSource.has(data[i].SourcePort))
                    PortsSource.set(data[i].SourcePort, parseInt(data[i].TotalFwdPackets));
                else
                    PortsSource.set(data[i].SourcePort, PortsSource.get(data[i].SourcePort) + parseInt(data[i].TotalFwdPackets));

                if (!PortsDestination.has(data[i].DestinationPort))
                    PortsDestination.set(data[i].DestinationPort, parseInt(data[i].TotalFwdPackets));
                else
                    PortsDestination.set(data[i].DestinationPort, PortsDestination.get(data[i].DestinationPort) + parseInt(data[i].TotalFwdPackets));

                IPAddress.add(data[i].source.id.slice(0, -2));
                IPAddress.add(data[i].target.id.slice(0, -2));
            }

            xScatterPlot = d3.scalePoint();
            yScatterPlot = d3.scalePoint();
            ScalePackPort = d3.scaleLinear().domain([0, Math.max(...Array.from(PortsSource.values()).concat(Array.from(PortsDestination.values())))]).range([5, 12]);
            xAxisScatterPlot = d3.axisBottom(xScatterPlot);
            yAxisScatterPlot = d3.axisLeft(yScatterPlot);

            svgScatterPlot = d3.select("#scatterPlot").append("svg")
                .attr("class", "scatterPlot")
                .attr("width", widthScatterPlot + marginScatterPlot.left + marginScatterPlot.right)
                .attr("height", heightScatterPlot + marginScatterPlot.top + marginScatterPlot.bottom)
                .append("g")
                .attr("transform", "translate(" + marginScatterPlot.left + "," + marginScatterPlot.top + ")");

            tooltipScatterPlot = d3.select('body').append('div')
                .style('display', "none")
                .attr('class', 'd3-tip');

            xScatterPlot.domain(Array.from(PortsSource.keys()).concat(Array.from(PortsDestination.keys())).sort(function (a, b) {
                return a - b;
            })).range([0, widthScatterPlot]).padding(0.4);
            yScatterPlot.domain(Array.from(IPAddress).sort(function (a, b) {
                return a - b;
            })).range([heightScatterPlot, 0]).padding(0.4);

            // gridlines in x axis function
            function make_x_gridlines() {
                return d3.axisBottom(xScatterPlot)
            }

            // gridlines in y axis function
            function make_y_gridlines() {
                return d3.axisLeft(yScatterPlot)
            }

            // add the X gridlines
            svgScatterPlot.append("g")
                .attr("class", "grid")
                .attr("transform", "translate(0," + heightScatterPlot + ")")
                .call(make_x_gridlines()
                    .tickSize(-heightScatterPlot)
                    .tickFormat("").tickSizeOuter(0)
                );
            // add the Y gridlines
            svgScatterPlot.append("g")
                .attr("class", "grid")
                .call(make_y_gridlines()
                    .tickSize(-widthScatterPlot)
                    .tickFormat("").tickSizeOuter(0)
                );

            svgScatterPlot.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + heightScatterPlot + ")")
                .call(xAxisScatterPlot.tickSize(8).tickSizeOuter(0))
                .append("text")
                .attr("class", "label")
                .attr("x", widthScatterPlot)
                .attr("y", -6)
                .style("text-anchor", "end")
                .text("Port");

            svgScatterPlot.append("g")
                .attr("class", "y axis")
                .call(yAxisScatterPlot.tickSize(6).tickSizeOuter(0))
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", 4)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("IP Address");

            svgScatterPlot.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dotDestination")
                .attr("r", function (d) {
                    return ScalePackPort(PortsDestination.get(d.DestinationPort))
                })
                .attr("cx", function (d) {
                    return xScatterPlot(d.DestinationPort);
                })
                .attr("cy", function (d) {
                    return yScatterPlot(d.target.id.slice(0, -2));
                })
                .style("fill", "green")
                .on("mouseover", function (d) {
                    tooltipScatterPlot.style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style('display', "block")
                        .html("<h6>" + (d.target.id.slice(0, -2)) + ": " + (d.DestinationPort) + "</h6> <h6>Packets: " + (PortsDestination.get(d.DestinationPort)) + "</h6>");
                    handleFocusDotDestination(d);
                })
                .on("mouseout", function () {
                    tooltipScatterPlot.style('display', "none");
                    handleMouseOutEdge();
                    handleOutFocusStroke();
                });

            svgScatterPlot.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dotSource")
                .attr("r", function (d) {
                    return ScalePackPort(PortsSource.get(d.SourcePort));
                })
                .attr("cx", function (d) {
                    return xScatterPlot(d.SourcePort);
                })
                .attr("cy", function (d) {
                    return yScatterPlot(d.source.id.slice(0, -2));
                })
                .style("fill", "#3398cc")
                .on("mouseover", function (d) {
                    tooltipScatterPlot.style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style('display', "block")
                        .html("<h6>" + (d.source.id.slice(0, -2)) + ": " + (d.SourcePort) + "</h6> <h6>Packets: " + PortsSource.get(d.SourcePort) + "</h6>");
                    handleFocusDotSource(d);
                })
                .on("mouseout", function () {
                    tooltipScatterPlot.style('display', "none");
                    handleMouseOutEdge();
                    handleOutFocusStroke();
                });

            legendScatterPlot = svgScatterPlot.selectAll(".legend")
                .data(["Source", "Target"])
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) {
                    return "translate(20," + i * 16 + ")";
                });

            legendScatterPlot.append("rect")
                .attr("y", -20)
                .attr("x", widthScatterPlot - 20)
                .attr("width", 13)
                .attr("height", 13)
                .style("fill", function (d) {
                    if (d === "Source")
                        return "#3398cc";
                    else
                        return "green";
                })
                .on("click", function (d) {
                    d3.select(this).transition().duration(200).style("stroke", "red");
                    if (d === "Source")
                        d3.selectAll(".dotDestination").style("display", "none");
                    else
                        d3.selectAll(".dotSource").style("display", "none");
                })
                .on("dblclick", function (d) {
                    d3.select(this).transition().duration(200).style("stroke", "none");
                    if (d === "Source")
                        d3.selectAll(".dotDestination").style("display", "block");
                    else
                        d3.selectAll(".dotSource").style("display", "block");
                });

            legendScatterPlot.append("text")
                .attr("x", widthScatterPlot - 25)
                .attr("y", -14)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .style("font-size", "10px")
                .text(function (d) {
                    return d;
                });

        }

        function brush_parallel_chart() {
            for (var i = 0; i < dimensions.length; ++i) {
                if (d3.event.target == y[dimensions[i]].brush) {
                    min = d3.event.selection[0];
                    max = d3.event.selection[1];
                    extents[i] = y[dimensions[i]].domain().filter(function (d) {
                        return (min <= y[dimensions[i]](d)) && (y[dimensions[i]](d) <= max)
                    });
                }
            }
            notSelected.style("display", function (d) {
                return dimensions.every(function (p, i) {
                    if (extents[i][0] === 0 && extents[i][0] === 0)
                        return true;
                    if (p === "source" || p === "target") {
                        return extents[i].includes(d[p].id.slice(0, -2));
                    } else {
                        return extents[i].includes(d[p]) || extents[i].includes(parseInt(d[p]));
                    }
                }) ? "block" : "none";
            });
            if (nodeSelected.size !== 0) {
                selected.style("display", function (d) {
                    return dimensions.every(function (p, i) {
                        if (extents[i][0] === 0 && extents[i][0] === 0)
                            return true;
                        if (p === "source" || p === "target") {
                            return extents[i].includes(d[p].id.slice(0, -2)) && (nodeSelected.has(d.source.id) || (nodeSelected.has(d.target.id)));
                        } else {
                            return (extents[i].includes(d[p]) || extents[i].includes(parseInt(d[p]))) && (nodeSelected.has(d.source.id) || (nodeSelected.has(d.target.id)));
                        }
                    }) ? "block" : "none";
                });
            }
            filteredData = newData.filter(function (d) {
                return (extents[0].includes(d.source.id.slice(0, -2)) || (extents[0][0] === 0 && extents[0][1] === 0)) && (extents[1].includes(d.SourcePort) || extents[1].includes(parseInt(d.SourcePort)) || (extents[1][0] === 0 && extents[1][1] === 0)) &&
                    (extents[2].includes(d.target.id.slice(0, -2)) || (extents[2][0] === 0 && extents[2][1] === 0)) && (extents[3].includes(d.DestinationPort) || extents[3].includes(parseInt(d.DestinationPort)) || (extents[3][0] === 0 && extents[3][1] === 0)) &&
                    (extents[4].includes(d.TotalFwdPackets) || extents[4].includes(parseInt(d.TotalFwdPackets)) || (extents[4][0] === 0 && extents[4][1] === 0)) &&
                    (extents[5].includes(d.TotalLenghtOfFwdPackets) || extents[5].includes(parseInt(d.TotalLenghtOfFwdPackets)) || (extents[5][0] === 0 && extents[6][1] === 0)) && (extents[6].includes(d.Label) || (extents[6][0] === 0 && extents[6][1] === 0));
            });

            showAllGraph();
            buildMapPacket(filteredData);
            scalePacket(NumberDeliveredPackets);
            updateGraph(filteredData);
            updateScatterPlot(filteredData);
            attackPackets(filteredData);
            updateLegend();
            FocusDotScatterPlot(nodeSelected);
            updateNumberOfAttack(filteredData);
            updateChartDay1();
            updateChartDay2();
            updateChartDay3();
            updateChartDay4();
        }
    }

    function handleSelectedNode(nodes) {
        d3.select("#PCA").selectAll(".selected")
            .style("display", function (d) {
                if (nodes.has(d.source.id) || (nodes.has(d.target.id)))
                    return "block";
                else
                    return "none";
            });
        d3.select("#PCA").selectAll(".notSelected")
            .style("display", function (d) {
                if (nodes.has(d.source.id) || (nodes.has(d.target.id)))
                    return "none";
                else
                    return "block";
            });
    }

    function FocusDotScatterPlot(nodes) {
        d3.select("#scatterPlot").selectAll("circle").transition().duration(200)
            .style("stroke", function (d) {
                if (nodes.has(d.source.id) || (nodes.has(d.target.id)))
                    return "red";
                else
                    return "none"
            });
    }

    function handleFocusDotDestination(edge) {
        d3.select("#graph").selectAll("line").transition().duration(200).style("opacity", function (d) {
            if (d.source.id === edge.source.id && d.target.id === edge.target.id)
                return "1";
            else
                return "0.1";
        });
        d3.select("#graph").selectAll("circle").transition().duration(200)
            .style("opacity", function (d) {
                if ((d.id === edge.source.id) || (d.id === edge.target.id))
                    return "1";
                else
                    return "0.1";
            });
        d3.select("#PCA").selectAll(".notSelected")
            .style("opacity", function (d) {
                if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id) && edge.DestinationPort == d.DestinationPort)
                    return "1";
                else
                    return "0";
            })
            .style("stroke-width", "3px");
        d3.select("#PCA").selectAll(".selected")
            .style("opacity", function (d) {
                if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id) && edge.DestinationPort == d.DestinationPort)
                    return "1";
                else
                    return "0";
            })
            .style("stroke-width", "3px");

        d3.select("#scatterPlot").selectAll("circle")
            .style("opacity", function (d) {
                if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id) && (d.DestinationPort === edge.DestinationPort))
                    return "1";
                else
                    return "0"
            })
    }

    function handleFocusDotSource(edge) {
        d3.select("#graph").selectAll("line").transition().duration(200).style("opacity", function (d) {
            if (d.source.id === edge.source.id && d.target.id === edge.target.id)
                return "1";
            else
                return "0.1";
        });
        d3.select("#graph").selectAll("circle").transition().duration(200)
            .style("opacity", function (d) {
                if ((d.id === edge.source.id) || (d.id === edge.target.id))
                    return "1";
                else
                    return "0.1";
            });
        d3.select("#PCA").selectAll(".notSelected")
            .style("opacity", function (d) {
                if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id) && edge.SourcePort == d.SourcePort)
                    return "1";
                else
                    return "0";
            })
            .style("stroke-width", "3px");
        d3.select("#PCA").selectAll(".selected")
            .style("opacity", function (d) {
                if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id) && edge.SourcePort == d.SourcePort)
                    return "1";
                else
                    return "0";
            })
            .style("stroke-width", "3px");

        d3.select("#scatterPlot").selectAll("circle")
            .style("opacity", function (d) {
                if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id) && (d.SourcePort === edge.SourcePort))
                    return "1";
                else
                    return "0"
            })

    }

    function handleFocusStrokeOnEdge(edge) {
        d3.select("#PCA").selectAll(".notSelected")
            .style("opacity", function (d) {
                if (edge.source.id == d.source.id && edge.target.id == d.target.id)
                    return "1";
                else
                    return "0";
            })
            .style("stroke-width", "3px");
        d3.select("#PCA").selectAll(".selected")
            .style("opacity", function (d) {
                if (edge.source.id == d.source.id && edge.target.id == d.target.id)
                    return "1";
                else
                    return "0";
            })
            .style("stroke-width", "3px");
    }

    function ticked() {
        link
            .attr("x1", function (d) {
                if (d.source.group == '1') return d.source.x;
            })
            .attr("y1", function (d) {
                if (d.source.group == "1") return d.source.y;
            })
            .attr("x2", function (d) {
                if (d.target.group == "2") return d.target.x;
            })
            .attr("y2", function (d) {
                if (d.target.group == "2") return d.target.y;
            });
        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });
        textElements
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            });
    }

// content of the windows on link mouse over
    function contentLinkTip(d) {
        var content = "<h5 align='center'>LINK</h5>";
        content += " <table align='center' id='tooltip'><tr><td>IP address Attacker:</td> <td>" + d.source.id.slice(0, -2) + "</td></tr>" +
            "<tr><td> IP address Target:</td><td align='left'>" + d.target.id.slice(0, -2) + "</td></tr>" +
            "<tr><th>Tot N° of packets:</th> <td>" + transferPackets.get(d.source.id + d.target.id) + "</td></tr></table>";
        return content;
    }

// content of the windows on node mouse over
    function contentNodeTip(d) {
        var value = 0;
        if (NumberSentPackets.has(d.id) !== false && d.group === "1")
            value = NumberSentPackets.get(d.id);
        if (NumberDeliveredPackets.has(d.id) !== false && d.group === "2")
            value = NumberDeliveredPackets.get(d.id);
        var content = "<h5 align='center'>NODE</h5>";
        if (d.group === "1")
            content += " <table align='center' id='tooltip'><tr><td>IP address:</td> <td>" + d.id.slice(0, -2) + "</td></tr>" +
                "<tr><td>N° malicious packages sent: </td><td align='left'>" + value + "</td></tr></table>";
        if (d.group === "2")
            content += " <table align='center' id='tooltip'><tr><td>IP address:</td> <td>" + d.id.slice(0, -2) + "</td></tr>" +
                "<tr><td>N° malicious packets delivered: </td><td align='left'>" + value + "</td></tr></table>";
        return content;
    }

    function filterView() {
        displayElements = [];
        selectionLegend1 = parseInt(legendscale.invert(d3.brushSelection(d3.select(".brushLegend").node())[0]));
        selectionLegend2 = parseInt(legendscale.invert(d3.brushSelection(d3.select(".brushLegend").node())[1]));
        for (var i = 0; i < data.nodes.length; i++) {
            if ((NumberSentPackets.get(data.nodes[i]["id"]) >= selectionLegend1 && NumberSentPackets.get(data.nodes[i]["id"]) <= selectionLegend2) || (NumberDeliveredPackets.get(data.nodes[i]["id"]) >= selectionLegend1 && NumberDeliveredPackets.get(data.nodes[i]["id"]) <= selectionLegend2) || (selectionLegend1 < 1 && (NumberDeliveredPackets.has(data.nodes[i]["id"]) !== false || NumberSentPackets.has(data.nodes[i]["id"]) !== false)))
                displayElements.push(data.nodes[i]["id"]);
        }
        handleFilterLegend(displayElements);
    }

    function handleFilterLegend(nodes) {
        d3.select("#graph").selectAll("circle")
            .style("display", function (d) {
                if (nodes.includes(d["id"]) !== false)
                    return "block";
                else
                    return "none"
            });
        edges = [];
        d3.select("#graph").selectAll("line")
            .style("display", function (d) {
                if (nodes.includes(d.source.id) && nodes.includes(d.target.id)) {
                    if (edges.findIndex(x => (x.source == d.source && x.target == d.target)) <= -1) {
                        edges.push(d);
                        return "block";
                    }
                } else {
                    return "none";
                }
            });

        d3.select("#graph").selectAll("text")
            .style("display", function (d) {
                if (nodes.includes(d.id))
                    return "block";
                else
                    return "none";
            });

        d3.select("#PCA").selectAll(".notSelected")
            .style("opacity", function (d) {
                if (nodes.includes(d.source.id) || nodes.includes(d.target.id))
                    return "1";
                else
                    return "0";
            });
        d3.select("#scatterPlot").selectAll(".dotSource")
            .style("display", function (d) {
                if (nodes.includes(d.source.id))
                    return "block";
                else
                    return "none"
            });
        d3.select("#scatterPlot").selectAll(".dotDestination")
            .style("display", function (d) {
                if (nodes.includes(d.target.id))
                    return "block";
                else
                    return "none"
            });
    }
}


function showAllGraph() {
    d3.select("#graph").selectAll("line").style("display", "block");
    d3.select("#graph").selectAll("circle").style("display", "block");
    d3.select("#graph").selectAll("text").style("display", "block");
}

function handleMouseOverNode(circle) {
    var nodes = [];
    nodes.push(circle._groups[0][0].__data__.id);
    d3.select("#graph").selectAll("line").transition().duration(200)
        .style("opacity", function (d) {
            if ((d.source.id === circle._groups[0][0].__data__.id) || (d.target.id === circle._groups[0][0].__data__.id)) {
                nodes.push(d.target.id);
                nodes.push(d.source.id);
                return "1";
            }
            if ((d.source.id !== circle._groups[0][0].__data__.id) || (d.target.id !== circle._groups[0][0].__data__.id))
                return "0.1";
        });
    d3.select("#graph").selectAll("circle").transition().duration(200)
        .style("opacity", function (d) {
            if (nodes.indexOf(d.id) > -1)
                return "1";
            else
                return "0.1"
        });
    d3.select("#scatterPlot").selectAll("circle").transition().duration(200)
        .style("opacity", function (d) {
            if ((d.source.id === circle._groups[0][0].__data__.id) || (d.target.id === circle._groups[0][0].__data__.id))
                return "1";
            else
                return "0"
        });
    d3.select("#PCA").selectAll(".notSelected")
        .style("opacity", function (d) {
            if (d.source.id == circle._groups[0][0].__data__.id || d.target.id == circle._groups[0][0].__data__.id)
                return "1";
            else
                return "0";
        })
        .style("stroke-width", "3px");
    d3.select("#PCA").selectAll(".selected")
        .style("opacity", function (d) {
            if (d.source.id == circle._groups[0][0].__data__.id || d.target.id == circle._groups[0][0].__data__.id)
                return "1";
            else
                return "0";
        })
        .style("stroke-width", "3px");
}

function handleMouseOutNode() {
    d3.select("#graph").selectAll("line").transition().duration(200).style("opacity", "1");
    d3.select("#graph").selectAll("circle").transition().duration(200).style("opacity", "1");
    d3.select("#scatterPlot").selectAll("circle").transition().duration(200).style("opacity", "1");
}

function handleMouseMoveEdge(edge) {
    d3.select("#graph").selectAll("line").transition().duration(200).style("opacity", function (d) {
        if (d.source.id === edge.source.id && d.target.id === edge.target.id)
            return "1";
        else
            return "0.1";
    });
    d3.select("#graph").selectAll("circle").transition().duration(200)
        .style("opacity", function (d) {
            if ((d.id === edge.source.id) || (d.id === edge.target.id))
                return "1";
            else
                return "0.1";
        });
    d3.select("#scatterPlot").selectAll("circle")
        .style("opacity", function (d) {
            if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id))
                return "1";
            else
                return "0"
        });
    d3.select("#PCA").selectAll(".notSelected")
        .style("opacity", function (d) {
            if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id))
                return "1";
            else
                return "0";
        })
        .style("stroke-width", "3px");
    d3.select("#PCA").selectAll(".selected")
        .style("opacity", function (d) {
            if ((d.source.id === edge.source.id) && (d.target.id === edge.target.id))
                return "1";
            else
                return "0";
        })
        .style("stroke-width", "3px");
}

function handleMouseOutEdge() {
    d3.select("#graph").selectAll("line").transition().duration(150).style("opacity", "1");
    d3.select("#graph").selectAll("circle").transition().duration(150).style("opacity", "1");
    d3.select("#scatterPlot").selectAll("circle").transition().duration(200).style("opacity", "1");
}

function handleFocusStroke(stroke) {
    d3.select("#graph").selectAll("line").transition().duration(200).style("opacity", function (d) {
        if (d.source.id === stroke.source.id && d.target.id === stroke.target.id)
            return "1";
        else
            return "0.1";
    });
    d3.select("#graph").selectAll("circle").transition().duration(200)
        .style("opacity", function (d) {
            if ((d.id === stroke.source.id) || (d.id === stroke.target.id))
                return "1";
            else
                return "0.1";
        });
    d3.select("#PCA").selectAll(".notSelected")
        .style("opacity", function (d) {
            if (d == stroke)
                return "1";
            else
                return "0";
        })
        .style("stroke-width", "3px");
    d3.select("#PCA").selectAll(".selected")
        .style("opacity", function (d) {
            if (d == stroke)
                return "1";
            else
                return "0";
        })
        .style("stroke-width", "3px");
    d3.select("#scatterPlot").selectAll("circle")
        .style("opacity", function (d) {
            if (d == stroke)
                return "1";
            else
                return "0"
        });
}

function handleOutFocusStroke() {
    d3.select("#PCA").selectAll(".notSelected")
        .style("opacity", "1")
        .style("stroke-width", "1px");
    d3.select("#PCA").selectAll(".selected")
        .style("opacity", "1")
        .style("stroke-width", "1px");
}

function buildMapPacket(data) {
    NumberDeliveredPackets = new Map();
    NumberSentPackets = new Map();
    transferPackets = new Map();
    if (step === 1) {
        for (var i = 0; i < data.length; i++) {
            if (NumberSentPackets.has(data[i].source.id) === false)
                NumberSentPackets.set(data[i].source.id, parseInt(data[i].TotalFwdPackets));
            else
                NumberSentPackets.set(data[i].source.id, NumberSentPackets.get(data[i].source.id) + parseInt(data[i].TotalFwdPackets));
            if (NumberDeliveredPackets.has(data[i].target.id) === false)
                NumberDeliveredPackets.set(data[i].target.id, parseInt(data[i].TotalFwdPackets));
            else
                NumberDeliveredPackets.set(data[i].target.id, NumberDeliveredPackets.get(data[i].target.id) + parseInt(data[i].TotalFwdPackets));
            if (transferPackets.has(data[i].source.id + data[i].target.id) === false)
                transferPackets.set(data[i].source.id + data[i].target.id, parseInt(data[i].TotalFwdPackets));
            else
                transferPackets.set(data[i].source.id + data[i].target.id, transferPackets.get(data[i].source.id + data[i].target.id) + parseInt(data[i].TotalFwdPackets));
        }
    }
    if (step === 0) {
        for (var i = 0; i < data.length; i++) {
            if (NumberSentPackets.has(data[i].source) === false)
                NumberSentPackets.set(data[i].source, parseInt(data[i].TotalFwdPackets));
            else
                NumberSentPackets.set(data[i].source, NumberSentPackets.get(data[i].source) + parseInt(data[i].TotalFwdPackets));
            if (NumberDeliveredPackets.has(data[i].target) === false)
                NumberDeliveredPackets.set(data[i].target, parseInt(data[i].TotalFwdPackets));
            else
                NumberDeliveredPackets.set(data[i].target, NumberDeliveredPackets.get(data[i].target) + parseInt(data[i].TotalFwdPackets));
            if (transferPackets.has(data[i].source + data[i].target) === false)
                transferPackets.set(data[i].source + data[i].target, parseInt(data[i].TotalFwdPackets));
            else
                transferPackets.set(data[i].source + data[i].target, transferPackets.get(data[i].source + data[i].target) + parseInt(data[i].TotalFwdPackets));
        }
    }
}

function attackPackets(data) {
    attackDay1 = new Map();
    attackDay2 = new Map();
    attackDay3 = new Map();
    attackDay4 = new Map();
    for (var i = 0; i < data.length; i++) {
        switch (data[i].Timestamp.slice(0, -6)) {
            case "4/7/2017":
                if (attackDay1.has(data[i].Label) == false)
                    attackDay1.set(data[i].Label, parseInt(data[i].TotalFwdPackets));
                else
                    attackDay1.set(data[i].Label, attackDay1.get(data[i].Label) + parseInt(data[i].TotalFwdPackets));
                break;
            case "5/7/2017":
                if (attackDay2.has(data[i].Label) == false)
                    attackDay2.set(data[i].Label, parseInt(data[i].TotalFwdPackets));
                else
                    attackDay2.set(data[i].Label, attackDay2.get(data[i].Label) + parseInt(data[i].TotalFwdPackets));
                break;
            case "6/7/2017":
                if (attackDay3.has(data[i].Label) == false)
                    attackDay3.set(data[i].Label, parseInt(data[i].TotalFwdPackets));
                else
                    attackDay3.set(data[i].Label, attackDay3.get(data[i].Label) + parseInt(data[i].TotalFwdPackets));
                break;
            case "7/7/2017":
                if (attackDay4.has(data[i].Label) == false)
                    attackDay4.set(data[i].Label, parseInt(data[i].TotalFwdPackets));
                else
                    attackDay4.set(data[i].Label, attackDay4.get(data[i].Label) + parseInt(data[i].TotalFwdPackets));
                break;
        }
    }
}

// built the scale for the packets
function scalePacket() {
    max = d3.max(Array.from(NumberSentPackets.values()).concat(Array.from(NumberDeliveredPackets.values())));
    colorScalePackets = d3.scaleSequential(d3.interpolateViridis).domain([0, max]);
    max = d3.max(Array.from(transferPackets.values()));
    min = d3.min(Array.from(transferPackets.values()));
    scalePackets = d3.scaleLinear().domain([min, max]).range([3, 27]);
}

function brushEmpty() {
    var empty = true;
    for (var i = 0; i < extents.length; i++) {
        for (var j = 0; j < 2; j++) {
            if (extents[i][j] != 0)
                return false;
        }
    }
    return empty
}
