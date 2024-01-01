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
    TreeNode* convertBST(TreeNode* root) {
        int currSum=0;
        reversed(root,currSum);
        return root;
    }

private:

    // just do a inorder treversal starting from right
    // maintain a current sum
    // change the root->val to the curr sum

    void reversed(TreeNode* root,int &currSum){
        if(root==NULL){
            return;
        }

        reversed(root->right,currSum);
        currSum+=root->val;
        root->val=currSum;
        reversed(root->left,currSum);
    }
};
