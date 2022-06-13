class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        dp = [[float("inf")] * (len(word2) + 1) for i in range(len(word1) + 1)]
        
        for j in range(len(word2) + 1):
            dp[len(word1)][j] = len(word2) - j
        for i in range(len(word1) + 1):
            dp[i][len(word2)] = len(word1) - i
        
        for i in range(len(word1) - 1, -1, -1):
            for j in range(len(word2) - 1, -1, -1):
                if word1[i] == word2[j]:
                    dp[i][j] = dp[i + 1][j + 1]
                else:
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1])
        return dp[0][0]
    
    
    
    
    
# solution based on levenshtein edit distance rules
# ref: https://en.wikipedia.org/wiki/Levenshtein_distance#:~:text=Informally%2C%20the%20Levenshtein%20distance%20between,considered%20this%20distance%20in%201965.

class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        from_=word1
        to_=word2
        m = len(from_)
        n = len(to_)

        mat = [[0 for i in range(n+1)] for j in range(m+1)]

        for i in range(m+1):
            mat[i][0]=i

        for i in range(n+1):
            mat[0][i]=i

        for i in range(1, m+1):
            for j in range(1, n+1):
                if from_[i-1] != to_[j-1]:
                    mat[i][j] = min(mat[i-1][j], mat[i][j-1], mat[i-1][j-1]) +1

                else:
                    mat[i][j] = mat[i-1][j-1]

        return mat[m][n]
