/*
    Given binary tree, determine if height-balanced (all left & right subtrees height diff <= 1)

    Check if subtrees are balanced, if so, use their heights to determine further balance

    Time: O(n)
    Space: O(n)
*/

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return dfs(root).first;
    }
    // bool isBalanced(TreeNode* root) {
    //     int height = 0;
    //     return dfs(root, height);
    // }

private:
    pair<bool, int> dfs(TreeNode* root) {
        if (!root) return {true, 0};

        auto left = dfs(root->left);
        auto right = dfs(root->right);

        bool balanced = left.first && right.first && abs(left.second - right.second) <= 1;
        return {balanced, 1 + max(left.second, right.second)};
    }
    // bool dfs(TreeNode* root, int& height) {
    //     if (root == NULL) {
    //         height = -1;
    //         return true;
    //     }
        
    //     int left = 0;
    //     int right = 0;
        
    //     if (!dfs(root->left, left) || !dfs(root->right, right)) {
    //         return false;
    //     }
    //     if (abs(left - right) > 1) {
    //         return false;
    //     }
        
    //     height = 1 + max(left, right);
    //     return true;
    // }
};
