class Solution:
    def maxAscendingSum(self, nums: List[int]) -> int:
        curSum = results = nums[0]

        for i in range(1, len(nums)):
            if nums[i] <= nums[i - 1]:
                curSum = 0
            curSum += nums[i]
            results = max(curSum, results)

        return results
