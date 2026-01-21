/**
 * Topological Sort | DFS
 * Time O(n*m) | Space O(n)
 * https://leetcode.com/problems/find-eventual-safe-states
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    
    const visited = new Set();
    const safeNodes = new Set();

    const dfs = (node) => {
        
        if (safeNodes.has(node)) return true;
        if (visited.has(node)) return false;
        
        visited.add(node);

        const neighbors = graph[node];
        for (let i = 0; i < neighbors.length; i++) {
            const neighborNode = neighbors[i];
            if (!dfs(neighborNode)) return false;
        }

        visited.delete(node);
        safeNodes.add(node);
        return true;
    }

    for (let i = 0; i < graph.length; i++) {
        const node = i;
        dfs(node);
    }

    return [...safeNodes].sort((a,b) => a-b);
};
