#include "../tree.h"
#include <stdlib.h>
#include <stdio.h>




struct TreeNode *invertTree(struct TreeNode* root) {

    if (root == NULL) {
        return root;
    }
    struct TreeNode* inverted_right = invertTree(root -> right);
    struct TreeNode* inverted_left = invertTree(root -> left);
    root -> right = inverted_left;
    root -> left = inverted_right;
    return root;
}


int main() {
    int array[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int arraySize = 10;
    int bufferArray[10] = {0};

    struct TreeNode* root = build_tree(array, arraySize, bufferArray);
    print_tree(root, 1);
    root = invertTree(root);
    print_tree(root, 1);

}

