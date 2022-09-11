/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
    if (edges.length !== n - 1) return false;

    const unionFind = new UnionFind(n);
    for (const edge of edges) {
        if (unionFind.connected(...edge)) return false;

        unionFind.union(...edge);
    }

    return true;
};

class UnionFind {
    constructor(n) {
        this.root = Array(n)
            .fill(null)
            .map((_, id) => id); // [0, 1, 2, .., n-1]
        this.rank = Array(n).fill(1);
    }

    union(nodeA, nodeB) {
        const rootA = this.find(nodeA);
        const rootB = this.find(nodeB);

        if (rootA === rootB) return;

        if (this.rank[rootA] < this.rank[rootB]) {
            this.root[rootA] = rootB;
        } else if (this.rank[rootA] > this.rank[rootB]) {
            this.root[rootB] = rootA;
        } else {
            this.root[rootA] = rootB;
            this.rank[rootB] += 1;
        }
    }

    find(node) {
        if (this.root[node] === node) return node;

        return (this.root[node] = this.find(this.root[node]));
    }

    connected(nodeA, nodeB) {
        return this.find(nodeA) === this.find(nodeB);
    }
}
