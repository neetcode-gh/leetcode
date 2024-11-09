class Solution {
    func maxCoins(_ nums: [Int]) -> Int {
        var nums = [1] + nums + [1]
        var dp = [[Int]: Int]()

        func dfs(_ l: Int, _ r: Int) -> Int {
            if l > r {
                return 0
            }
            if dp[[l, r]] != nil {
                return dp[[l, r]]!
            }

            dp[[l, r]] = 0
            for i in l...r {
                var coins = nums[l - 1] * nums[i] * nums[r + 1]
                coins += dfs(l, i - 1) + dfs(i + 1, r)
                dp[[l, r]] = max(dp[[l, r]]!, coins)
            }

            return dp[[l, r]]!
        }

        return dfs(1, nums.count - 2)
    }
}