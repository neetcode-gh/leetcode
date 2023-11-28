/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
int max(int a, int b) {
    return a > b ? a : b;
}

int dfs(struct TreeNode* root) {
    if (!root) {
        return 0;
    }

    int depth_left = dfs(root->left);
    int depth_right = dfs(root->right);

    if (depth_left == -1 || depth_right == -1 || abs(depth_left - depth_right) > 1) {
        return -1;
    }

    return max(depth_left, depth_right) + 1;
}

bool isBalanced(struct TreeNode* root) {
    if (dfs(root) != -1) {
        return true;
    } else {
        return false;
    }
}