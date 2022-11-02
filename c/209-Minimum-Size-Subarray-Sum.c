/*
Given an array of positive integers nums and a positive integer target, return 
the minimal length of a contiguous subarray of which the sum is greater than or 
equal to target

Space: O(1)
Time: O(n)
*/

int min(int a, int b) {
    return a<b?a:b;
}

int minSubArrayLen(int target, int* nums, int numsSize){
    int len=0;
    int i=0, j=0;
    int cpt=0;
    while (j<numsSize) {
        cpt += nums[j];
        if (cpt>=target) {
            if (len==0)
                len = j-i+1;
            while (cpt-nums[i] >= target) {
                cpt -= nums[i];
                len = min(len, j-i);
                i++;
            }
        }
        j++;
    }
    return len;
}
