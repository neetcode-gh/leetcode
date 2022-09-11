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

function rightSideView(root: TreeNode | null): number[] {
    let result = [];
    let queue = [];

    if (root === null) {
        return [];
    }

    queue.push(root);

    while (queue.length > 0) {
        let length = queue.length;
        for (let i = 0; i < length; i++) {
            let node = queue.shift();

            if (i === length - 1) {
                result.push(node.val);
            }
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }
    return result;
}
