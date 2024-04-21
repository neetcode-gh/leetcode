class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:

        ROWS, COLS = len(grid), len(grid[0])

        def dfs(grid, row, col):
            if 0 <= row < ROWS and 0 <= col < COLS:
                if grid[row][col] == 1:
                    grid[row][col] = 0
                    dfs(grid, row + 1, col)
                    dfs(grid, row - 1, col)
                    dfs(grid, row, col + 1)
                    dfs(grid, row, col - 1)
               
        for row in range(ROWS):
            dfs(grid, row, 0)
            dfs(grid, row, COLS - 1)

        for col in range(COLS):
            dfs(grid, 0, col)
            dfs(grid, ROWS - 1, col)

        return sum(grid[row][col] == 1 for row in range(ROWS) for col in range(COLS))
