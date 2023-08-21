/*
  Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

  Ex. Input: root = [1,3,2,5,3,null,9]
      Output: [1,3,9]

  Time  : O(N)
  Space : O(N)
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
    vector<int> largestValues(TreeNode* root) {
        vector<int> v;
        if (!root)
            return v;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            int maxi = INT_MIN;
            for (int i = 0; i < size; ++i) {
                TreeNode* node = q.front();
                q.pop();
                maxi = max(maxi, node->val);
                if (node->left)
                    q.push(node->left);
                if (node->right)
                    q.push(node->right);
            }
            v.push_back(maxi);
        }
        return v;
    }
};
