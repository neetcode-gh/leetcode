let dfs = (node: Node, memo: Map<Node, Node>) => {
    if (node === null) return null;

    //if this node has already been visited, simply return the counterpart node of the new graph and return
    if (memo.has(node)) return memo.get(node);

    //node hasn't been already visited, create its counterpart version for the new graph
    let newNode = new Node(node.val);
    //maps to the old graph counterpart(also marked as visited)
    memo.set(node, newNode);

    //for each edge of the old node, add that edge in the new graph node
    for (let i = 0; i < node.neighbors.length; i++) {
        newNode.neighbors.push(dfs(node.neighbors[i], memo));
    }

    return newNode;
};

function cloneGraph(node: Node | null): Node | null {
    //uses a map, maps old graph nodes with new graph ones
    //it also tells us which node of the old graph have already been visited
    let memo = new Map<Node, Node>();

    return dfs(node, memo);
}
