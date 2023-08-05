/*
    You are given the root node of a binary search tree (BST) and a value to insert into the tree. 
    Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

    Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. 
    You can return any of them.

    Ex. Input: root = [4,2,7,1,3], val = 5
        Output: [4,2,7,1,3,5]

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
    TreeNode * create(int val) {
        TreeNode *n = new TreeNode;
        n -> val = val;
        n -> left = n -> right = NULL;
        return n;
    }

    TreeNode* insertIntoBST(TreeNode* root, int val) {
        if(root == NULL) 
		    return create(val);

        else if(val > root -> val)
		    root -> right = insertIntoBST(root -> right, val); 
        else if(val < root -> val)
		    root -> left = insertIntoBST(root -> left, val);
	    return root;
    }
};
