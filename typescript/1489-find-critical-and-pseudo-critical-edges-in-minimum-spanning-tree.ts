type Edge = [number, number, number];

class UnionFind {
    parents: number[];
    ranks: number[];

    constructor(n: number) {
        this.parents = Array.from({ length: n }, (_, i) => i);
        this.ranks = Array.from({ length: n }, () => 0);
    }

    find(node: number) {
        let current = this.parents[node];
        while (current !== this.parents[current]) {
            this.parents[current] = this.parents[this.parents[current]];
            current = this.parents[current];
        }

        return current;
    }

    union(a: number, b: number) {
        const pa = this.find(a);
        const pb = this.find(b);

        if (pa === pb) return false;
        if (this.ranks[pa] > this.ranks[pb]) {
            this.parents[pb] = pa;
        } else if (this.ranks[pa] < this.ranks[pb]) {
            this.parents[pa] = pb;
        } else {
            this.parents[pb] = pa;
            this.ranks[pa]++;
        }

        return true;
    }
}

function findMST(n: number, edges: Edge[], heap: typeof MinPriorityQueue): { edges: Edge[], sum: number } {
    const unionFind = new UnionFind(n);
    const resultingEdges = [];
    let sum = 0;

    if (!heap.isEmpty()) {
        const { element: minEdge } = heap.dequeue();
        unionFind.union(minEdge[0], minEdge[1]);
        resultingEdges.push(minEdge);
        sum += minEdge[2];
    }

    for (let edge of edges) {
        heap.enqueue(edge);
    }

    while (!heap.isEmpty() && resultingEdges.length < n - 1) {
        const { element: minEdge } = heap.dequeue();
        const isUnion = unionFind.union(minEdge[0], minEdge[1]);

        if (!isUnion) continue;
        resultingEdges.push(minEdge);
        sum += minEdge[2];
    }
    if (resultingEdges.length < n - 1) return { sum: Infinity, edges: [] };

    return { edges: resultingEdges, sum };
}

function buildHeap() {
    return new MinPriorityQueue({ priority: edge => edge[2] });
}

function findCriticalAndPseudoCriticalEdges(n: number, edges: Edge[]): number[][] {
    const generalMST = findMST(n, edges, buildHeap());
    const criticalEdges = [];

    for (let edgeToExclude of generalMST.edges) {
        const newEdges = edges.filter(edge => edge.join(',') !== edgeToExclude.join(','));
        const mst = findMST(n, newEdges, buildHeap());

        if (mst.sum > generalMST.sum) {
            criticalEdges.push(edgeToExclude);
        }
    }

    const pseudoCriticalEdges = [];
    for (let edge of edges) {
        if (criticalEdges.map(e => e.join(',')).includes(edge.join(','))) continue;
        const newEdges = edges.filter(possibleEdge => possibleEdge.join(',') !== edge.join(','));

        const heap = buildHeap();
        heap.enqueue(edge);

        const mst = findMST(n, newEdges, heap);
        if (mst.sum === generalMST.sum) {
            pseudoCriticalEdges.push(edge);
        }
    }

    return [
        criticalEdges.map(criticalEdge => edges.findIndex(edge => edge.join(',') === criticalEdge.join(','))),
        pseudoCriticalEdges.map(pCriticalEdge => edges.findIndex(edge => edge.join(',') === pCriticalEdge.join(','))),
    ];
};
