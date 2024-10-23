/**
 * InOrder Traversal 
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/construct-string-from-binary-tree/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */
var tree2str = function(root) {
    return dfs(root, []).join("");
};

const dfs = (node, strArr) => {
    if (!node) return;

    strArr.push(node.val);

    if (node.right || node.left) strArr.push("(");
    dfs(node.left, strArr);
    if (node.right || node.left) strArr.push(")");

    // right tree
    if (node.right) strArr.push("(");
    dfs(node.right, strArr);
    if (node.right) strArr.push(")");

    return strArr;
}
