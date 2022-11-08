// problem link https://leetcode.com/problems/binary-tree-inorder-traversal/
// time complexity O(n) // whatever the  number of nodes are.

var inorderTraversal = function(root) {
    
    if(!root) return [];
     const result = [];
    
    function goRecursive(root) {
        
        if(!root) return;
        goRecursive(root.left);
        result.push(root.val);
        goRecursive(root.right);
    }
    goRecursive(root);
    return result;
};
