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

function levelOrder(root: TreeNode | null): number[][] {
    const levels: number[][] = [];

    function getHeight(node: TreeNode | null, height: number) {
        if (!node) return 0;

        if (node.left || node.right) {
            getHeight(node.left, height + 1);
            getHeight(node.right, height + 1);
        }

        if (levels[height]) {
            levels[height].push(node.val);
        } else {
            levels[height] = [node.val];
        }
    }

    getHeight(root, 0);

    return levels;
}
