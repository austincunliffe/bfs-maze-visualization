

import java.io.*;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;

public class PathFinder {

    /**
     * Find the shortest path, if possible, of text input file and creates a new file with the coordinates of the
     * shortest path.
     * @param inputFile - filename of the text file we are trying to solve the shortest path for.
     * @param outputFile - filename of solved output file.
     * @throws IOException
     */
    public static ArrayList<Node> solveMaze(String inputFile, String outputFile) throws Exception {
        Graph maze = readFile(inputFile);

        ArrayList<Node> searchOrder = search(maze);

        Node pathNode = maze.getGoal();

        ArrayList<Node> shortestPath = new ArrayList<>();
        shortestPath.add(pathNode);

        if (pathNode.cameFrom != null) {
            while (pathNode != maze.getStart()) {
                if (pathNode.cameFrom == maze.getStart()) {
                    shortestPath.add(pathNode.cameFrom);
                    pathNode.symbol = '.';
                    break;
                }
                pathNode = pathNode.cameFrom;
                pathNode.symbol = '.';
                shortestPath.add(pathNode);
            }
        }
        writeFile(shortestPath, outputFile);
        return searchOrder;
    }

    /**
     * Read file and convert to graph.
     * @param inputFile - filepath of file to be read.
     * @return Graph of passed in file.
     * @throws IOException
     */
    public static Graph readFile(String inputFile) throws Exception {
        BufferedReader input = new BufferedReader(new FileReader(inputFile));

        String[] dimensions = input.readLine().split(" ");
        int height = Integer.parseInt(dimensions[0]);
        int width = Integer.parseInt(dimensions[1]);

        Graph maze = new Graph(height, width);

        for (int i = 0; i < height; i++) {
            String graphLine = input.readLine();
            String[] graphLineArr = graphLine.split("");
            for (int j = 0; j < width; j++){
                Node node = new Node(' ', i, j);
                if (graphLineArr[j].equals("S")){
                    if (i == 0 || i == height - 1 || j == 0 || j == width - 1)
                        throw new Exception("Start location cannot be on outer edge.");
                    node.symbol = 'S';
                    maze.setStart(node);
                } else if(graphLineArr[j].equals("G")){
                    if (i == 0 || i == height - 1 || j == 0 || j == width - 1)
                        throw new Exception("Goal location cannot be on outer edge.");
                    node.symbol = 'G';
                    maze.setGoal(node);
                } else if(graphLineArr[j].equals("X")){
                    node.symbol = 'X';
                }
                maze.nodes[i][j] = node;
            }
        }
        if (maze.getStart() == null || maze.getGoal() == null){
            throw new Exception("Input file does not have a valid start and/or goal.");
        }
        return maze;
    }

    /**
     * Performs breadth first search of a Graph. Marks Node member variable cameFrom to track shortest path.
     * @param maze - Graph to be searched.
     */
    public static ArrayList<Node> search(Graph maze){
        LinkedList<Node> Q = new LinkedList<>();
        maze.getStart().visited = true;
        Q.addLast(maze.getStart());
        int searchNum = 0;
        ArrayList<Node> searchNodes = new ArrayList<>();

        while (!Q.isEmpty()){
            Node curr = Q.pop();

            searchNum += 1;
            curr.searchNum = searchNum;
            searchNodes.add(curr);

            if (curr.equals(maze.getGoal())) return searchNodes;
            ArrayList<Node> neighbors = findNeighbors(maze, curr);
            for (Node n : neighbors){
                if (!n.visited){
                    n.visited = true;
                    n.cameFrom = curr;
                    Q.addLast(n);
                }
            }
        }
        return searchNodes;
    }

    /**
     * Find the direct top, bottom, left, and right neighbors of specific Node in a Graph.
     * @param maze - Graph that Node is a part of.
     * @param curr - Node to find the neighbors of.
     * @return ArrayList of neighbor Nodes.
     */
    public static ArrayList<Node> findNeighbors(Graph maze, Node curr){
        ArrayList<Node> output = new ArrayList<>();

        for (int i = curr.row - 1; i <= curr.row + 1; i+= 2) {
            if (maze.nodes[i][curr.col].symbol == ' ' || maze.nodes[i][curr.col].symbol == 'G'){
                output.add(maze.nodes[i][curr.col]);
            }
        }
        for (int i = curr.col - 1; i <= curr.col + 1; i+= 2) {
            if (maze.nodes[curr.row][i].symbol == ' ' || maze.nodes[curr.row][i].symbol == 'G'){
                output.add(maze.nodes[curr.row][i]);
            }
        }
        return output;
    }

    /**
     * Create output file from Graph.
     * @param shortestPath - Graph to be used to create output file.
     * @param outputFile - filepath of new created file.
     * @throws IOException
     */
    public static void writeFile(ArrayList<Node> shortestPath, String outputFile) throws IOException {
        PrintWriter output = new PrintWriter(new FileWriter(outputFile));

        Collections.reverse(shortestPath);
        for (Node n: shortestPath) {
            output.write(n.row + " " + n.col);
            output.println();
        }
        output.flush();
    }

    public static void writeSearchPoints(ArrayList<Node> searchPoints, String outputFile) throws IOException {
        PrintWriter output = new PrintWriter(new FileWriter(outputFile));

        for (Node n: searchPoints) {
            output.write(n.row + " " + n.col);
            output.println();
        }
        output.flush();
    }

    public static void main(String[] args) throws Exception {

        File mazes = new File("unsolved-mazes/");
        File[] listOfFiles = mazes.listFiles();

        for (File f: listOfFiles) {
            String shortestPathOutput = "shortest-paths/" + f.getName().substring(0, f.getName().length() - 4) + ".txt";
            ArrayList<Node> searchPoints = solveMaze(f.getPath(), shortestPathOutput);

            String searchOutputName = "search-coordinates/" + f.getName().substring(0, f.getName().length() - 4) + "Coords.txt";
            writeSearchPoints(searchPoints, searchOutputName);
        }
    }
}




