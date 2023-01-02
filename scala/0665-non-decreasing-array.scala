object Solution {
    def checkPossibility(nums: Array[Int]): Boolean = {
        @scala.annotation.tailrec
        def helper(i: Int = 1, mismatch: Int = 0, last: Int = nums.head): Boolean =
            if (i == nums.length) true
            else if (nums(i) >= last) helper(i + 1, mismatch, nums(i))
            else if (mismatch > 0) false
            else if (i == nums.length - 1) true
            else if (nums(i - 1) <= nums(i + 1)) helper(i + 1, mismatch + 1, nums(i))
            else if (i == 1 && nums(i) <= nums(i + 1)) helper(i + 1, mismatch + 1, nums(i))
            else if (i > 1 && nums(i - 2) <= nums(i)) helper(i + 1, mismatch + 1, nums(i))
            else false

        helper()
  }
}
