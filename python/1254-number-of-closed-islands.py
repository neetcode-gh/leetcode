class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        r = len(grid)
        c = len(grid[0])
        seen = set()

        def dfs(x, y):
            if x < 0 or x >= r or y < 0 or y >= c or (x, y) in seen or grid[x][y] == 1:
                return
            seen.add((x, y))
            grid[x][y] = 1
            dfs(x+1, y)
            dfs(x, y+1)
            dfs(x-1, y)
            dfs(x, y-1)
        
        for i in range(r):
            for j in range(c):
                if i == 0 or j == 0 or i == r-1 or j == c-1:
                    dfs(i, j)
        ans = 0
        for i in range(r):
            for j in range(c):
                if grid[i][j] == 0:
                    dfs(i, j)
                    ans += 1
        return ans       