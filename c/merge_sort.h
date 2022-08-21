#include <stdio.h>


void print_array(int* array, int arraySize) {
    printf("{ ");
    for (int i = 0; i < arraySize; i++) {
        printf("%d", array[i]);
        if (i < arraySize - 1) {
            printf(", ");
        }
    }
    printf(" }");
}

void merge(int left, int mid, int right, int* array, int*sortedArray) {
    
    int i = left;
    int j = mid;
    for (int k = left; k < right; k++) {
        if ((i < mid) && (j < right)) {
            if (array[i] < array[j]) {
                sortedArray[k] = array[i];
                i++;
            } else {
                sortedArray[k] = array[j];
                j++;
            }
        } else if (i < mid) {
            sortedArray[k] = array[i];
            i++;
        } else {
            sortedArray[k] = array[j];
            j++;
        }
    }
    
    for (int k = left; k < right; k++) {
        array[k] = sortedArray[k];
    }
}

void mergeSort(int left, int right, int* array, int* sortedArray) {

    if (left == (right - 1)) {
        return;
    }
    int mid = (left + right) / 2;
    mergeSort(left, mid, array, sortedArray);
    mergeSort(mid, right, array, sortedArray);
    merge(left, mid, right, array, sortedArray);
}

// int main() {

//     int arraySize = 12;
//     int array[] = {3,4,1,7,3,6,2,5,-6,-2,8,9};
    
//     int sortedArray[12] = {0};
//     mergeSort(0, arraySize, array, sortedArray);

//     stdout_array(array, arraySize);
//     printf("\n");

//     return 0;
// }