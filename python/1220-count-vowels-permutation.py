class Solution:
    def countVowelPermutation(self, n: int) -> int:
        # space complexity - O(1), time complexity - O(N)
        dp = {"a" : 1, "e" : 1, "i": 1, "o": 1, "u": 1}
        mod = 10**9 + 7

        for i in range(2, n + 1):
            newDp = dp.copy()
            print(newDp)

            newDp["a"] = (dp["e"] + dp["i"] + dp["u"]) % mod
            newDp["e"] = (dp["a"] + dp["i"]) % mod
            newDp["i"] = (dp["e"] + dp["o"]) % mod
            newDp["o"] = dp["i"] % mod
            newDp["u"] = (dp["i"] + dp["o"]) % mod

            dp = newDp 
        
        return sum(dp.values()) % mod
