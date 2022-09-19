/**
 * https://leetcode.com/problems/course-schedule/
 * Time O((V)^2 + E) | Space O(V + E)
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const { graph, path } = buildGraph(numCourses, prerequisites);

    return hasPath(numCourses, graph, path);
}

var initGraph = (numCourses) => ({
    graph: new Array(numCourses).fill().map(() => []),
    path: new Array(numCourses).fill(false)
})

var buildGraph = (numCourses, prerequisites) => {
    const { graph, path } = initGraph(numCourses);

    for (const [ src, dst ] of prerequisites) {
        const neighbors = (graph[dst] || []);

        neighbors.push(src);

        graph[dst] = neighbors;
    }

    return { graph, path };
}

var hasPath = (numCourses, graph, path) => {
    for (let course = 0; course < numCourses; course++) {
        if (isCyclic(course, graph, path)) return false;
    }

    return true;
}

var isCyclic = (currCourse, graph, path) => {
    const hasSeen = path[currCourse]
    if (hasSeen) return true

    const isMissingNext = !(currCourse in graph)
    if (isMissingNext) return false;

    return backTrack(currCourse, graph, path);
}

var backTrack = (currCourse, graph, path) => {
    path[currCourse] = true;
        const _hasCycle = hasCycle(currCourse, graph, path)
    path[currCourse] = false;

    return _hasCycle
}

var hasCycle = (currCourse, graph, path) => {
    for (const neighbor of graph[currCourse]) {
        if (isCyclic(neighbor, graph, path)) return true;
    }

    return false
}

/**
 * https://leetcode.com/problems/course-schedule/
 * Time O(V + E) | Space O(V + E)
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const { graph, visited, path }  = buildGraph(numCourses, prerequisites);

    for (let currCourse = 0; currCourse < numCourses; currCourse++) {
        if (isCyclic(currCourse, graph, visited, path)) return false;
    }

    return true;
}

var initGraph = (numCourses) => ({
    graph: new Array(numCourses).fill().map(() => []),
    visited: new Array(numCourses).fill(false),
    path: new Array(numCourses).fill(false)
})

var buildGraph = (numCourses, prerequisites) => {
    const { graph, visited, path } = initGraph(numCourses);

    for (const [ src, dst ] of prerequisites) {
        const neighbors = (graph[dst] || []);

        neighbors.push(src);

        graph[dst] = neighbors;
    }

    return { graph, visited, path };
}

var isCyclic = (currCourse, graph, visited, path) => {
    const isVisited = visited[currCourse]
    if (isVisited) return false;

    const hasSeen = path[currCourse]
    if (hasSeen) return true;

    const isMissingNext = !(currCourse in graph)
    if (isMissingNext) return false;

    const _isCyclic = backTrack(currCourse, graph, visited, path);

    visited[currCourse] = true;

    return _isCyclic
}

var backTrack = (currCourse, graph, visited, path) => {
    path[currCourse] = true;
        const _hasCycle = hasCycle(currCourse, graph, visited, path)
    path[currCourse] = false;

    return _hasCycle
}

var hasCycle = (currCourse, graph, visited, path) => {
    for (const neighbor of graph[currCourse]) {
        if (isCyclic(neighbor, graph, visited, path)) return true;
    }

    return false
}

/**
 * https://leetcode.com/problems/course-schedule/
 * Time O(V + E) | Space O(V + E)
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const { graph, indegree } = buildGraph(numCourses, prerequisites);
    const topologicalOrder = topologicalSort(graph, indegree);
    const isDirectedAcyclicGraph = topologicalOrder.length === numCourses;

    return isDirectedAcyclicGraph;
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

var topologicalSort = (graph, indegree, order = []) => {
    const queue = searchGraph(graph, indegree);

    bfs(graph, indegree, queue, order);

    return order;
}

var searchGraph = (graph, indegree, queue = new Queue([])) => {
    for (const node in graph) {
        const isSource = indegree[node] === 0;
        if (isSource) queue.enqueue(node);
    }

    return queue;
}

var bfs = (graph, indegree, queue, order) => {
    while (!queue.isEmpty()) {
        for (let i = (queue.size() - 1); 0 <= i; i--) {
            checkNeighbors(graph, indegree, queue, order);
        }
    }
}

var checkNeighbors = (graph, indegree, queue, order) => {
    const node = queue.dequeue();

    order.push(node);

    for (const neighbor of graph[node]) {
        indegree[neighbor]--;

        const isSource = indegree[neighbor] === 0;
        if (isSource) queue.enqueue(neighbor);
    }
}
