/*
Given the root of a binary tree, determine if it is a valid binary search tree (BST).
Time: O(n)
Space: O(1)
*/

#define MAX 9223372036854775807
#define MIN -9223372036854775808

bool isSubTreeValid(struct TreeNode* root, long int lowerBound, long int upperBound) {
    if (root==NULL)
        return true;
    return root->val<upperBound && root->val>lowerBound && isSubTreeValid(root->left, lowerBound, root->val) && isSubTreeValid(root->right, root->val, upperBound);
}

bool isValidBST(struct TreeNode* root){
    return isSubTreeValid(root, MIN, MAX);
}
