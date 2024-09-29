
class Solution:
    def PrimeSum(self,mat):
        cnt = 0
        for i in range(len(mat)):
            cnt += mat[i][i]
        return cnt

    def CrossSum(self,mat):
        cnt = 0
        for i in range(len(mat)):
            cnt += mat[i][len(mat) - i - 1]
        return cnt

    def diagonalSum(self, mat: List[List[int]]) -> int:
        prime = self.PrimeSum(mat)
        cross = self.CrossSum(mat)

        if len(mat) % 2 == 0:
            return prime + cross
        else:
            mid = len(mat) // 2
            mid_ele = mat[mid][mid]
            return prime + cross - mid_ele
