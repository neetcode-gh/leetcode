/*
Given the root of a binary tree, return the maximum path sum of any non-empty path.
Time: O(n)
Space: O(1)

*/

int max(int a, int b) {
    return a>b?a:b;
}

int rec(struct TreeNode* t, int* m) { // Return the maximum path sum which uses t->Val
    if (t==NULL)
        return -1001;
    int r = rec(t->right, m);
    int l = rec(t->left, m);
    if (t->val>0)
        *m = max(*m, t->val+max(l+r, max(l, r)));
    else
        *m = max(*m, max(r, max(l, l+r+t->val)));
    return max(0, max(l, r))+t->val;
}

int maxPathSum(struct TreeNode* root){
    int m = root->val;
    int c = rec(root, &m);
    return max(c, m);
}
