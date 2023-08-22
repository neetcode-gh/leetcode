#include <stdio.h>
#include <stdlib.h>

int lastStoneWeight(int *stones, int stonesSize) {
    while (stonesSize > 1) {
        // Find indices of the two largest stones
        int max1 = 0, max2 = 1;
        if (stones[max2] > stones[max1]) {
            int temp = max1;
            max1 = max2;
            max2 = temp;
        }

        for (int i = 2; i < stonesSize; i++) {
            if (stones[i] > stones[max1]) {
                max2 = max1;
                max1 = i;
            } else if (stones[i] > stones[max2]) {
                max2 = i;
            }
        }

        // Smash the stones and update the array
        if (stones[max1] != stones[max2]) {
            stones[max1] -= stones[max2];
            stones[max2] = 0;
        } else {
            stones[max1] = 0;
            stones[max2] = 0;
        }

        // Remove the smashed stones
        int newSize = 0;
        for (int i = 0; i < stonesSize; i++) {
            if (stones[i] != 0) {
                stones[newSize++] = stones[i];
            }
        }
        stonesSize = newSize;
    }

    return (stonesSize == 0) ? 0 : stones[0];
}

/*
int extractMax(int* stones, int stonesSize) {
    int max = stones[0];
    for (int i = 1; i < stonesSize; i++) {
        if (stones[i] > max) {
            max = stones[i];
        }
    }
    for (int i = 0; i < stonesSize; i++) {
        if (stones[i] == max) {
            stones[i] = 0;
            break;
        }
    }
    return max;
}

void insert(int* stones, int stonesSize, int value) {
    for (int i = 0; i < stonesSize; i++) {
        if (stones[i] == 0) {
            stones[i] = value;
            return;
        }
    }
}

int lastStoneWeight(int* stones, int stonesSize) {
    while (1) {
        int y = extractMax(stones, stonesSize);
        int x = extractMax(stones, stonesSize);
        if (x == 0) {
            return y;
        }
        if (x != y) {
            insert(stones, stonesSize, y - x);
        }
    }
    return 0;
}
*/