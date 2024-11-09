/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS | Recursion
 * Time O(2^n) | Space O(2^n)
 * https://leetcode.com/problems/all-possible-full-binary-trees/
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function(n) {
    
    // even number of nodes can't make a full binary tree.
    if(!(n % 2)) return [];

    const dfs = (n) => {
        if(n === 1) return [new TreeNode(0)];

        const allPossibleTrees = [];
        for(let i = 1; i < n; i += 2) {

            const leftNumOfNodes = i;
            const rightNumOfNodes = n - i - 1;

            const leftTrees = dfs(leftNumOfNodes);
            const rightTrees = dfs(rightNumOfNodes);

            for(let i = 0; i < leftTrees.length; i++) {
                for(let j = 0; j < rightTrees.length; j++) {
                    const root = new TreeNode(0, leftTrees[i], rightTrees[j]);
                    allPossibleTrees.push(root);
                }
            }
        }

        return allPossibleTrees;
    }

    return dfs(n);
};
