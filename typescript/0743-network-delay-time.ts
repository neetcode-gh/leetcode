function networkDelayTime(times: number[][], n: number, k: number): number {
    const adjList = new Map<number, [number, number][]>(Array.from({ length: n + 1 }, (_, i) => [i, []]));
    for (let [origin, destination, weight] of times) {
        adjList.get(origin).push([destination, weight]);
    }

    const table = new Array(n + 1);
    for (let i = 1; i < table.length; i++) {
        table[i] = -1;
    }
    table[k] = 0;
    const heap = new MinPriorityQueue({ priority: (a) => a[1] });
    for (let [destination, weight] of (adjList.get(k) || [])) {
        heap.enqueue([destination, weight]);
    }

    while (!heap.isEmpty()) {
        const { element: minEdge } = heap.dequeue();

        if (table[minEdge[0]] !== -1 && minEdge[1] >= table[minEdge[0]]) continue;
        table[minEdge[0]] = minEdge[1];

        for (let edge of (adjList.get(minEdge[0]) || [])) {
            heap.enqueue([edge[0], minEdge[1] + edge[1]]);
        }
    }

    let max = 0;
    for (let i = 1; i < table.length; i++) {
        if (table[i] === -1) return -1;
        max = Math.max(max, table[i]);
    }

    return max;
};
