
class Solution:
    def longestPalindrome(self, s: str) -> str:
        self.res = ""
        self.lenres = 0
        for i in range(len(s)):
            s1 = self.helper(s, i, i)
            s2 = self.helper(s, i, i + 1)
        return s2
        
    def helper(self, s, left, right):
            while left >= 0 and right < len(s) and s[left] == s[right]:
                if (right - left + 1) > self.lenres:
                    self.res = s[left:right+1]
                    self.lenres = right - left + 1
                left -= 1
                right += 1
            return self.res


