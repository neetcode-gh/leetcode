/**
 * https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
 * Time O(V + E) | Space O(V + E)
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges, count = 0) {
    const { graph, visited } = buildGraph(n, edges);

    for (const node in graph) {
        if (hasPath(graph, node, visited)) count++;
    }

    return count;
};

const initGraph = (n) => ({
    graph: new Array(n).fill().map(() => []),
    visited: new Array(n).fill(false),
});

const buildGraph = (n, edges) => {
    const { graph, visited } = initGraph(n)

    for (const [ src, dst ] of edges) {
        graph[src].push(dst);
        graph[dst].push(src);
    }

    return { graph, visited };
}

const hasPath = (graph, current, visited) => {
    if (visited[current]) return false;
    visited[current] = current;

    for (const neighbor of graph[current]) {
        hasPath(graph, neighbor, visited);
    }

    return true;
}

/**
 * https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
 * Time O(E * a(N)) | Space O(V)
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
 var countComponents = function(n, edges) {
    return new UnionFind(n, edges)
        .connectedComponents;
};

class UnionFind {
    constructor (n, edges) {
        this.parent = new Array(n).fill().map((_, index) => index),
        this.rank = new Array(n).fill(1)
        this.connectedComponents = n;

        this.search(edges);
    }

    search (edges) {
        for (const [ src, dst ] of edges) {
            this.union(src, dst)
        }
    }

    find (head, tail = head, { parent } = this) {
        const isEqual = () => head === parent[head]
        while (!isEqual()) {
            head = parent[head];
        }

        this.compress(tail, head);

        return head
    }

    compress (tail, head, { parent } = this) {
        parent[tail] = head;
    }
    
    increaseRank (head, tail, { rank } = this) {
        rank[head] += rank[tail];
    }

    union (src, dst, { rank } = this) {
        const [ rootSrc, rootDst ] = [ this.find(src), this.find(dst) ]

        const hasCycle = rootSrc === rootDst
        if (hasCycle) return

        this.connectedComponents--;

        const isGreater = rank[rootSrc] < rank[rootDst]
        if (isGreater) {
            this.increaseRank(rootDst, rootSrc)
            this.compress(rootSrc, rootDst)
        }

        const isLess = rank[rootDst] <= rank[rootSrc]
        if (isLess) {
            this.increaseRank(rootSrc, rootDst)
            this.compress(rootDst, rootSrc)
        }
    }
}
