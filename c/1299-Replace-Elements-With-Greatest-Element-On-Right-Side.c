/*
Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

Space: O(1)
Time: O(n)
*/

int max(int a, int b) {
    return a>b?a:b;
}

int* replaceElements(int* arr, int arrSize, int* returnSize){
    int greatest = -1;
    *returnSize = arrSize;
    for (int i=arrSize-1; i>=0; i--) {
        int m = greatest;
        greatest = max(greatest, arr[i]);
        arr[i] = m;
    }
    return arr;
}
