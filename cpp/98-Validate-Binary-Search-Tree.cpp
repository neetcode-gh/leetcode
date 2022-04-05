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
void check(TreeNode* root,vector<int>& v)
 {
    if(!root) return;
 check(root->left,v);
    v.push_back(root->val);
    check(root->right,v);
}
class Solution {
public:
    bool isValidBST(TreeNode* root) {
     vector<int> v;
    check(root,v);
        for(int i=0;i<v.size()-1;i++)
        {
            if(v[i]>=v[i+1])
                return 0;
        }
        return 1;
    }
};
