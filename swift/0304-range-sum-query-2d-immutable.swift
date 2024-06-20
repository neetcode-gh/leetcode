/**
 * Question Link: https://leetcode.com/problems/range-sum-query-2d-immutable/
 */


class NumMatrix {
    var pref: [[Int]]

    init(_ matrix: [[Int]]) {
        let rows = matrix.count
        let cols = matrix[0].count
        pref = [[Int]](repeating: [Int](repeating: 0, count: cols + 1), count: rows + 1)
        for r in 0..<rows {
            var prefx = 0
            for c in 0..<cols {
                prefx += matrix[r][c]
                let above = pref[r][c + 1]
                pref[r + 1][c + 1] = prefx + above
            }
        }
    }
    
    func sumRegion(_ row1: Int, _ col1: Int, _ row2: Int, _ col2: Int) -> Int {
        var row1 = row1 + 1
        var col1 = col1 + 1
        var row2 = row2 + 1
        var col2 = col2 + 1
        let bottomRight = pref[row2][col2]
        let above = pref[row1 - 1][col2]
        let left = pref[row2][col1 - 1]
        let topLeft = pref[row1 - 1][col1 - 1]
        return bottomRight - above - left + topLeft
    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * let obj = NumMatrix(matrix)
 * let ret_1: Int = obj.sumRegion(row1, col1, row2, col2)
 */