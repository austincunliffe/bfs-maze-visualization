const fs = require('fs')

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function readRowCol(filePath) {
        return fs.readFileSync(filePath).toString();
    }

function createNodes(dataString) {
    let nodes = [];
    for (let coord of dataString.split("\n")) {
        let coords = coord.split(" ");
        let node = new Node(coords[0], coords[1])
        nodes.push(node);
    }
    return nodes;
}

 function createNodeArray(filePath) {
    let dataString = readRowCol(filePath);
    let nodes = createNodes(dataString);
    return nodes;
}

let classicSearchCoords = createNodeArray("../bfs-pathfinder/search-coordinates/classicCoords.txt");
let classicShortestCoords = createNodeArray("../bfs-pathfinder/shortest-paths/classic.txt");

for (let node of classicSearchCoords) {
    console.log(node.x + " " + node.y);
}


