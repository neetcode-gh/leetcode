/*
    Given a binary tree, return the right side view of it (the nodes which can 
    be seen in front when looking from the right).
    Ex.     1 <-
           / \
          2   3 <-       -> [1, 3, 4]
           \   \
           5   4 <-
        

    The right side view is basically the last element at each level of the tree.
    So BFS is one way this problem can be solved.
    
    The solution below uses recursion, where on reaching a new depth we add that
    node as the right view for that depth. We recursively visit the right child 
    before the left child to get the right view.

    Time: O(n)
    Space: O(n)
*/

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */

void dfs(struct TreeNode* root, int* result, int* returnSize, int depth) {
    if (root == NULL)
        return;
    
    // If a new depth is reached, add the node as right view for that depth
    if (*returnSize <= depth) {
        *returnSize += 1;
        result[depth] = root->val;   
    }

    // Visit the right child first then left child
    dfs(root->right, result, returnSize, depth+1);
    dfs(root->left, result, returnSize, depth+1);
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* rightSideView(struct TreeNode* root, int* returnSize) {
    // Size of result array depends on the depth of tree, which can be precomputed
    int* result = (int*) malloc(sizeof(int)*100);   
    *returnSize = 0;

    dfs(root, result, returnSize, 0);

    return result;
}
