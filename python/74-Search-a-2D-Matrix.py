class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        ROWS = len(matrix)

        for i in range(ROWS):
            if target > matrix[i][-1] or target < matrix[i][0]:
                continue
            else:
                arr = matrix[i]
                l, r = 0, len(arr) - 1
                while l <= r:
                    m = (l + r) // 2
                    if target > arr[m]:
                        l = m + 1
                    elif target < arr[m]:
                        r = m - 1
                    else:
                        return True
        return False