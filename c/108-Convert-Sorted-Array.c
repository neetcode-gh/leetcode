/*
Given an integer array nums where the elements are sorted in 
ascending order, convert it to a height-balanced binary search tree.

Space: O(n)
Time: O(n)
*/

struct TreeNode* dichomoty_rec(int* nums, int i, int j) {
    if (i>j)
        return NULL;
    struct TreeNode* new_t = malloc(sizeof(struct TreeNode));
    int m = (i+j)/2;
    new_t->val = nums[m];
    new_t->left = dichomoty_rec(nums, i, m-1);
    new_t->right = dichomoty_rec(nums, m+1, j);
    return new_t;
}

struct TreeNode* sortedArrayToBST(int* nums, int numsSize){
    return dichomoty_rec(nums, 0, numsSize-1);
}
