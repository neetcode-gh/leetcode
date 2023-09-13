class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        
        repeats = dict()
        start = longest = 0

        for i, char in enumerate(s):
            if char in repeats and repeats[char] >= start:
                start = repeats[char] + 1
                    
            repeats[char] = i

            if longest < i - start + 1:
                longest = i - start + 1
        
        return longest
