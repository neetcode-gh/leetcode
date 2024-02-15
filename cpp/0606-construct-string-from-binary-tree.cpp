/*
0606-construct-string-from-binary-tree.cpp

Algorithm Used: Preorder

Time Complexity: O(n)
n is number of nodes

Space Complexity: O(h)
h is height of binary tree

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
    string tree2str(TreeNode* root) {
        if (!root) return "";
        string ans = to_string(root->val);
        if (root->right) {
            ans = ans + "(" + tree2str(root->left) + ")";
            ans = ans + "(" + tree2str(root->right) + ")";
        } else if (root->left) {
            ans = ans + "(" + tree2str(root->left) + ")";
        }
        return ans;
    }
};
