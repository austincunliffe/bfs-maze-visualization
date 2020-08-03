import {createNodeArray} from "./parse-paths.js";

class Node {
    constructor(data, x, y, visited, cameFrom, isPath) {
        this.data = data;
        this.x = x;
        this.y = y;
        this.visited = visited;
        this.cameFrom = cameFrom;
        this.isPath = isPath;
    }
}

class Graph {
    constructor(nodes, start, goal, sizeX, sizeY) {
        this.nodes = nodes;
        this.start = [];
        this.goal = [];
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}

let searchCoordsURL = "search-coordinates/";
let shortestPathURL = "shortest-paths/";

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', loadData);
    let unsolvedMazeURL = "mazes/"+fileList[0].name;
    searchCoordsURL+= fileList[0].name;
    shortestPathURL += fileList[0].name;
    xhr.open('GET', unsolvedMazeURL);
    xhr.send();
});

async function loadData() {
    let mazeText = this.responseText;
    let graph = mazeToGraph(mazeText);
    let mazeData = gridData(graph);
    gridVis(mazeData);

    let searchArr = await createNodeArray(searchCoordsURL);
    let shortestArr = await createNodeArray(shortestPathURL);

    // The loop through searchArr "animates" the breadth first search.
    for (let node of searchArr) {
        var id = "#y" + node.y + "x" + node.x;
        d3.select(id).style('fill', "red");
        await sleep(20);
    }

    // The loop through shortestArr highlights the shortest path available.
    for (let node of shortestArr) {
        var id = "#y" + node.y + "x" + node.x;
        d3.select(id).style('fill', "green");
    }
}

function mazeToGraph(mazeText) {
    let graph = new Graph();
    let mazeLines = new Array();
    for (let line of mazeText.split("\n")) {
        mazeLines.push(line);
    }

    let dimensions = mazeLines[0].split(" ");
    graph.sizeX = dimensions[0];
    graph.sizeY = dimensions[1];
    mazeLines.splice(0, 1);

    // init 2d array of nodes
    graph.nodes = [];
    let cols = graph.sizeX;
    for (let i = 0; i < cols; i++) {
        graph.nodes[i] = [];
    }

    for (let i = 0; i < graph.sizeX; i++) {
        let currentLine = mazeLines[i];

        for (let j = 0; j < graph.sizeY; j++) {
            graph.nodes[i][j] = new Node();
            graph.nodes[i][j].data = currentLine.charAt(j);
            graph.nodes[i][j].x = i;
            graph.nodes[i][j].y = j;

            if (graph.nodes[i][j].data === 'S') {
                graph.start.push(i);
                graph.start.push(j);
            }
            if (graph.nodes[i][j].data === 'G') {
                graph.goal.push(i);
                graph.goal.push(j);
            }
        }
    }
    return graph;
}


function gridData(graph) {
    var data = new Array();
    var xpos = 1;
    var ypos = 1;
    var width = 20;
    var height = 20;

    for (var row = 0; row < graph.sizeX; row++) {
        data.push(new Array());

        for (var column = 0; column < graph.sizeY; column++) {
            data[row].push({
                yCoord: row,
                xCoord: column,
                x: xpos,
                y: ypos,
                cellType: graph.nodes[row][column].data,
                width: width,
                height: height
            })
            xpos += width;
        }
        xpos = 1;
        ypos += height;
    }
    return data;
}


function gridVis(gridData) {
    var grid = d3.select("#grid")
        .append("svg")
        .attr("width", "1000px")
        .attr("height", "1000px");

    var row = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");

    var column = row.selectAll(".square")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("class", "square")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("width", function (d) {
            return d.width;
        })
        .attr("height", function (d) {
            return d.height;
        })
        .attr("cellType", function (d) {
            return d.cellType;
        })
        .attr("id", function (d) {
            return "y" + d.yCoord + "x" + d.xCoord;
        })
        .style("fill", function (d) {
            if (d.cellType == 'X') {
                return "#000";
            } else if (d.cellType == 'G') {
                return "#ff0083";
            } else if (d.cellType == 'S') {
                return "#10ff00";
            } else {
                return "#fff";
            }
        })
        .style("stroke", "#222")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}