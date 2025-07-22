class Solution:
    """
    Hello... first time contributor. Just used your resource, and found it super helpful. 
    I noticed you have habit of running DP problem from backward (e.g. for i in range(n-1, -1, -1, instead of for in in range(n), 
    it makes my learning take extra effort, because going forward is more natural for me haha. (the code below is going forward direction)

    Anyway, I found that your solution in this problem surprisingly is not as optimized as usual. 
    Let's define dp[i,a] as number of combinations that uses coins[:i] to sum to a, our goal thus is dp[len(nums), target]
    Two common pattern that you taught before to optimize:
    1. just use previous row and current row in dp table, since dp[i,a] always depends on dp[i-1, a+n] and dp[i-1, a-n]. 
        As implemented below as dp and next_dp
    2. if you notice the solution that build from base case (i = 0, or coins[:0] = [] empty array), most of the elements in dp are pretty sparse.
    Thats why we use dict in dp instead of big size array. And also the next_dp will only branch out from non zero previous dp, 
    thus we should just need to iterate over previous dp elements instead of the entire range of values.

    The solution below got >80% in runtime and >80% in memory, all using your earlier DP optimization principles!
    """
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp = {0: 1}
        for n in nums:
            next_dp = {}
            for a in dp:
                next_dp[a - n] = next_dp.get(a - n, 0) + dp[a]
                next_dp[a + n] = next_dp.get(a + n, 0) + dp[a]
            dp = next_dp
        return dp.get(target, 0)
