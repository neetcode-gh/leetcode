function maxProbability(n: number, edges: number[][], succProb: number[], startNode: number, endNode: number): number {
    const adjList = new Map(
        Array.from({ length: n }, (_, i) => [i, []])
    );

    for (let i = 0; i < edges.length; i++) {
        const [origin, target] = edges[i];
        const prob = succProb[i];

        adjList.get(origin).push([target, prob]);
        adjList.get(target).push([origin, prob]);
    }

    const table = new Array(n).fill(0);
    table[startNode] = 1;

    const heap = new MaxPriorityQueue({ priority: (a) => a[1] });
    for (let edge of adjList.get(startNode)) {
        heap.enqueue(edge);
    }

    while (!heap.isEmpty()) {
        const { element: maxEdge  } = heap.dequeue();

        if (table[maxEdge[0]] >= maxEdge[1]) continue;
        table[maxEdge[0]] = maxEdge[1];
        for (let edge of adjList.get(maxEdge[0])) {
            heap.enqueue([edge[0], edge[1] * maxEdge[1]]);
        }
    }

    return table[endNode];
};
