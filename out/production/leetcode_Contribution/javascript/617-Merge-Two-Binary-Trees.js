/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 * Time complexity = O(n+m) 
 */
 var mergeTrees = function(root1, root2) {
    // Base case to return null as result of having both root1, root2 null
    if(!root1 && !root2) {
        return null;
    }

    const val1 = root1 ? root1.val : 0;
    const val2 = root2 ? root2.val : 0;
    
    const root = new TreeNode(val1+val2);
    root.left = mergeTrees(root1 ? root1.left : null, root2 ? root2.left: null);
    root.right = mergeTrees(root1 ? root1.right : null , root2 ? root2.right: null);
    return root;
};