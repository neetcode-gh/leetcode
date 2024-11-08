/**
 * Recursion
 * h = height of the tree;
 * Time O(h) | Space O(h)
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    if (!root) return root;

    if (key === root.val) {
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // find the smallest val in right bst
        let curr = root.right;
        while (curr.left) {
            curr = curr.left;
        }
        // change the curr value
        root.val = curr.val;

        root.right = deleteNode(root.right, root.val);

        return root;
    } 
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
        return root;
    }
    root.right = deleteNode(root.right, key);
    return root;
};
