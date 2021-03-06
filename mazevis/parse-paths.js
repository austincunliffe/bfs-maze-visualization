class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

async function getFile(filePath) {
    try {
        const resp = await fetch(filePath)
        return resp.text();
    } catch (err) {
        console.log(err)
    }
}

function createNodes(dataString) {
    let nodes = [];
    for (let coord of dataString.split("\n")) {
        let coords = coord.split(" ");
        let node = new Node(coords[1], coords[0])
        nodes.push(node);
    }
    return nodes;
}

export async function createNodeArray(filePath) {
    const dataString = await getFile(filePath);
    const nodes = createNodes(dataString);
    return nodes;
}