/**
 * Graph - BFS
 * Queue - Space (WIDTH)
 * Array - Greedy
 * https://leetcode.com/problems/network-delay-time/
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var networkDelayTime = (times, n, k) => {
    const { graph, maxTime, queue } = buildGraph(times, n, k);

    bfs(queue, graph, maxTime, k);

    return checkAns(maxTime);
};

var initGraph = (n, k) => ({
    graph: Array.from({ length: n + 1}).fill().map(() => []),
    maxTime: Array.from({ length: n + 1}).fill(Infinity),
    queue: new Queue([[ k, 0 ]])
})

var buildGraph = (times, n, k) => {
    const { graph, maxTime, queue } = initGraph(n, k);

    for (const [ src, dst, weight ] of times ) {
        graph[src].push([ dst, weight ]);
    };

    maxTime[0] = 0;

    return { graph, maxTime, queue };
}

var bfs = (queue, graph, maxTime) => {
    while (!queue.isEmpty()) {
        for (let level = (queue.size() -1); (0 <= level); level-- ) {
            checkNeighbors(queue, graph, maxTime);
        }
    }
}

var checkNeighbors = (queue, graph, maxTime) => {
    const [ node, time ] = queue.dequeue();

    const canUpdate = (time < maxTime[node]);
    if (!canUpdate) return;

    maxTime[node] = time;

    for (const [ dst, weight ] of graph[node]) {
        queue.enqueue([ dst, (weight + time) ]);
    }
}

var checkAns = (maxTime) => {
    const max = Math.max(...maxTime);

    return (max < Infinity)
        ? max
        : (-1);
}

/**
 * https://leetcode.com/problems/network-delay-time/
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
 var networkDelayTime =  (times, n, k) => {
    const { graph, seen, minHeap } = buildGraph(times, n, k) 
    const maxTime = getTime(graph, seen, minHeap);

    return (seen.size === n)
        ? maxTime 
        : -1;
};

var initGraph = (n, k) => ({
    graph: Array.from({ length: n + 1}).fill().map(() => []),
    seen: new Set(),
    minHeap: new MinPriorityQueue()
})

var buildGraph = (times, n, k) => {
    const { graph, seen, minHeap } = initGraph(n, k);

    for (const [ src, dst, weight ] of times ) {
        graph[src].push([ dst, weight ]);
    };

    minHeap.enqueue([k, 0], 0);

    return { graph, seen, minHeap };
}

const getTime = (graph, seen, minHeap, maxTime = 0) => {
    while (!minHeap.isEmpty()) {
        const [ node, cost ] = minHeap.dequeue().element;

        if (seen.has(node)) continue;
        seen.add(node);

        maxTime = Math.max(maxTime, cost);
        checkNeighbors(graph, node, cost, seen, minHeap);
    }

    return maxTime;
}

var checkNeighbors = (graph, src, srcCost, seen, minHeap) => {
    for (const [ dst, dstCost ] of graph[src]) {
        if (seen.has(dst)) continue;

        const cost = (dstCost + srcCost)
        const node = [ dst,  cost];

        minHeap.enqueue(node, cost);
    }
}