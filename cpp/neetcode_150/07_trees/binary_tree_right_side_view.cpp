/*
    Given root of binary tree, return values that can only be seen from the right side

    BFS traversal, push right first before left, store only first value

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
    vector<int> rightSideView(TreeNode* root) {
        if (root == NULL) {
            return {};
        }
        
        queue<TreeNode*> q;
        q.push(root);
        
        vector<int> result;
        
        while (!q.empty()) {
            int count = q.size();
            
            for (int i = count; i > 0; i--) {
                TreeNode* node = q.front();
                q.pop();
                
                if (i == count) {
                    result.push_back(node->val);
                }
                
                if (node->right != NULL) {
                    q.push(node->right);
                }
                if (node->left != NULL) {
                    q.push(node->left);
                }
            }
        }
        
        return result;
    }
};
