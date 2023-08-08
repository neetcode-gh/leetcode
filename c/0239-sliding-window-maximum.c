#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int value;
    int index;
} Pair;

typedef struct {
    Pair* data;
    int front;
    int rear;
    int size;
} Deque;

// Create a new deque
Deque* createDeque(int size) {
    Deque* deque = (Deque*)malloc(sizeof(Deque));
    deque->data = (Pair*)malloc(size * sizeof(Pair));
    deque->front = 0;
    deque->rear = -1;
    deque->size = 0;
    return deque;
}

// Push a new element to the back of the deque
void pushBack(Deque* deque, int value, int index) {
    while (deque->size > 0 && value >= deque->data[deque->rear].value) {
        deque->rear--;
        deque->size--;
    }
    deque->rear++;
    deque->data[deque->rear].value = value;
    deque->data[deque->rear].index = index;
    deque->size++;
}

// Pop elements from the front of the deque
void popFront(Deque* deque, int index) {
    if (deque->size > 0 && deque->data[deque->front].index == index) {
        deque->front++;
        deque->size--;
    }
}

// Calculate the maximum sliding window
int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {
    // Check if the input array is empty
    if (numsSize == 0) {
        *returnSize = 0;
        return NULL;
    }

    // Calculate the size of the result array
    *returnSize = numsSize - k + 1;
    
    // Allocate memory for the result array
    int* result = (int*)malloc((*returnSize) * sizeof(int));

    // Create a deque (double-ended queue) to efficiently track maximum elements
    Deque* deque = createDeque(numsSize);

    // Iterate through the input array
    for (int i = 0; i < numsSize; i++) {
        // Push the current element to the deque, maintaining the maximum at the front
        pushBack(deque, nums[i], i);

        // Check if the window has reached the required size
        if (i >= k - 1) {
            // Store the maximum element in the result array
            result[i - k + 1] = deque->data[deque->front].value;
            
            // Pop elements from the front of the deque that are outside the current window
            popFront(deque, i - k + 1);
        }
    }

    // Free memory allocated for the deque
    free(deque->data);
    free(deque);

    // Return the result array containing maximum elements in each sliding window
    return result;
}
