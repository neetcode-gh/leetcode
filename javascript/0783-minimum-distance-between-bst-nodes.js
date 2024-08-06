/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS (level order traversal)
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/minimum-distance-between-bst-nodes/
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {
    
    const sortedArr = [];

    // levelOrderTraversal
    const dfs = (node) => {
        if(!node) return;

        dfs(node.left);
        sortedArr.push(node.val)
        dfs(node.right);
    }

    dfs(root);

    let min = Infinity;

    for(let i = 1; i < sortedArr.length; i++) {
        min = Math.min(min, sortedArr[i] - sortedArr[i-1]);
    }

    return min;
};
