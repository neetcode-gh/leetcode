/**
 * Question Link: https://leetcode.com/problems/transpose-matrix/
 */

 class Solution {
    func transpose(_ matrix: [[Int]]) -> [[Int]] {
        var res = [[Int]]()
        let row = matrix.count
        let col = matrix[0].count
        for c in 0..<col {
            var rows = [Int]()
            for r in 0..<row {
                rows.append(matrix[r][c])
            }
            res.append(rows)
        }
        return res
    }
}