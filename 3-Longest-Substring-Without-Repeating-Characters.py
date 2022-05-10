class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charSet = {}
        l,r = 0
        res = 0
        
        while r < len(s):
            if s[r] in d:
                l = max(l, d[s[r]] + 1)
            d[s[r]] = r
            res = max(res, r - l + 1)
            r += 1
        return res