#include "../tree.h"
#include <stdlib.h>
#include <stdio.h>

// Successfully Submitted Solution
int max(int a, int b) {
    if (a > b) {
        return a;
    }
    return b;
}


int maxDepth(struct TreeNode* root) {

    if (root == NULL) {
        return 0;
    }
    return max(
        maxDepth(root -> left),
        maxDepth(root -> right)
    ) + 1;
}
//

int main() {
    int array[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    int arraySize = 10;
    int bufferArray[10] = {0};

    struct TreeNode* root = build_tree(array, arraySize, bufferArray);
    print_tree(root, 1);
    
    int max_depth = maxDepth(root);
    printf("\n max depht : %d \n", max_depth);

}