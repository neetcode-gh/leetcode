/*
    Given root of binary tree, return max depth (# nodes along longest path from root to leaf)

    At every node, max depth is the max depth between its left & right children + 1

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
    int maxDepth(TreeNode* root) {
        if (root == NULL) {
            return 0;
        }
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};

// class Solution {
// public:
//     int maxDepth(TreeNode* root) {
//         if (root == NULL) {
//             return 0;
//         }
//         queue<TreeNode*> q;
//         q.push(root);
//         int result = 0;
//         while (!q.empty()) {
//             int count = q.size();
//             for (int i = 0; i < count; i++) {
//                 TreeNode* node = q.front();
//                 q.pop();
//                 if (node->left != NULL) {
//                     q.push(node->left);
//                 }
//                 if (node->right != NULL) {
//                     q.push(node->right);
//                 }
//             }
//             result++;
//         }
//         return result;
//     }
// };
