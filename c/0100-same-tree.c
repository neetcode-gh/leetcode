
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */


bool isSameTree(struct TreeNode* p, struct TreeNode* q){
    if (p == NULL && q == NULL) {
        return true;
    }
    if ((p == NULL || q == NULL) || (p -> val != q -> val)) {
        return false;
    }
    return (isSameTree(p -> left, q -> left) && isSameTree(p -> right, q -> right));
}