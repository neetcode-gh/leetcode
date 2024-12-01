class UnionFind {
    constructor(n) {
        this.parent = new Array(n).fill(0).map((_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    /**
     *
     * @param {number} i
     * @returns {number}
     */
    find(i) {
        while (i !== this.parent[i]) {
            this.parent[i] = this.parent[this.parent[i]];
            i = this.parent[i];
        }
        return i;
    }

    /**
     *
     * @param {number} a
     * @param {number} b
     * @returns {boolean}
     */
    union(a, b) {
        let [aRoot, bRoot] = [this.find(a), this.find(b)];

        if (aRoot == bRoot) return false;

        if (this.rank[aRoot] < this.rank[bRoot]) {
            this.parent[aRoot] = bRoot;
            this.rank[bRoot] += this.rank[aRoot];
        } else {
            this.parent[bRoot] = aRoot;
            this.rank[aRoot] += this.rank[bRoot];
        }

        return true;
    }
}

/**
 *
 * @param {number[number[]]} edges
 * @returns {Map<number, number[]>}
 */
const getAdjList = (edges) => {
    let adj = new Map();

    for (e of edges) {
        let [a, b] = [e[0], e[1]];

        let [adjA, adjB] = [adj.get(a) || [], adj.get(b) || []];

        adjA.push(b);
        adjB.push(a);

        adj.set(a, adjA);
        adj.set(b, adjB);
    }

    return adj;
};

const getValToIndex = (vals) => {
    let valToIndex = new Map();

    for (i in vals) {
        let val = vals[i];
        let arr = valToIndex.get(val) || [];
        arr.push(+i);
        valToIndex.set(val, arr);
    }

    return valToIndex;
};

/**
 *
 * @param {number[]} vals
 * @param {number[number[]]} edges
 * @returns {number}
 */
const numberOfGoodPaths = (vals, edges) => {
    let adj = getAdjList(edges);
    let valToIndex = getValToIndex(vals);

    let res = 0;
    let uf = new UnionFind(vals.length);

    let keys = Array.from(valToIndex.keys());
    keys.sort((a, b) => a - b);

    for (let val of keys) {
        for (let i of valToIndex.get(val)) {
            for (let nei of adj.get(i) || []) {
                if (vals[nei] <= vals[i]) {
                    uf.union(nei, i);
                }
            }
        }
        let count = new Map();

        for (let i of valToIndex.get(val)) {
            let c = count.get(uf.find(i)) || 0;
            count.set(uf.find(i), c + 1);
            res += count.get(uf.find(i));
        }
    }

    return res;
};
