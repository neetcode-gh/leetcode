/**
 * DFS 
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/
 * @param {number} n
 * @param {number[][]} edges
 * @param {boolean[]} hasApple
 * @return {number}
 */
var minTime = function(n, edges, hasApple) {
    
    if(n === 1) return 0;

    const tree = {};

    for(let i = 0; i < edges.length; i++) {

        const parent = edges[i][0];
        const child = edges[i][1];

        if(!tree[parent]) {
            tree[parent] = [];
        }

        if(!tree[child]) {
            tree[child] = [];
        };

        tree[child].push(parent);
        tree[parent].push(child);
    }

    const dfs = (curr, pre) => {

        let pathLen = 0;
        for(const nextNode of tree[curr]) {
            if(nextNode === pre) continue;
            pathLen += dfs(nextNode, curr);
        }   

        if(pathLen > 0 || hasApple[curr]) return pathLen+2;
        return 0;
    }

    const result = dfs(0, -1) - 2;
    return (result > 0 && result) || 0;
};
