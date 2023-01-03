/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* findDisappearedNumbers(int* nums, int numsSize, int* returnSize){
    int* disappearedNumbers = (int*)malloc(numsSize * sizeof(int)); // Allocate space for the worst case
    *returnSize = 0; // Points to the first empty index in the array 

    // Mark available numbers as negative
    for(int i = 0; i < numsSize; i++)
    {
        int index = abs(nums[i]);
        nums[index - 1] = -1 * abs(nums[index - 1]); 
    }

    // Find unmarked numbers (disappeared numbers)
    for(int i = 0; i < numsSize; i++)
    {
        if(nums[i] > 0)
        {
            disappearedNumbers[(*returnSize)++] = i + 1; 
        }
    }

    return disappearedNumbers;
}
