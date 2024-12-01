class UnionFind {
    parent: number[];
    rank: number[];

    constructor(n: number) {
        this.parent = new Array(n).fill(0).map((_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(i: number): number {
        while (i !== this.parent[i]) {
            this.parent[i] = this.parent[this.parent[i]];
            i = this.parent[i];
        }
        return i;
    }

    union(a: number, b: number): boolean {
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

function getAdjList(edges: number[][]): Map<number, number[]> {
    let adj = new Map();

    for (let e of edges) {
        let [a, b] = [e[0], e[1]];

        let [adjA, adjB] = [adj.get(a) || [], adj.get(b) || []];

        adjA.push(b);
        adjB.push(a);

        adj.set(a, adjA);
        adj.set(b, adjB);
    }

    return adj;
}

function getValToIndex(vals: number[]): Map<number, number[]> {
    let valToIndex = new Map();

    for (let i in vals) {
        let val = vals[i];
        let arr = valToIndex.get(val) || [];
        arr.push(+i);
        valToIndex.set(val, arr);
    }

    return valToIndex;
}


function numberOfGoodPaths(vals: number[], edges: number[][]): number {
    let adj = getAdjList(edges);
    let valToIndex = getValToIndex(vals);

    let res = 0;
    let uf = new UnionFind(vals.length);

    let keys = Array.from(valToIndex.keys());
    keys.sort((a, b) => a - b);

    for (let val of keys) {
        for (let i of valToIndex.get(val)!) {
            for (let nei of adj.get(i) || []) {
                if (vals[nei] <= vals[i]) {
                    uf.union(nei, i);
                }
            }
        }
        let count = new Map();

        for (let i of valToIndex.get(val)!) {
            let c = count.get(uf.find(i)) || 0;
            count.set(uf.find(i), c + 1);
            res += count.get(uf.find(i));
        }
    }

    return res;
}
