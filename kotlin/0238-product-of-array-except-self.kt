package kotlin


fun main() {
    val nums = intArrayOf(1, 2, 3, 4)
    //o.p : 24, 12,8,6
}

fun productExceptSelf(nums: IntArray): IntArray {
    val res = IntArray(nums.size)

    var prefix = 1

    for (i in 0 until nums.size) {
        res[i] = prefix
        prefix *= nums[i]
    }

    var postfix = 1
    for (i in nums.size - 1 downTo 0) {
        res[i] *= postfix
        postfix *= nums[i]
    }

    return res
}