package assignment07;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Scanner;

public class PathFinder {
    /**
     * Returns a file containing maze with '.' representing the shortest path.
     * <p>
     * If no solution returns the original maze.
     *
     * @param inputFile  file containing the maze to be read in.
     * @param outputFile file to write the maze solution to.
     * @throws IOException
     */
    public static void solveMaze(String inputFile, String outputFile) throws IOException {
        Scanner fin = new Scanner(new FileInputStream(inputFile));
        PrintWriter fout = new PrintWriter(new FileWriter(outputFile));

        Graph maze = buildMaze(fin); // read in maze from inputFile

        breadthFirstSearch(maze);   //find the goal node indicating the shortest Path
        if (maze.goal == null) {    // return the original maze if the maze is unsolvable
            buildSolution(maze, fout);
            return;
        }
        markPath(maze);      // Mark isPath flag on all nodes that are a part of the shortest path
        buildSolution(maze, fout);  // Write out the file containing the maze solution.
    }

    /**
     * Returns a Graph containing the maze read in from the scanner.
     *
     * @param fin Scanner to read input file.
     * @return Graph containing the file data.
     */
    public static Graph buildMaze(Scanner fin) {
        // Store graph size x and y as ints
        String graphSize = fin.nextLine();
        String[] graphSizes = graphSize.split(" ");
        int x = Integer.parseInt(graphSizes[0]);
        int y = Integer.parseInt(graphSizes[1]);

        // Create and fill graph with nodes containing maze characters
        Graph maze = new Graph(x, y);
        for (int i = 0; i < x; i++) {
            String currentLine = fin.nextLine();
            for (int j = 0; j < y; j++) {
                maze.nodes[i][j] = new Node(currentLine.charAt(j));
                maze.nodes[i][j].x = i;
                maze.nodes[i][j].y = j;

                // Store the maze start coordinates in the graph
                if (maze.nodes[i][j].data == 'S') {
                    maze.start[0] = i;
                    maze.start[1] = j;
                }
            }
        }
        return maze;
    }

    /**
     * Finds the goal node indicating the shortest Path by marking
     * Node visited flag and storing cameFrom Node.
     *
     * @param maze Graph to search for the shortest path.
     */
    public static void breadthFirstSearch(Graph maze) {
        int[] startCoordinates = maze.getStart();
        int x = startCoordinates[0];
        int y = startCoordinates[1];
        Node start = maze.nodes[x][y];
        char goal = 'G';
        LinkedList<Node> q = new LinkedList<>();

        // Breadth - First Search
        start.visited = true;
        q.add(start);       //add enqueue
        while (!q.isEmpty()) {
            Node curr = q.removeFirst();     //removeFirst dequeue
            if (curr.data == goal) {
                maze.goal = curr;   // store goal in current
                maze.goal.data = 'G';
                return;
            }

            // Find neighbors and add to the queue
            ArrayList<Node> neighbors = PathFinder.getNeighbors(curr.x, curr.y, maze);
            for (Node el : neighbors) {
                if (!el.visited) {
                    el.visited = true;
                    el.cameFrom = curr;
                    q.add(el);    //add enqueue
                }
            }
        }
    }

    /**
     * Returns an arrayList of neighboring nodes vertically or horizontally
     * containing suitable data (' ' or 'G') for the breath-first search.
     *
     * @param x    coordinate to find neighbors of.
     * @param y    coordinate to find neighbors of.
     * @param maze maze containing the node to search for neighbors in.
     * @return arrayList of nodes containing searchable neighboring Nodes.
     */
    public static ArrayList<Node> getNeighbors(int x, int y, Graph maze) {
        ArrayList<Node> neighbors = new ArrayList<>();
        // Add neighbors to the left and right
        for (int i = x - 1; i <= x + 1; i++) {
            if (maze.nodes[i][y].data == ' ' || maze.nodes[i][y].data == 'G')
                neighbors.add(maze.nodes[i][y]);
        }
        // Add neighbors to the top and bottom
        for (int j = y - 1; j <= y + 1; j++) {
            if (maze.nodes[x][j].data == ' ' || maze.nodes[x][j].data == 'G')
                neighbors.add(maze.nodes[x][j]);
        }
        return neighbors;
    }

    /**
     * Mark isPath flag on all nodes that are a part of the shortest path by tracing
     * the goal nodes cameFrom Nodes to the start node.
     *
     * @param maze searched graph to mark the path from the goal node to the start node.
     */
    public static void markPath(Graph maze) {
        Node current = maze.goal;
        while (current.cameFrom != null) {
            current.isPath = true;
            current = current.cameFrom;
        }
    }

    /**
     * Write out the file containing the maze solution. Replaces ' ' with '.' in outputFile
     * if the node data is a part of the shortest path.
     *
     * @param maze searched graph to write out to file.
     * @param fout printWriter to write to the file with.
     */
    public static void buildSolution(Graph maze, PrintWriter fout) {
        fout.print(maze.sizeX + " " + maze.sizeY);  // write out the maze size.
        for (int i = 0; i < maze.sizeX; i++) {     // write out every Node within Graph Nodes Matrix
            fout.println();
            for (int j = 0; j < maze.sizeY; j++) {
                if (maze.nodes[i][j].isPath != true) {  // write out node data if it is not part of the path
                    fout.print(maze.nodes[i][j].data);
                } else {
                    if (maze.nodes[i][j].data == 'G') { // Goal node check
                        fout.print(maze.nodes[i][j].data);
                        continue;
                    }
                    fout.print(".");  // write out path marker if not goal node.
                }
            }
        }
        fout.flush();   // flush print writer
    }
}
