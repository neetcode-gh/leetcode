/**
 * Graph | DFS 
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
var minTime = function(n, edges, hasApple) {
    if (n === 1) return 0;
    const result = dfs(0, -1, makeGraph(edges), hasApple) - 2;
    return (result > 0 && result) || 0;
};

const dfs = (curr, pre, graph, hasApple) => {
    let pathLen = 0;
    for (const nextNode of graph[curr]) {
        if (nextNode === pre) continue;
        pathLen += dfs(nextNode, curr, graph, hasApple);
    }   

    if (pathLen > 0 || hasApple[curr]) return pathLen + 2;
    return 0;
}

const makeGraph = (edges) => {
    const graph = {};

    for (let i = 0; i < edges.length; i++) {

        const from = edges[i][0];
        const to = edges[i][1];

        if (!graph[from]) {
            graph[from] = [];
        }

        if (!graph[to]) {
            graph[to] = [];
        };

        graph[to].push(from);
        graph[from].push(to);
    }

    return graph;
}
