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


let testNode = new Node();

class Graph {
    constructor(nodes, start, goal, sizeX, sizeY) {
        this.nodes = nodes;
        this.start = [];
        this.goal = goal;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    getStart() {
        return this.start;
    }
}

let testGraph = new Graph();
console.log("Hello from JS");


let xhr = new XMLHttpRequest();
xhr.addEventListener('load', loadData);
xhr.open('GET', "mazes/bigMaze.txt");
xhr.send();

function loadData() {
    console.log("load data");
    console.log(this);
    let mazeText = this.responseText;
    // console.log(mazeText);
    mazeToGraph(mazeText)
}

function mazeToGraph(mazeText) {
    let graph = new Graph();
    let mazeLines = new Array();
    for (let line of mazeText.split("\n")) {
        mazeLines.push(line);
        console.log(line);
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
            graph.nodes[i][j].data =currentLine.charAt(j);
            console.log(currentLine.charAt(j));
            graph.nodes[i][j].x = i;
            graph.nodes[i][j].y = j;

            if (graph.nodes[i][j].data === 'S') {
                graph.start.push(i);
                graph.start.push(j);
            }
        }
    }

    console.log(graph.start)
    console.log(graph.goal)

    for(let i = 0; i<graph.nodes.sizeX;i++) {
        for (let j=0; j<graph.nodes.sizeY;j++){
            console.log(graph.nodes[i][j].data)
        }
    }
        return graph;
}


