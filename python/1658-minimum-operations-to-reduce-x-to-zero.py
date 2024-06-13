class Solution:
    def minOperations(self, nums: List[int], x: int) -> int:
        # determine sum of subarray remaining after reduction
        target_sum = sum(nums) - x
        # check that x could be reduced to zero
        if target_sum < 0:
            return -1

        n = len(nums)
        min_ops = -1

        # sliding window technique used to find candidate subarrays
        left = 0
        right = 0
        curr_sum = 0
        while right < n:
            curr_sum += nums[right] 
            right += 1

            while left < n and curr_sum > target_sum:
                curr_sum -= nums[left]
                left += 1

            if curr_sum == target_sum:
                ops = n - (right - left) # determine no. of operations used in reduction of nums to candidate subarray 
                min_ops = ops if min_ops == -1 else min(min_ops, ops) # determine if candidate is best candidate thus far

        return min_ops # return best candidate