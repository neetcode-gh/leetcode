/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isBalanced(root: TreeNode | null): boolean {
  let array = getHeight(root);
  return array[0];
}

function getHeight(root: TreeNode | null) {
  if (!root) return [true, 0];

  let [leftBalanced, leftHeight] = getHeight(root.left);
  let [rightBalanced, rightHeight] = getHeight(root.right);

  let balanced = leftBalanced && rightBalanced && Math.abs(rightHeight - leftHeight) <= 1;

  return [balanced, 1 + Math.max(leftHeight, rightHeight)];
}
