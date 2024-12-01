class Solution:
    Memo = {}

    def tribonacci(self, n: int):
        if n in self.Memo:
            return self.Memo[n]
        if n == 0:
            return 0
        if n == 1:
            return 1
        if n == 2:
            return 1
        self.Memo[n] = (
            self.tribonacci(n - 1) + self.tribonacci(n - 2) + self.tribonacci(n - 3)
        )
        return self.Memo[n]
