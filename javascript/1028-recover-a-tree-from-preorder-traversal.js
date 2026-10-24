/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * PreOrderTraversal | DFS | Tree
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/recover-a-tree-from-preorder-traversal
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function(traversal) {
    let i = 0;
    const preOrderArr = [];
    const depthArr = [];

    while (i < traversal.length) {

        const start = i;
        if (traversal[i] === "-") {
            while (i < traversal.length && traversal[i] === "-") {
                i++;
            }
            depthArr.push(i-start);
            continue;
        }

        while (i < traversal.length && traversal[i] !== "-") {
            i++;
        }
        preOrderArr.push(+traversal.slice(start, i));
    }

    let idx = 0;
    const dfs = (node, depth) => {
        
        node.val = preOrderArr[idx];

        if (depth < depthArr[idx]) {
            node.left = new TreeNode();
            idx++;
            dfs(node.left, depth+1);
        }
        if (depth < depthArr[idx]) {
            node.right = new TreeNode();
            idx++;
            dfs(node.right, depth+1);
        }
    }

    const root = new TreeNode();
    dfs(root, 0);
    return root;
};
