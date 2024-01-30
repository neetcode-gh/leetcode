/*
0112-path-sum.cpp
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

Algorithm Used : DFS

Time Complexity : O(n)
n = number of nodes in binary tree

Space Complexity : O(h)
h = height of binary tree

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
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;

        targetSum -= root->val;

        if (!root->left && !root->right && (targetSum == 0)) return true;

        return hasPathSum(root->left, targetSum) || hasPathSum(root->right, targetSum);
    }
};
