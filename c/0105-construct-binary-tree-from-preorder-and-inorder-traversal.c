/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
typedef struct TreeNode TreeNode;

TreeNode* build(int* preorder, int* inorder, int* rootIndex, int inorderLeft, int inorderRight)
{
    if(inorderLeft >= inorderRight)
    {
        return NULL;
    }

    TreeNode* root = (TreeNode*)malloc(sizeof(TreeNode));
    root->val = preorder[*rootIndex];
    int mid = 0;

    // Finding mid
    for(size_t i = inorderLeft; i < inorderRight; i++)
    {
        if(inorder[i] == preorder[*rootIndex])
        {
            mid = i;
            break;
        }
    }

    (*rootIndex)++;

    root->left = build(preorder, inorder, rootIndex, inorderLeft, mid);
    root->right = build(preorder, inorder, rootIndex, mid + 1, inorderRight);

    return root;
}

struct TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize){
    int rootIndex = 0;
    return build(preorder, inorder, &rootIndex, 0, inorderSize);
}
