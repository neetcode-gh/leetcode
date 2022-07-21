/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    const res = [root.val];

    // return max path sum without split
    function dfs(root) {
        if (!root) {
            return 0;
        }

        let leftMax = dfs(root.left);
        let rightMax = dfs(root.right);
        leftMax = Math.max(leftMax, 0);
        rightMax = Math.max(rightMax, 0);

        // compute max path sum WITH split
        res[0] = Math.max(res[0], root.val + leftMax + rightMax);

        return root.val + Math.max(leftMax, rightMax);
    }

    dfs(root);
    return res[0];
};
