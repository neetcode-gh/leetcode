class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        islands = 0
        visit = set()
        rows, cols = len(grid), len(grid[0])

        def dfs(r, c):
            if (
                r not in range(rows)
                or c not in range(cols)
                or grid[r][c] == "0"
                or (r, c) in visit
            ):
                return

            visit.add((r, c))
            directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
            for dr, dc in directions:
                dfs(r + dr, c + dc)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1" and (r, c) not in visit:
                    islands += 1
                    dfs(r, c)
        return islands

# DFS O(1) Space and much less code
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        rows, cols = len(grid), len(grid[0])
        def dfs(r, c):
            if not 0 <= r < len(grid) or not 0 <= c < len(grid[0]) or grid[r][c] == '0':
                return 0
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
            return 1
        count = 0
        for r in range(rows):
            for c in range(cols):
                count += dfs(r, c)
        return count

# BFS Version From Video
class SolutionBFS:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0

        rows, cols = len(grid), len(grid[0])
        visited = set()
        islands = 0

         def bfs(r, c):
             q = deque()
             visited.add((r, c))
             q.append((r, c))
           
             while q:
                 row, col = q.popleft()
                 directions = [[1, 0],[-1, 0],[0, 1],[0, -1]]
               
                 for dr, dc in directions:
                     r, c = row + dr, col + dc
                     if (r) in range(rows) and (c) in range(cols) and grid[r][c] == '1' and (r, c) not in visited:
                       
                         q.append((r, c ))
                         visited.add((r, c ))

         for r in range(rows):
             for c in range(cols):
               
                 if grid[r][c] == "1" and (r, c) not in visited:
                     bfs(r, c)
                     islands += 1 

         return islands

