class NumArray(nums: IntArray) {

    val prefix = IntArray(nums.size)

    init {
        var sum = 0
        for((i,v) in nums.withIndex()) {
            sum += v
            prefix[i] = sum
        }
    }

    fun sumRange(left: Int, right: Int): Int {        
        val prefixR = prefix[right]
        val prefixL = if(left == 0) 0 else prefix[left - 1]
        return prefixR - prefixL
    }

}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
