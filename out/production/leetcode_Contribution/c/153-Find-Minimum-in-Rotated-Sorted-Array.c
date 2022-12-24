int findMin(int* nums, int numsSize){
    // set the starting indicies to find minimum pivot
    int left = 0;
    int right = numsSize - 1;
    
    while (left < right) {
        // calculate middle index
        int middle = (left + right) / 2;
        
        // set the left or right index accordingly
        if (nums[middle] > nums[right]) {
            left = middle + 1;
        }
        else {
            right = middle;
        }
    }
    return nums[left];
}