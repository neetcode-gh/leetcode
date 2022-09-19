class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        Memo = {}

        def Path(i, k, n):
            if (i, k) in Memo:
                return Memo[(i, k)]
            if i == n - 1:
                return matrix[i][k]
            if k > 0 and k < n - 1:
                Psx = matrix[i][k] + Path(i + 1, k - 1, n)
                Pst = matrix[i][k] + Path(i + 1, k, n)
                Pdx = matrix[i][k] + Path(i + 1, k + 1, n)
                Memo[(i, k)] = min(min(Pdx, Pst), Psx)
                return Memo[(i, k)]
            else:
                if k == 0:
                    Pst = matrix[i][k] + Path(i + 1, k, n)
                    Pdx = matrix[i][k] + Path(i + 1, k + 1, n)
                    Memo[(i, k)] = min(Pst, Pdx)
                    return Memo[(i, k)]
                else:
                    Psx = matrix[i][k] + Path(i + 1, k - 1, n)
                    Pst = matrix[i][k] + Path(i + 1, k, n)
                    Memo[(i, k)] = min(Pst, Psx)
                    return Memo[(i, k)]

        Min = 10**7
        for k in range(0, len(matrix[0])):
            CP = Path(0, k, len(matrix[0]))
            if CP < Min:
                Min = CP
        return Min
