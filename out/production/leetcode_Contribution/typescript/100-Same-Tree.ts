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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) return true;

    if ((p === null && q !== null) || (p !== null && q === null)) return false;

    let leftSame = isSameTree(p.left, q.left);
    let rightSame = isSameTree(p.right, q.right);

    if (p.val === q.val && leftSame && rightSame) {
        return true;
    }

    return false;
}
