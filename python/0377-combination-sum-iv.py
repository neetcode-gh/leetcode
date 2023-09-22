class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        dp = [0]*(target+1)
        dp[0] = 1
        nums.sort()
        for i in range(1,target+1):
            for num in nums:
                if num>i:
                    break
                dp[i] += dp[i-num]
        # print(dp)
        return dp[target]
