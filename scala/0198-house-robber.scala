object Solution {
    def rob(nums: Array[Int]): Int = {
        var (prevTwoMaxProfit, prevMaxProfit) = (0, 0)
        
        for (currCash <- nums) {
            val currProfit = (currCash + prevTwoMaxProfit).max(prevMaxProfit)
            prevTwoMaxProfit = prevMaxProfit
            prevMaxProfit = currProfit
        }

        return prevMaxProfit
    }
}