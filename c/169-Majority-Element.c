/*
Given an array nums of size n, return the majority element.

Space: O(1)
Time: O(n)
*/

int majorityElement(int* nums, int numsSize){
    int candidate=nums[0];
    int count=1;
    for (int i=1; i<numsSize; i++) {
        if (candidate==nums[i]) {
            count++;
        } else {
            count--;
            if (count==0) {
                count=1;
                candidate=nums[i];
            }
        }
    }
    return candidate;
}
