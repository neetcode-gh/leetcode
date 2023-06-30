# Time Complexity - O(nlogn)
# Space Complexity - O(1)

class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()

        res, mod = 0, (10**9 + 7)

        left, right = 0, len(nums) - 1
        while  left <= right:
            if (nums[left] + nums[right]) > target:
                right -= 1
            else:
                res += 1 << (right - left)
                left += 1
        return res % mod
