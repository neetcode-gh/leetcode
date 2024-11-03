class Solution {
    func pacificAtlantic(_ heights: [[Int]]) -> [[Int]] {
        let rows = heights.count 
        let cols = heights[0].count
        var pac = Set<[Int]>()
        var atl = Set<[Int]>()
        var res = [[Int]]()

        func dfs(_ r: Int, _ c: Int, _ visit: inout Set<[Int]>, _ prevHeight: Int) {
            if r < 0 || c < 0 || r == rows || c == cols || visit.contains([r, c]) || heights[r][c] < prevHeight {
                return
            }
            visit.insert([r, c])
            dfs(r + 1, c, &visit, heights[r][c])
            dfs(r - 1, c, &visit, heights[r][c])
            dfs(r, c + 1, &visit, heights[r][c])
            dfs(r, c - 1, &visit, heights[r][c])
        }

        for c in 0..<cols {
            dfs(0, c, &pac, heights[0][c])
            dfs(rows - 1, c, &atl, heights[rows - 1][c])
        }

        for r in 0..<rows {
            dfs(r, 0, &pac, heights[r][0])
            dfs(r, cols - 1, &atl, heights[r][cols - 1])
        }

        for r in 0..<rows {
            for c in 0..<cols {
                if pac.contains([r, c]) && atl.contains([r, c]) {
                    res.append([r, c])
                }
            }
        }

        return res
    }
}