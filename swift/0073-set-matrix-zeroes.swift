class Solution {
    func setZeroes(_ matrix: inout [[Int]]) {
        let rows = matrix.count, cols = matrix[0].count
        var rowZero = false

        for r in 0..<rows {
            for c in 0..<cols {
                if matrix[r][c] == 0 {
                    matrix[0][c] = 0
                    if r > 0 {
                        matrix[r][0] = 0
                    } else {
                        rowZero = true
                    }
                }
            }
        }

        for r in 1..<rows {
            for c in 1..<cols {
                if matrix[0][c] == 0 || matrix[r][0] == 0 {
                    matrix[r][c] = 0
                }
            }
        }

        if matrix[0][0] == 0 {
            for r in 0..<rows {
                matrix[r][0] = 0
            }
        }

        if rowZero {
            for c in 0..<cols {
                matrix[0][c] = 0
            }
        }
    }
}