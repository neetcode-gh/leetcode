# BOTTOM-UP Dynamic Programming
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        cache = [[False] * (len(p) + 1) for i in range(len(s) + 1)]
        cache[len(s)][len(p)] = True
        
        for i in range(len(s), -1, -1):
            for j in range(len(p) - 1, -1 ,-1):
                match = i < len(s) and (s[i] == p[j] or p[j] == ".")
                
                if (j + 1) < len(p) and p[j + 1] == "*":
                    cache[i][j] = cache[i][j + 2]
                    if match:
                        cache[i][j] = cache[i + 1][j] or cache[i][j]
                elif match:
                    cache[i][j] = cache[i+1][j+1]
                    
        return cache[0][0]
        
        
# TOP DOWN MEMOIZATION
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        cache = {}
        
        def dfs(i, j):
            if (i, j) in cache:
                return cache[(i, j)]
            if i >= len(s) and j >= len(p):
                return True
            if j >= len(p):
                return False
            
            match = i < len(s) and (s[i] == p[j] or p[j] == ".")
            if (j + 1) < len(p) and p[j + 1] == "*":
                cache[(i, j)] = (dfs(i, j + 2) or                # dont use *
                                 (match and dfs(i + 1, j)))       # use *
                return cache[(i, j)]
            if match:
                cache[(i,j)] = dfs(i + 1, j + 1)
                return cache[(i,j)]
            cache[(i,j)] = False
            return False
        
        return dfs(0, 0)
