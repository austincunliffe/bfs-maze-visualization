package assignment07;

public class Node {
    char data;
    boolean visited;
    int x;
    int y;

    Node cameFrom;
    boolean isPath;

    Node(char data) {
        this.data = data;
        visited = false;
    }
}
