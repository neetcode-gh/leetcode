/*
Given the root of a binary tree and an integer targetSum, return true 
if the tree has a root-to-leaf path such that adding up all the values 
along the path equals targetSum.

Space: O(log(n)) (due to recursive calls)
Time: O(n)
*/

bool hasPathSum(struct TreeNode* root, int targetSum){
    if (!root)
        return false;
    if (!root->left && !root->right)
        return root->val == targetSum;
    return hasPathSum(root->left, targetSum - root->val) || hasPathSum(root->right, targetSum - root->val);
}
