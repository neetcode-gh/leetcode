class Solution {
    func combinationSum2(_ candidates: [Int], _ target: Int) -> [[Int]] {
        var candidates = candidates.sorted()
        var res = [[Int]]()
        var cur = [Int]()
        var total = 0

        func dfs(_ i: Int) {
            var i = i
            if total == target {
                res.append(cur)
                return
            }
            if total > target || i == candidates.count {
                return
            }

            cur.append(candidates[i])
            total += candidates[i]
            dfs(i + 1)
            cur.popLast()
            total -= candidates[i]
            while i + 1 < candidates.count && candidates[i] == candidates[i + 1] {
                i += 1
            }
            dfs(i + 1)
        }

        dfs(0)

        return res
    }
}