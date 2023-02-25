/*
    Given 2 integer arrays preorder & inorder, construct & return the binary tree
    Ex. preorder = [3,9,20,15,7], inorder = [9,3,15,20,7] -> [3,9,20,null,null,15,7]

    Preorder dictates nodes, inorder dictates subtrees (preorder values, inorder positions)

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
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        int index = 0;
        return build(preorder, inorder, index, 0, inorder.size() - 1);
    }
private:
    TreeNode* build(vector<int>& preorder, vector<int>& inorder, int& index, int i, int j) {
        if (i > j) {
            return NULL;
        }
        
        TreeNode* root = new TreeNode(preorder[index]);
        
        int split = 0;
        for (int i = 0; i < inorder.size(); i++) {
            if (preorder[index] == inorder[i]) {
                split = i;
                break;
            }
        }
        index++;
        
        root->left = build(preorder, inorder, index, i, split - 1);
        root->right = build(preorder, inorder, index, split + 1, j);
        
        return root;
    }
};
