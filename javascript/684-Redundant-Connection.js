/**
 * https://leetcode.com/problems/redundant-connection/
 * Time O((V)^2 + E) | Space O(V + E)
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    const graph = new Array((1000 + 1)).fill().map(() => []);

    for (const [ src, dst ] of edges) {
        const hasNodes = (src in graph) && (dst in graph)
        if (hasNodes && hasRedundantConnection(graph, src, dst)) return [ src, dst ];

        graph[src].push(dst);
        graph[dst].push(src);
    }
}

const hasRedundantConnection = (graph, source, target, seen = new Set()) => {
    if (seen.has(source)) return false
    seen.add(source);

    const isEqual = source === target
    if (isEqual) return true;

    return dfs(graph, source, target, seen);
}

const dfs = (graph, source, target, seen) => {
    for (const neighbor of graph[source]) {
        if (hasRedundantConnection(graph, neighbor, target, seen)) return true;
    }

    return false;
}

/**
 * https://leetcode.com/problems/redundant-connection/
 * Time O(V + E) | Space O(V + E)
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    return new UnionFind(edges)
        .redundantConnection;
};

class UnionFind {
    constructor (edges) {
        this.parent = new Array(edges.length + 1).fill().map((_, index) => index);
        this.rank = new Array(edges.length + 1).fill(1);
        this.redundantConnection = [ -1, -1 ];

        this.search(edges);
    }

    search (edges) {
        for (let [ src, dst ] of edges) {
            const hasConnection = this.union(src, dst);
            if (!hasConnection) return (this.redundantConnection = [ src, dst ]);
        }
    }

    find (node, { parent } = this) {
        let head = parent[node];

        const isEqual = () => head === parent[head];
        while (!isEqual()) {
            const tail = parent[parent[head]];

            this.compress(head, tail);
            head = parent[head];
        }

        return head;
    }

    compress (tail, head, { parent } = this) {
        parent[tail] = head;
    }
    
    increaseRank (head, tail, { rank } = this) {
        rank[head] += rank[tail];
    }

    union (src, dst, { rank } = this) {
        const [ rootSrc, rootDst ] = [ this.find(src), this.find(dst) ];

        const hasCycle = rootSrc === rootDst;
        if (hasCycle) return false;

        const isSrcGreater = rank[rootDst] < rank[rootSrc];
        if (isSrcGreater) {
            this.increaseRank(rootDst, rootSrc)
            this.compress(rootSrc, rootDst)
        }

        const isDstGreater = rank[rootSrc] <= rank[rootDst];
        if (isDstGreater) {
            this.increaseRank(rootSrc, rootDst)
            this.compress(rootDst, rootSrc)
        }

        return true;
    }
}
