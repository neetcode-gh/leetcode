class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        cache = {0: 1}

        for total in range(1, target + 1):
            cache[total] = 0
            for n in nums:
                cache[total] += cache.get(total - n, 0)
        return cache[target]

        def dfs(total):
            if total == target:
                return 1
            if total > target:
                return 0
            if total in cache:
                return cache[total]

            cache[total] = 0
            for n in nums:
                cache[total] += dfs(total + n)
            return cache[total]

        return dfs(0)
