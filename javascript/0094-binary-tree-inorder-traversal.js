<<<<<<< HEAD
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 * this.val   = (val===undefined ? 0 : val)
 * this.left  = (left===undefined ? null : left)
 * this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var inorderTraversal = function (root, list = []) {

    if (!root) return [];
    
    inorderTraversal(root.left, list);
    list.push(root.val)
    inorderTraversal(root.right, list);
    
    return list
};
=======
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 * this.val   = (val===undefined ? 0 : val)
 * this.left  = (left===undefined ? null : left)
 * this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var inorderTraversal = function (root, list = []) {

    if (!root) return [];
    
    inorderTraversal(root.left, list);
    list.push(root.val)
    inorderTraversal(root.right, list);
    
    return list
};
>>>>>>> ee7a3bcd934aa34bbe7308028fc96d087d88b922
