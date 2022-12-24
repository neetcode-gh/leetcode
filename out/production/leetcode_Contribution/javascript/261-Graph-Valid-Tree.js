/**
 * https://leetcode.com/problems/graph-valid-tree/
 * Time O(E * a(N)) | Space O(V)
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges, root = 0) {
    const isEqual = edges.length === (n - 1)
    if (!isEqual) return false;

    const { graph, visited } = buildGraph(n, edges)

    dfs(root, graph, visited);

    return visited.size === n;
}

var initGraph = (n) => ({
    graph: new Array(n).fill().map(() => []),
    visited: new Set()
})

var buildGraph = (n, edges) => {
    const { graph, visited } = initGraph(n)

    for (const [ src, dst ] of edges) {
        graph[src].push(dst);
        graph[dst].push(src);
    }

    return { graph, visited }
}

const dfs = (node, graph, visited) => {
    if (visited.has(node)) return;
    visited.add(node);

    for (const neighbor of graph[node]) {
        dfs(neighbor, graph, visited);
    }
}

/**
 * https://leetcode.com/problems/graph-valid-tree/
 * Time O(E * a(N)) | Space O(V)
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
    const isEqual = edges.length === (n - 1)
    if (!isEqual) return false;

    const { graph, visited, queue } = buildGraph(n, edges)

    bfs(graph, visited, queue)

    return visited.size === n;
}

var initGraph = (n) => ({
    graph: new Array(n).fill().map(() => []),
    visited: new Set(),
    queue: new Queue(),
    root: 0
})

var buildGraph = (n, edges) => {
    const { graph, visited, queue, root } = initGraph(n)

    for (const [ src, dst ] of edges) {
        graph[src].push(dst);
        graph[dst].push(src);
    }

    queue.enqueue(root);
    visited.add(root);

    return { graph, visited, queue }
}

const bfs = (graph, visited, queue) => {
    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {
            checkNeighbor(graph, visited, queue)
        }
    }
}

const checkNeighbor = (graph, visited, queue) => {
    const node = queue.dequeue();

    for (const neighbor of graph[node]) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);

        queue.enqueue(neighbor);
    }
}

/**
 * https://leetcode.com/problems/graph-valid-tree/
 * Time O(E * a(N)) | Space O(V)
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
    const union = new Array(n).fill(-1)

    for (const [ src, dst ] of edges) {
        const [ x, y ] = [ find(union, src), find(union, dst) ]

        const hasCycle = x === y
        if (hasCycle) return false

        compress(union, x, y)
    }

    const isValid = edges.length === (n - 1)
    return isValid
};

const compress = (union, i, head) => union[i] = head

const find = (union, i, num = union[i]) => {
    const isEmpty = num === -1
    if (isEmpty) return i

    const head = find(union, num)

    compress(union, i, head)

    return union[i]
}
