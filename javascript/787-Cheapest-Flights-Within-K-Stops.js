/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
 var findCheapestPrice = function (n, flights, src, dst, K) {
    const { graph, seen, minHeap } = buildGraph(n, flights, src, dst, K);

    return search(graph, src, dst, seen, minHeap);
};

var initGraph = (n) => ({
    graph: new Array(n).fill().map(() => []),
    seen: new Map(),
    minHeap: new MinPriorityQueue(),
})

var buildGraph = (n, flights, src, dst, K) => {
    const { graph, seen, minHeap } = initGraph(n);

    for (const [ src, dst, cost ] of flights) {
        graph[src].push([ dst, cost ]);
    }

    const priority = 0;
    const node = [ priority, src, (K + 1) ];

    minHeap.enqueue(node, priority);

    return { graph, seen, minHeap };
}

const search = (graph, src, dst, seen, minHeap) => {
    while (!minHeap.isEmpty()) {
        const [ cost, city, stops ] = minHeap.dequeue().element;

        seen.set(city, stops);

        const isTarget = (city === dst);
        if (isTarget) return cost;

        const canSkip = (stops <= 0);
        if (canSkip) continue;

        checkNeighbors(graph, cost, city, stops, seen, minHeap);
    }

    return -1;
}

var checkNeighbors = (graph, cost, city, stops, seen, minHeap) => {
    for (let [ nextCity, nextCost ] of graph[city]) {
        const hasSeen = (seen.has(nextCity) && ((stops - 1) <= seen.get(nextCity)));
        if (hasSeen) continue;

        const priority = (cost + nextCost)
        const node = [ priority, nextCity, (stops - 1)];

        minHeap.enqueue(node, priority);
    }
}