class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        sub = set()
        j, l, m = 0, 0, 0

        while j < len(s):
            while s[j] in sub:
                sub.remove(s[l])
                l += 1
            sub.add(s[j])
            m = max(m, j - l + 1)
            j += 1
        return m
    
