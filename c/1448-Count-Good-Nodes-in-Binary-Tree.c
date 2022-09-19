/*
Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.
Return the number of good nodes in the binary tree.
Time: O(n)
Space: O(log(h)) Where h is the height of the tree
*/

int nbGood(struct TreeNode* root, int m) {
    if (root==NULL)
        return 0;
    if (root->val >= m)
        return 1+nbGood(root->left, root->val)+nbGood(root->right, root->val);
    return nbGood(root->left, m)+nbGood(root->right, m);
}

int goodNodes(struct TreeNode* root){
    return nbGood(root, INT_MIN);
}
