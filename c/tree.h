#include <stdio.h>
#include <stdlib.h>
#include "merge_sort.h"

struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};


struct TreeNode* build_tree_recur(int left, int right, int *array) {
    if (left > right) {
        return NULL;
    }
    int mid = (left + right) / 2;
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node -> val = array[mid];
    node -> left = build_tree_recur(left, mid - 1, array);
    node -> right = build_tree_recur(mid + 1, right, array);
    return node;
}

struct TreeNode* build_tree(int *array, int arraySize, int* bufferArray) {

    struct TreeNode *root = NULL;
    if (arraySize != 0) {
        mergeSort(0, arraySize, array, bufferArray);
        root = build_tree_recur(0, arraySize - 1, array);
    }
    return root;
}

void print_tree(struct TreeNode* root, int level)
{
        if (root == NULL)
                return;
        for (int i = 0; i < level; i++){
            printf(i == level - 1 ? "|-" : "  ");
        } 
        printf("%d\n", root->val);
        print_tree(root->left, level + 1);
        print_tree(root->right, level + 1);
}


// int main() {

//     int array[10] = {0, 1, 3, 8, 9, 4, 5, 2, 6, 7};
//     int arraySize = 10;
//     int bufferArray[10] = {0};

//     printf("array : ");
//     print_array(array, arraySize);
//     printf("\n\n");

//     struct TreeNode* root = build_tree(array, arraySize, bufferArray); 
//     print_tree(root, 1);

//     return 0;
// }