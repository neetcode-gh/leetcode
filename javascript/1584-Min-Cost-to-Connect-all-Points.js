/**
 * Prim's algorithm
 * https://leetcode.com/problems/min-cost-to-connect-all-points/solution/
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints = (points) => {
    const isBaseCase = ((points.length === 0) || (1000 <= points.length));
    if (isBaseCase) return 0;

    const { graph, seen, minHeap } = buildGraph(points);

    return search(points, graph, seen, minHeap);
};

const initGraph = (points) => ({
    graph: new Array(points.length).fill().map(() => []),
    seen: new Array(points.length).fill(false),
    minHeap: new MinPriorityQueue()
})

const buildGraph = (points) => {
    const { graph, seen, minHeap } = initGraph(points);

    for (let src = 0; src < (points.length - 1); src++) {
        for (let dst = (src + 1); (dst < points.length); dst++) {
            const cost = getCost(points, src, dst);

            graph[src].push([ dst, cost ]);
            graph[dst].push([ src, cost ]);
        }
    }

    const [ src, cost, priority ] = [ 0, 0, 0 ];
    const node = [ src, cost ];

    minHeap.enqueue(node, priority);

    return { graph, seen, minHeap };
}

const getCost = (points, src, dst) => {
    const [ [ x1, y1 ], [ x2, y2 ] ] = [ points[src], points[dst] ];

    return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
}

const search = (points, graph, seen, minHeap, nodeCount = 0, cost = 0) => {
    while (nodeCount < points.length) {
        let [ src, srcCost ] = minHeap.dequeue().element;

        if (seen[src]) continue;
        seen[src] = true;

        cost += srcCost;
        nodeCount += 1;

        checkNeighbors(graph, src, seen, minHeap);
    }

    return cost;
}

const checkNeighbors = (graph, src, seen, minHeap) => {
    for (const [ dst, dstCost ] of graph[src]) {
        if (seen[dst]) continue;

        minHeap.enqueue([ dst, dstCost ], dstCost);
    }
}