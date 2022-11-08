// problem link https://leetcode.com/problems/path-sum/
// time complexity O(n) // whatever the number of nodes are.

var hasPathSum = function(root, targetSum) {

    const ans = [];
    function goDFS(node, curruntSum) {
        
    if(!node) return;
    
        if(!node.left && !node.right) {
            ans.push(node.val + curruntSum);
        }
        
        goDFS(node.left, curruntSum + node.val);
        goDFS(node.right, curruntSum + node.val);
    }
    goDFS(root, 0);
    
    return ans.includes(targetSum);
};
