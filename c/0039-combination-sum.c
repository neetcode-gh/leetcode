
/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */


// An array with array_size to store each unique combination during backtracking.
struct Combination_Array {
    int* array;
    int array_size;
};

// A function to create a empty Combination_Array.
struct Combination_Array* New(int array_size) {
    struct Combination_Array* comb_array = (struct Combination_Array*)malloc(sizeof(struct Combination_Array));
    comb_array -> array = (int*)malloc(array_size * sizeof(int));
    comb_array -> array_size = array_size;
    return comb_array;
}

// A generic stack node with void* pointer.
struct Stack {
    void* value;
    struct Stack* next;
};

// A function to create the stack node.
struct Stack* Node(void* value, struct Stack* next) {
    struct Stack* node = (struct Stack*)malloc(sizeof(struct Stack));
    node -> value = value;
    node -> next = next;
    return node;
}

// append to the stack.
void append(struct Stack* root, void* value) {
    struct Stack* node = Node(value, root -> next);
    root -> next = node;
}

// pop from the stack.
void* pop(struct Stack* root) {
    void* value = root -> next -> value;
    struct Stack* delete_node = root -> next;
    root -> next = root -> next -> next;
    free(delete_node);
    return value;
}

// Recursive backtracking method.
int backtrack(struct Stack* results, struct Stack* candidates_stack, int stack_size, int running_sum, int* candidates, int index) {
    
    if (running_sum == 0) {
        // create a combination array. 
        struct Combination_Array* combination = New(stack_size);
        // copy the candidates from the candidates_stack to the combination array.
        struct Stack* node = candidates_stack;
        for (int i = 0; i < stack_size; i++) {
            combination -> array[i] = *(int*)node -> next -> value;
            node = node -> next;
        }
        // append the combination to the results stack.
        append(results, combination);
        return 1;
    }
    
    int returnSize = 0;
    if (running_sum > 0) {
        for (int i = index; i >= 0; i--) {
            append(candidates_stack, &candidates[i]);
            returnSize += backtrack(results, candidates_stack, stack_size + 1, running_sum - candidates[i], candidates, i);
            // backtrack by poping the candidate from the candidate_stack.
            pop(candidates_stack);
        }
    }

    return returnSize;
}


int** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes){

    // A candidates_stack to track all possible combinations of candidates during backtracking.
    struct Stack* candidates_stack = Node(NULL, NULL);
    // A results stack to store each combination solution on the stack during backtracking. 
    struct Stack* results = Node(NULL, NULL);

    // The backtracking method returns the total number of possible combinations (the final result size).
    *returnSize = backtrack(results, candidates_stack, 0, target, candidates, candidatesSize - 1);
    
    // prepare the result array.
    int** result_array = (int**)malloc(*returnSize * sizeof(int*));
    *returnColumnSizes = (int*)malloc(*returnSize * sizeof(int));

    for (int i = 0; i < *returnSize; i++) {
        // pop() each solution from the results stack to the results array.
        struct Combination_Array* combination = (struct Combination_Array*)pop(results);
        result_array[i] = combination -> array;
        returnColumnSizes[0][i] = combination -> array_size;
        free(combination);
    }
    // finally free the results stack and the candidates stack.
    free(results);
    free(candidates_stack);
    return result_array;

}