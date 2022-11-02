/*
You want to rearrange the elements in the array such that every element 
in the rearranged array is not equal to the average of its neighbors
 
Space: O(n)
Time: O(nlog(n)) (quicksort)
*/

int cmp(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}
int* rearrangeArray(int* nums, int numsSize, int* returnSize){
    int* ans = malloc(sizeof(int)*numsSize);
    *returnSize = numsSize;
    qsort(nums, numsSize, sizeof(int), cmp);
    int i, j=0;
    for (i=1; i<numsSize; i+=2) { // Put numbers in odd indexes
        ans[i] = nums[j];
        j++;
    }
    for (i=0; i<numsSize; i+=2) { // Put numbers in even indexes
        ans[i] = nums[j];
        j++;
    }
    return ans;
}
