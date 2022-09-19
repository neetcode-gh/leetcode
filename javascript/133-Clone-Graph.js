/**
 * https://leetcode.com/problems/clone-graph/
 * Time O(V + E) | Space O(N)
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node, seen = new Map()) {
    const isBaseCase = node === null;
    if (isBaseCase) return null;

    if (seen.has(node)) return seen.get(node);

    return dfs(node, seen);                              /* Time O(V + E) | Space O(N) */
}

const dfs = (node, seen) => {
    const clone = new Node(node.val);

    seen.set(node, clone);                               /*               | Space O(N) */

    for (const neighbor of node.neighbors) {
        const cloneNeighbor = cloneGraph(neighbor, seen);/* Time O(V + E) | Space O(H) */

        clone.neighbors.push(cloneNeighbor);             /*               | Space O(V + E) */
    }

    return clone;
}

/**
 * https://leetcode.com/problems/clone-graph/
 * Time O(V + E) | Space O(N)
 * @param {Node} node
 * @return {Node}
 */
 var cloneGraph = function(node, seen = new Map()) {
    const isBaseCase = node === null;
    if (isBaseCase) return null;

    seen.set(node, new Node(node.val));                /*               | Space O(N) */

    bfs(new Queue([ node ]), seen);                    /* Time O(V + E) | Space O(N) */

    return seen.get(node);
};

const bfs = (queue, seen) => {
    while (!queue.isEmpty()) {                         /* Time O(V + E) */
        for (let i = (queue.size() - 1); 0 <= i; i--) {/* Time O(W) */
            const node = queue.dequeue();

            cloneNeighbors(node, seen, queue);         /* Space O(N) */ 
        }
    }
}

const cloneNeighbors = (node, seen, queue) => {
    for (const neighbor of node.neighbors) {
        if (!seen.has(neighbor)) {
            seen.set(neighbor, new Node(neighbor.val));/* Space O(N) */
            queue.enqueue(neighbor);                   /* Space O(W) */
        }

        const [ parentClone, neighborClone ] = [ seen.get(node), seen.get(neighbor) ];

        parentClone.neighbors.push(neighborClone);     /* Space O(V + E) */
    }
}
