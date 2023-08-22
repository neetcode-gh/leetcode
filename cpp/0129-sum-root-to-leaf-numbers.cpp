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
    int sumNumbers(TreeNode* root) {
        if (!root)
            return 0;
        stack<pair<TreeNode*, int> > stk;
        stk.push(make_pair(root, root->val));

        int sum = 0;
        while (!stk.empty()) {
            pair<TreeNode*, int> elm = stk.top();
            stk.pop();
            TreeNode* node = elm.first;
            int num = elm.second;
            if (!node->left && !node->right) {
                sum += num;
                continue;
            }
            if (node->left)
                stk.push(make_pair(node->left, num * 10 + node->left->val));
            if (node->right)
                stk.push(make_pair(node->right, num * 10 + node->right->val));
        }
        return sum;
    }  
};
