/*
  Given the root of a binary tree, return the preorder traversal of its nodes' values.

  Ex. Input: root = [1,null,2,3]
      Output: [1,2,3]

  Time  : O(N)
  Space : O(H) -> H = Height of the binary tree
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
    vector <int> res;

    vector<int> preorderTraversal(TreeNode* root) {
        if(root != NULL) {
            res.push_back(root -> val);
            preorderTraversal(root -> left);
            preorderTraversal(root -> right);
        }
        return res;
    }
};
