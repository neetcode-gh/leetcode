/*
Given the root of a binary search tree, and an integer k, return 
the kth smallest value (1-indexed) of all the values of the nodes 
in the tree.

Space: O(log(n)) (due to recursive calls)
Time: O(n)
*/

void iterate_bst(struct TreeNode* t, int* pos, int* ans, int k) {
    if (t==NULL)
        return;
    iterate_bst(t->left, pos, ans, k);
    if ((*ans)!=-1) { // Already found
        return;
    } else if (*pos == k) { // t->val is the number wanted
        *ans = t->val;
        return;
    }
    *pos = *pos + 1;
    iterate_bst(t->right, pos, ans, k);
}

int kthSmallest(struct TreeNode* root, int k){
    int pos = 1; // Current pos in the tree
    int ans = -1;
    iterate_bst(root, &pos, &ans, k);
    return ans;
}
