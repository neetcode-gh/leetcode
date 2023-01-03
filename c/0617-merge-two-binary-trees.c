/*
You are given two binary trees root1 and root2.
Return the merged tree

Time: O(n)
Space: O(1) As we reuse the trees
*/

struct TreeNode* mergeTrees(struct TreeNode* root1, struct TreeNode* root2){
    if (root1==NULL)
        return root2;
    else if (root2==NULL)
        return root1;
    root1->val += root2->val;
    root1->left = mergeTrees(root1->left, root2->left);
    root1->right = mergeTrees(root1->right, root2->right);
    return root1;
}
