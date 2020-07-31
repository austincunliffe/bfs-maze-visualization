const fs = require('fs')


function readRowCol(filePath) {
        return fs.readFileSync(filePath).toString();
    }

// TODO: Finish method by create array of nodes.
function createNodes(dataString) {
    for (coord of dataString.split("\n")) {
        var coords = coord.split(" ");

        console.log(coords[0], coords[1]);
    }
}

function createNodeArray(filePath) {
    let dataString = readRowCol(filePath);
    createNodes(dataString);
}

createNodeArray("../bfs-pathfinder/search-coordinates/classicCoords.txt");