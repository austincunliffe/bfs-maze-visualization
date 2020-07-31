

public class Node {

    char symbol;
    boolean visited;
    Node cameFrom;
    int col;
    int row;

    int searchNum = 0;

    Node(char symbol, int row, int col){
        this.symbol = symbol;
        this.row = row;
        this.col = col;
    }

}
