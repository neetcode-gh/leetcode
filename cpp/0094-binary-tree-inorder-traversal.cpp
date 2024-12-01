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
#include <stack>

class Solution {
public:
    /* Recursive
    vector<int> helper(TreeNode* node, vector<int>& path) {
        if (node == NULL)
            return path;

        path = helper(node->left, path);
        path.push_back(node->val);
        path = helper(node->right, path);
        return path;
    }
    */

    // Iterative
    vector<int> inorderTraversal(TreeNode* root) {
        stack<TreeNode*> stk;
        vector<int> path;
        TreeNode* current = root;

        while (!stk.empty() || current != NULL) {
            while (current != NULL) {
                stk.push(current);
                current = current->left;
            }
            TreeNode* node = stk.top();
            path.push_back(node->val);
            stk.pop();
            current = node->right;
        }
        return path;
    }
};
