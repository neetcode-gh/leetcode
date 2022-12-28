
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */

bool isSame(struct TreeNode* p, struct TreeNode* q) {
    
    if (p == NULL && q == NULL) {
        return true;
    }
    if ((p == NULL || q == NULL) || (p -> val != q -> val)) {
        return false;
    }
    return (isSame(p -> left, q -> left) && isSame(p -> right, q -> right));
}


bool isSubtree(struct TreeNode* root, struct TreeNode* subRoot){
    
    if (root == NULL) {
        return false;
    }

    bool compareTree = false;
    if (root -> val == subRoot -> val) {
        compareTree = isSame(root, subRoot);
    }
    return (isSubtree(root -> left, subRoot) || isSubtree(root -> right, subRoot) || compareTree);
}
