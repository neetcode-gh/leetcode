class Solution:
    def maxProduct(self, s: str) -> int:
        N = len(s)
        palindromes = {}

        for mask in range(1, 1 << N):
            sub = ""
            for i in range(N):
                if mask & (1 << i):
                    sub += s[i]
            if sub == sub[::-1]:
                palindromes[mask] = len(sub)

        res = 1
        for m1 in palindromes:
            for m2 in palindromes:
                if m1 & m2 == 0:
                    res = max(res, palindromes[m1] * palindromes[m2])
        return res
