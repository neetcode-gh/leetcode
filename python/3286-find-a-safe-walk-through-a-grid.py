from typing import List
from collections import deque

class Solution:
    def findSafeWalk(self, grid: List[List[int]], health: int) -> bool:
        
        m, n = len(grid), len(grid[0])

        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        
        queue = deque([(0, 0, health + (0 if grid[0][0] == 0 else -1))])
        
        visited = [[-1] * n for _ in range(m)]
        visited[0][0] = health + (0 if grid[0][0] == 0 else -1)

        while queue:
            x, y, cur_health = queue.popleft()

            for dx, dy in directions:
                nx, ny = x + dx, y + dy

                if 0 > nx or 0 > ny or nx >= m or ny >= n :
                    continue

                new_health = cur_health - grid[nx][ny]

                if nx == m-1 and ny == n-1 and new_health > 0:
                    return True


                if new_health > visited[nx][ny]:
                    visited[nx][ny] = new_health
                    queue.append((nx, ny, new_health))

        return False