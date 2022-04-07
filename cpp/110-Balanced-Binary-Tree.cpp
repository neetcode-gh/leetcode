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
    
    int getHeight(TreeNode* root, unordered_map<TreeNode*, int>& umap) {
        if (root==NULL) return 0;
        if (umap.find(root) != umap.end()) return umap[root];
        int res = max(getHeight(root->left, umap), getHeight(root->right, umap))+1;
        umap[root] = res;
        return res;
    }
    bool isBalanced(TreeNode* root) {
        unordered_map<TreeNode*, int> umap;
        if (root == NULL) return true;
        if (abs(getHeight(root->left, umap) - getHeight(root->right, umap)) > 1) return false;
        return isBalanced(root->left) && isBalanced(root->right);
    }
};