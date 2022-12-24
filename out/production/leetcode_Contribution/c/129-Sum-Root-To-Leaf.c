/*
Return the total sum of all root-to-leaf numbers.

Space: O(1)
Time: O(n)
*/

int dfs(struct TreeNode* r, int acc) {
    if (r==NULL)
        return acc;
    if (r->left==NULL && r->right==NULL)
        return acc*10 + r->val;
    if (r->left==NULL)
        return dfs(r->right, acc*10 + r->val);
    if (r->right==NULL)
        return dfs(r->left, acc*10 + r->val);
    return dfs(r->right, acc*10 + r->val) + dfs(r->left, acc*10 + r->val);
}

int sumNumbers(struct TreeNode* root){
    return dfs(root, 0);
}
