class Solution {
    func isMatch(_ s: String, _ p: String) -> Bool {
        let s = Array(s), p = Array(p)
        var dp = [[Int]: Bool]()

        func dfs(_ i: Int, _ j: Int) -> Bool {
            if dp[[i, j]] != nil {
                return dp[[i, j]]!
            }
            if i >= s.count && j >= p.count {
                return true
            }
            if j >= p.count {
                return false
            }
            let isMatch = i < s.count && (s[i] == p[j] || p[j] == ".")
            if j + 1 < p.count && p[j + 1] == "*" {
                dp[[i, j]] = dfs(i, j + 2) || (isMatch && dfs(i + 1, j))
                return dp[[i, j]]!
            }
            if isMatch {
                dp[[i, j]] = dfs(i + 1, j + 1)
                return dp[[i, j]]!
            }
            dp[[i, j]] = false
            return false
        }
        
        return dfs(0, 0)
    }
}