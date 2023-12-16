class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        offset = 1

        for i in range(1, n + 1):
            if offset * 2 == i:
                offset = i
            dp[i] = 1 + dp[i - offset]
        return dp

# Another dp solution
class Solution2:
    def countBits(self, n: int) -> List[int]:
        res = [0] * (n + 1)
        for i in range(1, n + 1):
            if i % 2 == 1:
                res[i] = res[i - 1] + 1
            else:
                res[i] = res[i // 2]
        return res
# This solution is based on the division of odd and even numbers. 
# I think it's easier to understand.
# This is my full solution, covering the details: https://leetcode.com/problems/counting-bits/solutions/4411054/odd-and-even-numbers-a-easier-to-understanding-way-of-dp/
