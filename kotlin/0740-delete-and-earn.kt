class Solution {
    fun deleteAndEarn(nums: IntArray): Int {
        val count = HashMap<Int, Int>().apply {
            for (n in nums) this[n] = this.getOrDefault(n, 0) + 1
        }
        val noDups = nums.toSet().toTypedArray().apply { this.sort()} 

        var before = 0
        var sum = 0
        for (i in noDups.indices) {
            val cur = noDups[i] * count[noDups[i]]!!
            if (i > 0 && noDups[i] == noDups[i - 1] + 1) {
                val temp = sum
                sum = maxOf(cur + before, sum)
                before = temp
            } else {
                val temp = sum
                sum = cur + sum
                before = temp
            }
        }

        return sum
    }
}
