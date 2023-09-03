class Solution:
    def partitionString(self, s: str) -> int:
        lastSeen = [-1]*26
        count = 1
        substringStarting = 0

        for i in range(len(s)):
            if lastSeen[ord(s[i]) - ord('a')] >= substringStarting:
                count += 1
                substringStarting = i
            lastSeen[ord(s[i]) - ord('a')] = i

        return count
        