object Solution {
    def search(nums: Array[Int], target: Int): Int = {
        var (left, right) = (0, nums.length - 1)
        
        while (left <= right) {
            val mid = (left + right) / 2
            
            if (target == nums(mid)) {
                return mid
            } else if (nums(mid) >= nums(left)) {
                if (target >= nums(left) && target < nums(mid)) {
                    right = mid - 1
                } else {
                    left = mid + 1
                }
            } else {
                if (target > nums(mid) && target <= nums(right)) {
                    left = mid + 1
                } else {
                    right = mid - 1 
                }
            }
        }
        
        return -1
    }
}