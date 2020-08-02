// import {createNodeArray} from "./parse-paths.js";
// createNodeArray("../bfs-pathfinder/search-coordinates/classicCoords.txt");
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

    getStart() {
        return this.start;
    }
}


let xhr = new XMLHttpRequest();
xhr.addEventListener('load', loadData);
xhr.open('GET', "mazes/bigMaze.txt");
xhr.send();

function loadData() {
    let mazeText = this.responseText;
    console.log(mazeText);
    let graph = mazeToGraph(mazeText);
    console.log(graph.start)
    let mazeData = gridData(graph);
    gridVis(mazeData);
}

function mazeToGraph(mazeText) {
    let graph = new Graph();
    let mazeLines = new Array();
    for (let line of mazeText.split("\n")) {
        mazeLines.push(line);
        // console.log(line);
    }


    let dimensions = mazeLines[0].split(" ");
    graph.sizeX = dimensions[0];
    graph.sizeY = dimensions[0];
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
            // console.log(currentLine.charAt(j));
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


    for (let i = 0; i < graph.nodes.sizeX; i++) {
        for (let j = 0; j < graph.nodes.sizeY; j++) {
            // console.log(graph.nodes[i][j].data)
        }
    }
    return graph;
}


function gridData(graph) {
    var data = new Array();
    var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;
    var width = 20;
    var height = 20;

    console.log(graph.sizeX)
    console.log(graph.sizeY)

    for (var row = 0; row < graph.sizeX; row++) {
        data.push(new Array());

        for (var column = 0; column < graph.sizeY; column++) {
            data[row].push({
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

grid.select(row)





const fs = require('fs');

class NodeA {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function ajaxRequest(filePath) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', readRowCol);
    xhr.open('GET', filePath.toString());
    xhr.send();
}

function readRowCol(filePath) {
    // return fs.readFileSync(filePath).toString();
    return this.responseText;
}

function createNodes(dataString) {
    let nodes = [];
    for (let coord of dataString.split("\n")) {
        let coords = coord.split(" ");
        let node = new NodeA(coords[0], coords[1])
        nodes.push(node);
    }
    return nodes;
}

function createNodeArray(filePath) {
    // let dataString = readRowCol(filePath);
    let dataString = ajaxRequest(filePath);
    let nodes = createNodes(dataString);
    return nodes;
}

let classicSearchCoords = createNodeArray("../bfs-pathfinder/search-coordinates/classicCoords.txt");
let classicShortestCoords = createNodeArray("../bfs-pathfinder/shortest-paths/classic.txt");

for (let node of classicSearchCoords) {
    console.log(node.x + " " + node.y);
}
