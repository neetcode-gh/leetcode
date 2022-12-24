int findDuplicate(int* nums, int numsSize){
    int slow = nums[0];
    int fast = nums[nums[0]];
    
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }
    
    slow = 0;
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}