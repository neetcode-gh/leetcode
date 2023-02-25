class Solution:
    def findMaxForm(self, strs: List[str], M: int, N: int) -> int:
        # Dynamic Programming
        dp = defaultdict(int)

        for s in strs:
            mCnt, nCnt = s.count("0"), s.count("1")
            for m in range(M, mCnt - 1, -1):
                for n in range(N, nCnt - 1, -1):
                    dp[(m, n)] = max(
                        1 + dp[(m - mCnt, n - nCnt)],
                        dp[(m, n)])
        return dp[(M, N)]
        
        # Memoization
        dp = {}

        def dfs(i, m, n):
            if i == len(strs):
                return 0
            if (i, m, n) in dp:
                return dp[(i, m, n)]
            
            mCnt, nCnt = strs[i].count("0"), strs[i].count("1")
            dp[(i, m, n)] = dfs(i + 1, m, n)
            if mCnt <= m and nCnt <= n:
                dp[(i, m, n)] = max(
                    dp[(i, m, n)], 
                    1 + dfs(i + 1, m - mCnt, n - nCnt))
            return dp[(i, m, n)]

        return dfs(0, m, n)
