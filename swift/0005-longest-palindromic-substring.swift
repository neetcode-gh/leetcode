/**
 * Question Link: https://leetcode.com/problems/longest-palindromic-substring/
 */

 class Solution {
    func longestPalindrome(_ s: String) -> String {
        let s = Array(s)
        var res = ""
        var len = 0

        for i in 0..<s.count {
            var l = i
            var r = i
            while l >= 0 && r < s.count && s[l] == s[r] {
                if r - l + 1 > len {
                    res = String(s[l...r])
                    len = r - l + 1
                }
                l -= 1
                r += 1
            }

            l = i
            r = i + 1
            while l >= 0 && r < s.count && s[l] == s[r] {
                if r - l + 1 > len {
                    res = String(s[l...r])
                    len = r - l + 1
                }
                l -= 1
                r += 1
            }
        }

        return res
    }
}