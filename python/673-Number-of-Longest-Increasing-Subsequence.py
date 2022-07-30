class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        # 1. O(n^2) Recursive solution with Caching

        dp = {}  # key = index, value = [length of LIS, count]
        lenLIS, res = 0, 0  # length of LIS, count of LIS

        def dfs(i):
            if i in dp:
                return dp[i]

            maxLen, maxCnt = 1, 1  # length and count of LIS
            for j in range(i + 1, len(nums)):
                if nums[j] > nums[i]:  # make sure increasing order
                    length, count = dfs(j)
                    if length + 1 > maxLen:
                        maxLen, maxCnt = length + 1, count
                    elif length + 1 == maxLen:
                        maxCnt += count
            nonlocal lenLIS, res
            if maxLen > lenLIS:
                lenLIS, res = maxLen, maxCnt
            elif maxLen == lenLIS:
                res += maxCnt
            dp[i] = [maxLen, maxCnt]
            return dp[i]

        for i in range(len(nums)):
            dfs(i)
        return res

        # 2. O(n^2) Dynamic Programming

        dp = {}  # key = index, value = [length of LIS, count]
        lenLIS, res = 0, 0  # length of LIS, count of LIS

        # i = start of subseq
        for i in range(len(nums) - 1, -1, -1):
            maxLen, maxCnt = 1, 1  # len, cnt of LIS start from i

            for j in range(i + 1, len(nums)):
                if nums[j] > nums[i]:
                    length, count = dp[j]  # len, cnt of LIS start from j
                    if length + 1 > maxLen:
                        maxLen, maxCnt = length + 1, count
                    elif length + 1 == maxLen:
                        maxCnt += count
            if maxLen > lenLIS:
                lenLIS, res = maxLen, maxCnt
            elif maxLen == lenLIS:
                res += maxCnt
            dp[i] = [maxLen, maxCnt]

        return res
