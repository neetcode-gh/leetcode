class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        cache = {}
        nums = [1] + nums + [1]
        
        for offset in range(2, len(nums)):
            for left in range(len(nums) - offset):
                right = left + offset
                for pivot in range(left + 1, right):
                    coins = nums[left] * nums[pivot] * nums[right]
                    coins += cache.get((left, pivot), 0) + cache.get((pivot, right), 0)
                    cache[(left, right)] = max(coins, cache.get((left, right), 0))
        return cache.get((0, len(nums) - 1), 0)
