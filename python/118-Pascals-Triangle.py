class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        triangle = []
        for row_num in range(numRows):
            row = [None for _ in range(row_num + 1)]
            row[0], row[-1] = 1, 1
            for j in range(1, row_num):
                row[j] = triangle[row_num - 1][j-1] + triangle[row_num - 1][j]
            triangle.append(row)
        return triangle
