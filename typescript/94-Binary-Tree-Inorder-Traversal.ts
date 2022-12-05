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
 function inorderTraversal(root: TreeNode | null, list: Array<number> = [] ): number[] {
    
    if (!root) return [];
    
    inorderTraversal(root.left, list);
    list.push(root.val)
    inorderTraversal(root.right, list);
    
    return list
};