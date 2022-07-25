function buildGraph(n, edges) {
    const graph = Array.from({ length: n }, () => []);

    for (let edge of edges) {
        let [a, b] = edge;

        if (!(a in graph)) graph[a] = [];
        if (!(b in graph)) graph[b] = [];

        graph[a].push(b);
        graph[b].push(a);
    }
    return graph;
}

var countComponents = function (n, edges) {
    const graph = buildGraph(n, edges);
    let count = 0;
    let visited = new Set();

    function explore(graph, current, visited) {
        if (visited.has(current.toString())) return;

        visited.add(current.toString());

        for (let neighbor of graph[current]) {
            explore(graph, neighbor, visited);
        }
        return true;
    }

    for (let node in graph) {
        if (explore(graph, node, visited)) {
            count += 1;
        }
    }
    return count;
};
