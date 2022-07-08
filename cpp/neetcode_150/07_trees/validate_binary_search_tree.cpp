/*
    Given root of binary tree, determine if it's valid (left all < curr, right all > curr)

    Inorder traversal & check if prev >= curr, recursive/iterative solutions

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
    bool isValidBST(TreeNode* root) {
        using def = function<bool(TreeNode*,long,long)>;
        
        def valid = [&] (auto node, long left, long right) {
            if(!node){
                return true;   
            }
            if(!(node->val < right && node->val > left)){
                return false;
            }
            return (valid(node->left, left, node->val) && 
                    valid(node->right, node->val, right));
        };
        
        return valid(root, long(INT_MIN)-1, long(INT_MAX)+1);
    }
};

// class Solution {
// public:
//     bool isValidBST(TreeNode* root) {
//         stack<TreeNode*> stk;
//         TreeNode* prev = NULL;
        
//         while (!stk.empty() || root != NULL) {
//             while (root != NULL) {
//                 stk.push(root);
//                 root = root->left;
//             }
//             root = stk.top();
//             stk.pop();
            
//             if (prev != NULL && prev->val >= root->val) {
//                 return false;
//             }
            
//             prev = root;
//             root = root->right;
//         }
        
//         return true;
//     }
// };
