/*
    Given the root of a binary tree, this function checks whether the tree is symmetric,
    i.e., whether it is a mirror of itself around its center.

    Time Complexity: O(n), where n is the number of nodes in the binary tree.
    Space Complexity: O(n), due to the recursive stack space.

    Approach:
    - If the root is NULL, return true (base case).
    - Recursively check if the left subtree of the root is mirrored with the right subtree.
    - To check if two subtrees are mirrored, compare their left and right children recursively.

    Example:
    Input: root = [1,2,2,3,4,4,3]
    Output: true

    Input: root = [1,2,2,null,3,null,3]
    Output: false
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
    bool isSymmetric(TreeNode* root) {
        return dfs(root, root);
    }

    bool dfs(TreeNode* left, TreeNode* right) {
        if (!left && !right)
            return true;
        if (!left || !right)
            return false;

        return left->val == right->val && dfs(left->left, right->right) && dfs(left->right, right->left);
    }
};