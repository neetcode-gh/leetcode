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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {

	if (!root) {
		return null;
	}

	if (root.val < low) {
		return trimBST(root.right, low, high);
	}

	if (root.val > high) {
		return trimBST(root.left, low, high);
	}

	root.left  = trimBST(root.left, low, high);
	root.right = trimBST(root.right, low, high);

	return root;
};