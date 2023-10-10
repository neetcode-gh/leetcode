class Solution:
    def minOperations(self, nums: List[int]) -> int:
        n = len(nums)
        result = n

        # Remove duplicates 
        nums = sorted(set(nums))

        # Calculate minimum operations using sliding window
        right = 0
        for left in range(n):
            while right < len(nums) and nums[right] < nums[left] + n:
                right += 1
            result = min(result, n - (right - left))

        return result
        