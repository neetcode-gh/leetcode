class NumMatrix:
    def __init__(self, matrix):
        self.sum_ = [[0] * (len(matrix[0]) + 1) for _ in range(len(matrix) + 1)]
        for i, line in enumerate(matrix):
            previous = 0
            for j, num in enumerate(line):
                previous += num
                above = self.sum_[i][j + 1]
                self.sum_[i + 1][j + 1] = previous + above

    def sumRegion(self, row1, col1, row2, col2):
        sum_col2 = self.sum_[row2 + 1][col2 + 1] - self.sum_[row1][col2 + 1]
        sum_col1 = self.sum_[row2 + 1][col1] - self.sum_[row1][col1]
        return sum_col2 - sum_col1
