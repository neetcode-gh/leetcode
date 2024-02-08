class Solution:
    def numSpecial(self, mat: List[List[int]]) -> int:
        m = len(mat)
        n = len(mat[0])
        rowCount = [0] * m
        colCount = [0] * n
        res = 0
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 1:
                    rowCount[r] += 1
                    colCount[c] += 1
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 1 and rowCount[r] == 1 and colCount[c] == 1:
                    res += 1
        return res
        
