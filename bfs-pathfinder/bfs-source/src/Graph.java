
public class Graph {

    private Node start = null;
    private Node goal = null;
    Node [][] nodes;

    int height, width;

    Graph(int height, int width){
        this.height = height;
        this.width = width;

        nodes = new Node[height][width];
    }

    /**
     * Set start node.
     * @param node - node to be marked as start.
     */
    public void setStart(Node node){
        start = node;
    }

    /**
     * Set goal node.
     * @param node - node to be marked as goal.
     */
    public void setGoal(Node node){
        goal = node;
    }

    /**
     * Get the start node.
     * @return node designated as start.
     */
    public Node getStart(){
        return start;
    }

    /**
     * Get the goal node.
     * @return node designated as goal.
     */
    public Node getGoal(){
        return goal;
    }

}
