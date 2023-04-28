class Solution {
    fun maxSumMinProduct(nums: IntArray): Int {
        val prefix = LongArray(nums.size + 1)
        val stack = ArrayDeque<Pair<Int, Long>>()
        val mod = 1000000007L
        
        for (i in nums.indices) {
            prefix[i + 1] = prefix[i] + nums[i]
        }

        var res = 0L
        for ((i, n) in nums.withIndex()) {
            var start = i

            while (stack.isNotEmpty() && stack.peekLast().second > n) {
                val (lastStart, value) = stack.removeLast()
                val total = prefix[i] - prefix[lastStart]
                res = maxOf(res, total * value)
                start = lastStart
            }

            stack.addLast(start to n.toLong())
        }
        
        for ((start, value) in stack) {
            val total = prefix[nums.size] - prefix[start]
            res = maxOf(res, total * value)
        }


        return (res % mod).toInt()
    }
}
