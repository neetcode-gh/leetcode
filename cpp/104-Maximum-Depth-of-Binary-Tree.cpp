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

// Using Stack
// class Solution {
// public:
//     int maxDepth(TreeNode* root) {
//         if (root == NULL) return 0;
//         stack<pair<TreeNode*, int>> stk;
//         int res = 0; 
//         stk.push({root, 1});
        
//         while (!stk.empty()) {
//             auto t = stk.top();
//             res = max(res, t.second);
//             stk.pop();
//             if (t.first->left) stk.push({t.first->left, t.second+1});
//             if (t.first->right) stk.push({t.first->right, t.second+1});
//         }
//         return res;
//     }
// };

// Using Recursion
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == NULL) return 0;
        return max(maxDepth(root->left)+1, maxDepth(root->right)+1);
    }
};