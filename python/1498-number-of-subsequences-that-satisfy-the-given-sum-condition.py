class Solution:
    def numSubseq(self, nums: List[int], target: int) -> int:
        nums.sort()

        # 2 pointers traversal
        low = 0
        high = len(nums) - 1
        mod = pow(10, 9) + 7

        count = 0
        while low <= high:
            # if sum >= target, try a smaller max
            if nums[low] + nums[high] > target:
                high -= 1
            # if sum <= target, try a larger min
            else:
                # keep only the mod results for all intermediate steps
                count += pow(2, high-low, mod)
                low += 1

        return count % mod
