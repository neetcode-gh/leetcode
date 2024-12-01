/**
 * PreOrder Traversal
 * Time O(n) | Space O(n) (because of the call stack space is O(n). If the tree has only left children then it's kind of  like a linkedList)
 * https://leetcode.com/problems/find-bottom-left-tree-value/
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    
    let leftVal = 0;
    let deepestLevel = -Infinity;

    const dfs = (node, level) =>  {
        if(!node.left && !node.right) {
            if(level > deepestLevel) {
                leftVal = node.val;
                deepestLevel = level;
            }       
            return;
        }

        node.left &&  dfs(node.left, level + 1);
        node.right && dfs(node.right, level + 1);
    }

    dfs(root, 0);
    return leftVal;
};
