/*
Given an integer array nums, return the length of the longest strictly increasing subsequence.
Time: O(nlog(n))
Space: O(n)
*/

int lengthOfLIS(int* nums, int numsSize){
    int max=0, mid, i, j;
    int* dp = calloc(numsSize, sizeof(int)); // dp[k] is the minimal last value of a subsequence of size k+1;
    dp[0] = nums[0];
    for (int k=0; k<numsSize; k++) {
        i=0, j=max;
        while (i!=j) {
            mid = (i+j)/2;
            if (dp[mid]<nums[k])
                i=mid+1;
            else
                j=mid;
        }
        dp[i] = nums[k];
        if (i==max)
            max++;
    }
    free(dp);
    return max;
}
