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

function goodNodes(root: TreeNode): number {
  let total = 0;

  function traverse(node: TreeNode | null, prev: number) {
    if (!node) return;

    if (node.left || node.right) {
      traverse(node.left, Math.max(node.val, prev));
      traverse(node.right, Math.max(node.val, prev));
    }

    if (node.val >= prev) {
      total += 1;
    }
  }

  traverse(root, root.val);

  return total;
}
