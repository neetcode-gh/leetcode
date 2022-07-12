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
 * @return {boolean}
 */
var isBalanced = function (root) {
    const getHeight = (root) => {
        if (!root) return [-1, true];

        const [leftHeight, leftBalanced] = getHeight(root.left);
        const [rightHeight, rightBalanced] = getHeight(root.right);

        const balanced = leftBalanced && rightBalanced && Math.abs(leftHeight - rightHeight) < 2;

        return [1 + Math.max(leftHeight, rightHeight), balanced];
    };

    const balanced = getHeight(root)[1]
    
    return balanced;
};