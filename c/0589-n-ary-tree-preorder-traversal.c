/**
 * Given the root of an n-ary tree, return the preorder traversal of its nodes'
 * values.
 *
 * Nary-Tree input serialization is represented in their level order traversal.
 * Each group of children is separated by the null value (See examples)
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [0, 104].
 * 0 <= Node.val <= 10^4
 * The height of the n-ary tree is less than or equal to 1000.
 *
 * Definition for a Node.
 * struct Node {
 *     int val;
 *     int numChildren;
 *     struct Node** children;
 * };
 *
 * Note: The returned array must be malloced, assume caller calls free().
 *
 * Space: O(n)
 * Time: O(n)
 */

void traverse(struct Node* root, int *ret, int* index) {
    if (!root)
        return;

    ret[(*index)++] = root->val;

    for (int i = 0; i < root->numChildren; ++i)
        traverse(root->children[i], ret, index);
}

int* preorder(struct Node* root, int* returnSize) {
    int *ret = malloc(10000 * sizeof(int));
    *returnSize = 0;
    traverse(root, ret, returnSize);
    return ret;
}
