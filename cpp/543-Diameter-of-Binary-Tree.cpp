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
    
    int MaxHeight(TreeNode* root, int& res) {
        if (root == NULL) return 0;
        int l = MaxHeight(root->left, res);
        int r = MaxHeight(root->right, res);
        res = max(res, max(max(l, r), l + r));
        return 1 + max(l, r);
    }
    
    int diameterOfBinaryTree(TreeNode* root) {
        int breadth = 0;
        MaxHeight(root, breadth);
        return breadth;
    }
};