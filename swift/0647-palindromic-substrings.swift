/**
 * Question Link: https://leetcode.com/problems/palindromic-substrings/
 */

 class Solution {
    func countSubstrings(_ s: String) -> Int {
        let s = Array(s)
        var count =  0

        for i in 0..<s.count {
            var l = i
            var r = i
            while l >= 0 && r < s.count && s[l] == s[r] {
                count += 1
                l -= 1
                r += 1
            }
            l = i
            r = i + 1
            while l >= 0 && r < s.count && s[l] == s[r] {
                count += 1
                l -= 1
                r += 1
            }
        }

        return count
    }
}