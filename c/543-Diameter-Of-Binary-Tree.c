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

int recur(struct TreeNode* root, int* maxDiameter) {
    if (root == NULL) {
        return 0;
    }
    int leftHeight = recur(root -> left, maxDiameter);
    int rightHeight = recur(root -> right, maxDiameter);
    *maxDiameter = max(*maxDiameter, leftHeight + rightHeight);
    return max(leftHeight, rightHeight) + 1;
}

int diameterOfBinaryTree(struct TreeNode* root) {
    int * maxDiameter;
    int result = 0;
    maxDiameter = &result;
    recur(root, maxDiameter);
    return result;
}
