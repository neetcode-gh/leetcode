/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */

struct TreeNode *invertTree(struct TreeNode* root) {

    if (root == NULL) {
        return root;
    }
    struct TreeNode* inverted_right = invertTree(root -> right);
    struct TreeNode* inverted_left = invertTree(root -> left);
    root -> right = inverted_left;
    root -> left = inverted_right;
    return root;
}
