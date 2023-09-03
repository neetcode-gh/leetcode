class Solution {
    func combinationSum(_ candidates: [Int], _ target: Int) -> [[Int]] {
        var result: [[Int]] = []
        var currentComb: [Int] = []
        func dfs(_ index: Int, _ remaining: Int) {
            guard index < candidates.count else { return }
            guard remaining >= 0 else {
                return
            }
            if remaining == 0 {
                result.append(currentComb)
                return
            }
            for i in index..<candidates.count {
                currentComb.append(candidates[i])
                dfs(i, remaining - candidates[i])
                currentComb.removeLast()
            }
        }
        dfs(0, target)
        return result
    }
}