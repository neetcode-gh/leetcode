int findPeakElement(int* nums, int numsSize) {
    int start = 0;
    int end = numsSize - 1;
    
    while(start < end){
        int mid = start + (end - start)/2;
        
        if(nums[mid] > nums[mid+1])
            end = mid;
        else if(nums[mid] < nums[mid+1])
            start = mid + 1;
    }
    
    return start;
}