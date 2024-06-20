# Time Complexity O(n) | Space Complexity O(1)
class Solution(object):
    def minOperations(self, nums, x):
        """
        :type nums: List[int]
        :type x: int
        :rtype: int
        """

        # check if total sum equals x
        if sum(nums) < x:
            return -1

        y = sum(nums) - x

        maxOp = float('-inf')
        
        left, right = 0, 0
        currSum = 0

        while right < len(nums):
            currSum += nums[right]

            # if currSum exceeds y, move left pointer
            while currSum > y:
                currSum -= nums[left]
                left += 1

            # check if currSum equals y, then calculate max operations to get y
            if currSum == y:
                maxOp = max(maxOp, right - left + 1)

            right += 1

        if maxOp == float('-inf'):
            return -1

        # calculate min operations to get x
        return len(nums) - maxOp

