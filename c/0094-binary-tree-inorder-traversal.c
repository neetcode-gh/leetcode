/*
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Space: O(n)
Time: O(n)
*/

void fill_array(struct TreeNode* root, int* ans, int* pos) {
    // Fill the array with the inorder traversal order
    if (root==NULL)
        return;
    fill_array(root->left, ans, pos);
    ans[*pos] = root->val;
    *pos = *pos +1;
    fill_array(root->right, ans, pos);
}

int* inorderTraversal(struct TreeNode* root, int* returnSize){
    int* ans = malloc(sizeof(int)*101); // 101 as a length as we don't know the max and its inferior of 100
    *returnSize = 0; // Current position in the array
    fill_array(root, ans, returnSize);
    return ans;
}
