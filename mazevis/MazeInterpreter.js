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
        this.start = start;
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
xhr.addEventListener('load',loadData);
xhr.open('GET',"/Users/williamrdent/bfs-maze-visualization/mazevis/mazes/bigMaze.txt");
xhr.send();

function loadData(){
    console.log("load data");
    console.log(this);
}









// /**
//  * Returns a Graph containing the maze read in from the scanner.
//  *
//  * @param fin Scanner to read input file.
//  * @return Graph containing the file data.
//  */
// public static Graph buildMaze(Scanner fin) {
//     // Store graph size x and y as ints
//     String graphSize = fin.nextLine();
//     String[] graphSizes = graphSize.split(" ");
//     int x = Integer.parseInt(graphSizes[0]);
//     int y = Integer.parseInt(graphSizes[1]);
//
//     // Create and fill graph with nodes containing maze characters
//     Graph maze = new Graph(x, y);
//     for (int i = 0; i < x; i++) {
//         String currentLine = fin.nextLine();
//         for (int j = 0; j < y; j++) {
//             maze.nodes[i][j] = new Node(currentLine.charAt(j));
//             maze.nodes[i][j].x = i;
//             maze.nodes[i][j].y = j;
//
//             // Store the maze start coordinates in the graph
//             if (maze.nodes[i][j].data == 'S') {
//                 maze.start[0] = i;
//                 maze.start[1] = j;
//             }
//         }
//     }
//     return maze;
// }

