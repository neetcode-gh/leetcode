#Dynamic Programming Solution with Memoization

class Solution:    
    def uniquePathsWithObstacles(self, obstacleGrid) -> int:          
        self.Memo = {}        
        return self.Unique(obstacleGrid)    
    def Unique(self, obstacleGrid, m = 0, n = 0) -> int:        
        if (m, n) in self.Memo:            
            return self.Memo[(m, n)]        
        if obstacleGrid[0][0] == 1:            
            return 0        
        if m == len(obstacleGrid) - 1 and n == len(obstacleGrid[0]) - 1:            
            if obstacleGrid[m][n] != 1:
                return 1
            else:
                return 0
        Tot = 0        
        if m + 1 < len(obstacleGrid) and obstacleGrid[m + 1][n] != 1:            
            Tot = Tot + self.Unique(obstacleGrid, m + 1, n)            
        if n + 1 < len(obstacleGrid[0]) and obstacleGrid[m][n + 1] != 1:            
            Tot = Tot + self.Unique(obstacleGrid, m, n + 1)            
        self.Memo[(m, n)] = Tot
        return Tot
    
