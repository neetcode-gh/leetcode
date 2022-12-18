object Solution {
    def findMin(nums: Array[Int]): Int = {
        var res = nums(0)
        var (left, right) = (0, nums.length - 1)
        
        while (left <= right) {
            if (nums(left) < nums(right)) {
                res = res.min(nums(left))
                left = right + 1 // break condition
            } else {
                val mid = (left + right) / 2
                res = res.min(nums(mid))
                
                if (nums(mid) >= nums(left)) {
                    left = mid + 1
                } else {
                    right = mid - 1
                }               
            }
        }
        
        return res
    }
}
