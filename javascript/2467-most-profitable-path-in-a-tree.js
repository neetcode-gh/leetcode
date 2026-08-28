/**
 * Time O(n) | Space O(n)
 * Graph | DFS
 * https://leetcode.com/problems/most-profitable-path-in-a-tree
 * @param {number[][]} edges
 * @param {number} bob
 * @param {number[]} amount
 * @return {number}
 */
var mostProfitablePath = function(edges, bob, amount) {

    const tree = makeBiDirectionalTree(edges);
    const reverseTree = makeParentLinks(tree);
    const bobTime = {};

    const bobDfs = (node, time) => {

        bobTime[node] = time;
        if (node === 0) return;

        const parentNode = reverseTree[node];
        bobDfs(parentNode, time+1);
    }

    bobDfs(bob, 0);


    let max = -Infinity;
    const visited = new Set();

    const aliceDfs = (node, time, currScore) => {

        if (visited.has(node)) return;
        visited.add(node);
        
        if (time < bobTime[node] || bobTime[node] === undefined) {
            currScore = currScore + amount[node];
        }
        if (time === bobTime[node]) {
            currScore = currScore + (amount[node]/2);
        }
        
        if (visited.has(tree[node][0]) && tree[node].length === 1) {
            max = Math.max(currScore, max);
            return;
        }

        const neighbors = tree[node];

        for (let i = 0; i < neighbors.length; i++) {
            
            const nextNode = neighbors[i];
            aliceDfs(nextNode, time+1, currScore);
        }
    }
    
    aliceDfs(0, 0, 0);
    return max;
};


const makeBiDirectionalTree = (edges) => {
    const tree = {};

    for (let i = 0; i < edges.length; i++) {

        const parent = edges[i][0];
        const child = edges[i][1];

        if (tree[parent]) {
            tree[parent].push(child);
        } else {
            tree[parent] = [child]
        }

        if (tree[child]) {
            tree[child].push(parent);
        } else {
            tree[child] = [parent];
        }
    }

    return tree;
}

const makeParentLinks = (tree) => {

    const reverseTree = {};

    const visited = new Set();

    const dfs = (parent, node) => {
        
        if (visited.has(node)) return;
        visited.add(node);
        reverseTree[node] = parent;
        
        const neighbors = tree[node] || [];
        for (let i = 0; i < neighbors.length; i++) {
            const nextNode = neighbors[i];
            dfs(node, nextNode);
        }
    }

    dfs(-1, 0);

    return reverseTree;
}
