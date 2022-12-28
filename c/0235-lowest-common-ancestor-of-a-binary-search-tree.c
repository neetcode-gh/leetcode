
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */

struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    
    int rootVal = root -> val;
    int pVal = p -> val;
    int qVal = q -> val;

    if (pVal > rootVal && qVal > rootVal) {
        return lowestCommonAncestor(root -> right, p, q);
    } else if (pVal < rootVal && qVal < rootVal) {
        return lowestCommonAncestor(root -> left, p, q);
    }
    return root;
}