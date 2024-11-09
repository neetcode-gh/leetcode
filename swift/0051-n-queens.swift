class Solution {
    func solveNQueens(_ n: Int) -> [[String]] {
        var res = [[String]]()
        var col = Set<Int>()
        var posDiag = Set<Int>()
        var negDiag = Set<Int>()
        var cur = Array(repeating: Array(repeating: ".", count: n), count: n)

        func dfs(_ r: Int) {
            if r == n {
                let copy = cur.map { $0.joined() }
                print(copy)
                res.append(copy)
                return
            }

            for c in 0..<n {
                if col.contains(c) || posDiag.contains(r + c) || negDiag.contains(r - c) {
                    continue
                }
                col.insert(c)
                posDiag.insert(r + c)
                negDiag.insert(r - c)
                cur[r][c] = "Q"
                dfs(r + 1)
                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
                cur[r][c] = "."
            }
        }

        dfs(0)

        return res
    }
}