class Solution {
    func longestIncreasingPath(_ matrix: [[Int]]) -> Int {
        let rows = matrix.count, cols = matrix[0].count
        var dp = [[Int]: Int]()

        func dfs(_ r: Int, _ c: Int, _ prev: Int) -> Int {
            if r < 0 || r == rows || c < 0 || c == cols || matrix[r][c] <= prev {
                return 0
            }
            if dp[[r, c]] != nil {
                return dp[[r, c]]!
            }
            var res = 1
            res = max(res, 1 + dfs(r + 1, c, matrix[r][c]))
            res = max(res, 1 + dfs(r - 1, c, matrix[r][c]))
            res = max(res, 1 + dfs(r, c + 1, matrix[r][c]))
            res = max(res, 1 + dfs(r, c - 1, matrix[r][c]))
            dp[[r, c]] = res
            return res
        }

        for r in 0..<rows {
            for c in 0..<cols {
                dfs(r, c, -1)
            }
        }

        return dp.values.max()!
    }
}