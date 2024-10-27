/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS | Preorder Traversal
 * Time O(n) | Space  O(n)
 * https://leetcode.com/problems/leaf-similar-trees/
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {

    const dfs = (node, arr) => {
        if (!node.left && !node.right) {
            arr.push(node.val);
            return arr;
        }
        if (node.left) dfs(node.left, arr);
        if (node.right) dfs(node.right, arr);

        return arr;
    }

    const arr1 = dfs(root1, []);
    const arr2 = dfs(root2, []);

    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
};
