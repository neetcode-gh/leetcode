object Solution {
    def rob(nums: Array[Int]): Int = {
        if (nums.length == 1) {
            return nums(0)
        } else {
            return houseRobber1(nums, 0, nums.length - 2).max(houseRobber1(nums, 1, nums.length - 1))
        }
    }
    
    def houseRobber1(nums: Array[Int], start: Int, end: Int): Int = {
        var (prevMaxProfit, prevTwoMaxProfit) = (0, 0)
        
        for (i <- start to end) {
            val profit = (nums(i) + prevTwoMaxProfit).max(prevMaxProfit)
            prevTwoMaxProfit = prevMaxProfit
            prevMaxProfit = profit
        }
        
        return prevMaxProfit
    }
}