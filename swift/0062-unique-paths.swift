/**
 * Question Link: https://leetcode.com/problems/unique-paths/
 */

class Solution {
    func uniquePaths(_ m: Int, _ n: Int) -> Int {
        var prevRow = [Int](repeating: 0, count: n)
        for r in stride(from: m - 1, to: -1, by: -1) {
            var curRow = [Int](repeating: 0, count: n)
            curRow[n - 1] = 1
            for c in stride(from: n - 2, to: -1, by: -1) {
                curRow[c] = curRow[c + 1] + prevRow[c]
            }
            prevRow = curRow
        }
        return prevRow[0]
    }
}