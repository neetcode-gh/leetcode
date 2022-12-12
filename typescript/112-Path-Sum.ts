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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    
    let flag : boolean = false;

    const post_order = (node : TreeNode | null, current_value : number) : void => {
        
        if (!node || flag) {
            return;
        }

        if (!node.left && !node.right) {
            if (current_value + node.val === targetSum) {
                flag = true;
                return;
            }
        }

        post_order(node.left, current_value + node.val);
        post_order(node.right, current_value + node.val);
    };

    post_order(root, 0);
    return flag;
};