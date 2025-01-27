/**
 * Topological Sort | Hash Map | better approch
 * Time O(n^2) + Q | Time O(n^2)
 * https://leetcode.com/problems/course-schedule-iv/
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var checkIfPrerequisite = function(numCourses, prerequisites, queries) {
    
    const graph = makeDirectedGraph(prerequisites);

    const topologicalSet = {};

    const dfs = (node) => {

        if (topologicalSet[node]) return topologicalSet[node];

        const neighbors = graph[node] || [];

        let preReq = [node];
        for (let i = 0; i < neighbors.length; i++) {
            
            const nextNode = neighbors[i];

            const preReq1 = dfs(nextNode);
            preReq = [...preReq, ...preReq1];
        }

        topologicalSet[node] = new Set(preReq);
        return topologicalSet[node];
    }

    for (let i = 0; i < numCourses; i++) {
        dfs(i);
    }

    const ans = [];

    console.log(topologicalSet);
    for (let i = 0; i < queries.length; i++) {
        
        const [pre, cour] = queries[i];
        if (topologicalSet[cour].has(pre)) {
            ans.push(true)
        } else {
            ans.push(false);
        }
    }

    return ans;    
};

const makeDirectedGraph = (edges) => {
    // we're making graph the reverse way read the problem again and you'll get why.
    const graph = {};
    for (let i = 0; i < edges.length;  i++) {
        
        const [to, from] = edges[i];
        
        if (graph[from]) {
            graph[from].push(to);
        } else {
            graph[from] = [to];
        }
    }

    return graph;
}
