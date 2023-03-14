 // Time: O(s + t)
 // Space: O(s)

class Solution {
    func isSubsequence(_ s: String, _ t: String) -> Bool {
        if s.isEmpty {
            return true
        }

        var s = Array(s)
        var i = 0

        for c in t {
            if c == s[i] {
                i += 1
                if i == s.count {
                    return true
                }
            }
        }

        return false
    }
}