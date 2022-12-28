/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */

int max(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}


int height(struct TreeNode* root) {
    if (root == NULL) {
        return -1;
    }
    return max(
        height(root -> left),
        height(root -> right)
    ) + 1;
}


bool isBalanced(struct TreeNode* root) {

    if (root == NULL) {
        return true;
    }
    if (abs(height(root -> left) - height(root -> right)) < 2 && isBalanced(root -> left) && isBalanced(root -> right)) {
        return true;
    }
    return false;
}
