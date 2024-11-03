class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        m, n = len(heights), len(heights[0])
        
        efforts = [[float('inf')] * n for _ in range(m)]
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        efforts[0][0] = 0
        pq = [(0, 0, 0)]  # (effort, row, col)
        
        while pq:
            curEffort, i, j = heapq.heappop(pq)
            
            # reached the bottom-right corner => return the effort
            if i == m - 1 and j == n - 1:
                return curEffort
            
            for dx, dy in directions:
                x, y = i + dx, j + dy
                
                if 0 <= x < m and 0 <= y < n:
                    newEffort = max(abs(heights[x][y] - heights[i][j]), curEffort)
                    
                    if newEffort < efforts[x][y]:
                        efforts[x][y] = newEffort
                        heapq.heappush(pq, (newEffort, x, y))
        
        return efforts[m - 1][n - 1]