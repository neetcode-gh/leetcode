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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    
    let flag = false;

    const post_order = (node, current_value) => {
        if (!node || flag) {
            return;
        }

        if (!node.left && !node.right) {
            if (current_value + node.val === targetSum) {
                flag = true;
                return flag;
            }
        }

        post_order(node.left, current_value + node.val);
        post_order(node.right, current_value + node.val);
    };

    post_order(root, 0);
    return flag;
};
