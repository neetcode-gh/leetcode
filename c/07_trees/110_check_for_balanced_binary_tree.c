#include "../tree.h"
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

// Successfully Submitted Solution
int max(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}


int height(struct TreeNode* root) {
    if (root == NULL) {
        return -1;
    }
    return max(
        height(root -> left),
        height(root -> right)
    ) + 1;
}


bool isBalanced(struct TreeNode* root) {

    if (root == NULL) {
        return true;
    }
    if (abs(height(root -> left) - height(root -> right)) < 2 && isBalanced(root -> left) && isBalanced(root -> right)) {
        return true;
    }
    return false;
}
//

int main() {
    int array[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int arraySize = 10;
    int bufferArray[10] = {0};

    struct BinaryTree* root = build_tree(array, arraySize, bufferArray);
    print_tree(root, 1);
    bool balanced = isBalanced(root);
    printf("is balanced : %d\n", balanced);

}