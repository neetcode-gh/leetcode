/**
 * https://leetcode.com/problems/course-schedule-ii/
 * Time O(V + E) | Space O(V + E)
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    const { graph, color, isDirectedAcyclicGraph, topologicalOrder } = buildGraph(numCourses, prerequisites);

    search(numCourses, graph, color, topologicalOrder, isDirectedAcyclicGraph)

    return isDirectedAcyclicGraph[0]
        ? topologicalOrder.reverse()
        : []
}

var initGraph = (numCourses) => ({
    graph: new Array(numCourses).fill().map(() => []),
    color: new Array(numCourses).fill(1), // White
    isDirectedAcyclicGraph: [ true ], 
    topologicalOrder: []
})

var buildGraph = (numCourses, prerequisites) => {
    const { graph, color, isDirectedAcyclicGraph, topologicalOrder } = initGraph(numCourses);

    for (const [ src, dst ] of prerequisites) {
        const neighbors = (graph[dst] || []);

        neighbors.push(src);
        graph[dst] = neighbors;
    }

    return { graph, color, isDirectedAcyclicGraph, topologicalOrder }
}

var search = (numCourses, graph, color, topologicalOrder, isDirectedAcyclicGraph) => {
    for (let i = 0; i < numCourses; i++) {
        const isNew = color[i] === 1 // White
        if (isNew) dfs(i, graph, color, topologicalOrder, isDirectedAcyclicGraph);
    }
}

var dfs = (node, graph, color, topologicalOrder, isDirectedAcyclicGraph) => {
    const hasCycle = !isDirectedAcyclicGraph[0]
    if (hasCycle) return;

    colorBackTrack(node, graph, color, topologicalOrder, isDirectedAcyclicGraph)

    topologicalOrder.push(node);
}

const colorBackTrack = (node, graph, color, topologicalOrder, isDirectedAcyclicGraph) => {
    color[node] = 2; // Grey
        checkNeighbors(node, graph, color, topologicalOrder, isDirectedAcyclicGraph)
    color[node] = 3; // Black
}

var checkNeighbors = (node, graph, color, topologicalOrder, isDirectedAcyclicGraph) => {
    for (const neighbor of graph[node]) {
        const isNew = color[neighbor] === 1 // White
        if (isNew) dfs(neighbor, graph, color, topologicalOrder, isDirectedAcyclicGraph);

        const isCycle = color[neighbor] === 2 // Grey
        if (isCycle) isDirectedAcyclicGraph[0] = false;
    }
}

/**
 * https://leetcode.com/problems/course-schedule-ii/
 * Time O(V + E) | Space O(V + E)
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    const { graph, indegree } = buildGraph(numCourses, prerequisites);
    const reversedTopologicalOrder = topologicalSort(graph, indegree);
    const isDirectedAcyclicGraph = reversedTopologicalOrder.length === numCourses;

    return isDirectedAcyclicGraph
        ? reversedTopologicalOrder
        : [];
};

var initGraph = (numCourses) => ({
    graph: new Array(numCourses).fill().map(() => []),
    indegree: new Array(numCourses).fill(0)
})

var buildGraph = (numCourses, prerequisites) => {
    const { graph, indegree } = initGraph(numCourses);

    for (const [ src, dst ] of prerequisites){
        graph[src].push(dst);
        indegree[dst]++;
    }

    return { graph, indegree };
}

var topologicalSort = (graph, indegree) => {
    const queue = searchGraph(graph, indegree);

    return bfs(graph, indegree, queue);
}

var isSource = (count) => count === 0;

var searchGraph = (graph, indegree, queue = new Queue([])) => {
    for (const node in graph) {
        if (isSource(indegree[node])) queue.enqueue(node);
    }

    return queue;
}

var bfs = (graph, indegree, queue, reversedOrder = []) => {
    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {
            checkNeighbors(graph, indegree, queue, reversedOrder);
        }
    }

    return reversedOrder.reverse();
}

var checkNeighbors = (graph, indegree, queue, reversedOrder) => {
    const node = queue.dequeue();

    reversedOrder.push(node);

    for (const neighbor of graph[node]) {
        indegree[neighbor]--;

        if (isSource(indegree[neighbor])) queue.enqueue(neighbor);
    }
}