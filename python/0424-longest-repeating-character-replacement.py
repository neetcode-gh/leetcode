class Solution:
    def characterReplacement(self, s, k):
        counts = {}
        maxf = 0
        l = 0
        for r, ch in enumerate(s):
            counts[ch] = 1 + counts.get(ch, 0)
            maxf = max(maxf, counts[ch])
            if maxf + k < r - l + 1:
                counts[s[l]] -= 1
                l += 1

        return len(s) - l