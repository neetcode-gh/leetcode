class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        # DP solution
        dp = {}
        for i in range(len(days) - 1, -1, -1):
            dp[i] = float("inf")
            for d, c in zip([1, 7, 30], costs):
                j = i
                while j < len(days) and days[j] < days[i] + d:
                    j += 1
                dp[i] = min(dp[i], c + dp.get(j, 0))
        return dp[0]

        # recursive solution
        def dfs(i):
            if i == len(days):
                return 0
            if i in dp:
                return dp[i]

            dp = float("inf")
            for d, c in zip([1, 7, 30], costs):
                j = i
                while j < len(days) and days[j] < days[i] + d:
                    j += 1
                dp = min(dp, c + dfs(j))

        return dfs(0)
