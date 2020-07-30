package assignment07;

public class Graph {
    Node nodes[][];
    public int[] start = new int[2];
    public Node goal;
    int sizeX;
    int sizeY;

    Graph(int x, int y) {
        nodes = new Node[x][y];
        sizeX = x;
        sizeY = y;
    }

    public int[] getStart() {
        return start;
    }
}
